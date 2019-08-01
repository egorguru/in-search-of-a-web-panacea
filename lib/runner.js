const inquirer = require('inquirer')

const benchmark = require('./benchmark')
const builder = require('./builder')
const printer = require('./printer')

const benchmarkTypes = require('../settings/benchmark-types')
const defaults = require('../settings/defaults')
const subjects = require('../settings/subjects')

module.exports = async () => {
  const options = await askForOptions()
  const type = await askForType()
  const subjectsList = await askForSubjectsList(type)
  await askForBuild(subjectsList)
  printer.info('Benchmark', `"${type}"`, 'Started', '\r\n')
  const results = await benchmark(
    subjectsList,
    Object.assign(options, benchmarkTypes[type])
  )
  printer.info('Benchmark', `"${type}"`, 'Completed')
  printer.resultTable(results)
}

function askForOptions() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'connections',
      message: 'Specify the number of connections:',
      default: defaults.connections,
      validate (value) {
        return !Number.isNaN(parseFloat(value)) || 'Please enter a number'
      },
      filter: Number
    },
    {
      type: 'input',
      name: 'pipelining',
      message: 'Specify the number of pipelines:',
      default: defaults.pipelining,
      validate (value) {
        return !Number.isNaN(parseFloat(value)) || 'Please enter a number'
      },
      filter: Number
    },
    {
      type: 'input',
      name: 'duration',
      message: 'Specify the duration:',
      default: defaults.duration,
      validate (value) {
        return !Number.isNaN(parseFloat(value)) || 'Please enter a number'
      },
      filter: Number
    }
  ])
}

async function askForType() {
  const res = await inquirer.prompt([
    {
      type: 'input',
      name: 'type',
      message: 'Specify the benchmark type:',
      default: defaults.type,
      validate (value) {
        return Object.keys(benchmarkTypes).includes(value) || `There is no "${value}" type`
      },
      filter: String
    }
  ])
  return res.type
}

async function askForSubjectsList(type) {
  const { all } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'all',
      message: 'Should it start all subjects?',
      default: true
    }
  ])
  const subjectsByType = getSubjectsByType(type)
  if (all) {
    return subjectsByType
  } else {
    const { subjectsList } = await inquirer.prompt([
      {
        type: 'checkbox',
        message: 'Select Subjects',
        name: 'subjectsList',
        choices: subjectsByType,
        validate(answer) {
          return answer.length < 1 ?
            'You should choose at least one subject.' : true
        }
      }
    ])
    return subjectsList
      .map((name) => subjectsByType.find((subject) => name === subject.name))
  }
}

function getSubjectsByType(type) {
  const result = []
  for (const name in subjects) {
    const subject = subjects[name]
    if (subject.supports.includes(type)) {
      subject.name = name
      result.push(subject)
    }
  }
  return result
}

async function askForBuild(subjects) {
  const { run } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'run',
      message: 'Should it start the build process?',
      default: false
    }
  ])
  if (run) {
    builder(subjects)
  }
}
