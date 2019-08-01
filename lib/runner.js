const inquirer = require('inquirer')

const benchmark = require('./benchmark')
const printer = require('./printer')

const benchmarkTypes = require('../settings/benchmark-types')
const defaults = require('../settings/defaults')
const subjects = require('../settings/subjects')

module.exports = async () => {
  const options = await askForOptions()
  const type = await askForType()
  const subjectsList = await askForSubjectsList(type)
  printer.info('Benchmark', `"${type}"`, 'Started')
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
      message: 'How many connections do you need?',
      default: defaults.connections,
      validate (value) {
        return !Number.isNaN(parseFloat(value)) || 'Please enter a number'
      },
      filter: Number
    },
    {
      type: 'input',
      name: 'pipelining',
      message: 'How many pipelines do you need?',
      default: defaults.pipelining,
      validate (value) {
        return !Number.isNaN(parseFloat(value)) || 'Please enter a number'
      },
      filter: Number
    },
    {
      type: 'input',
      name: 'duration',
      message: 'How long should it take?',
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
      message: 'What benchmark type it should run?',
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
      message: 'Do you want run all subjects?',
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
            'You must choose at least one package.' : true
        }
      }
    ])
    return subjectsList.map((name) =>
      subjectsByType.find((subject) => name === subject.name))
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
