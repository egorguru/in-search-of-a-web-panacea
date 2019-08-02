const inquirer = require('inquirer')

const benchmark = require('./benchmark')
const chooseSubjects = require('../../helpers/choose-subjects')
const printer = require('../../helpers/printer')

const benchmarkTypes = require('../../../settings/benchmark-types')
const defaults = require('../../../settings/defaults')

module.exports = async () => {
  const options = await askForOptions()
  const type = await askForType()
  const subjectsList = await askForSubjectsList(type)
  return async () => {
    printer.info('Benchmark', `"${type}"`, 'Started', '\r\n')
    const results = await benchmark(
      subjectsList,
      Object.assign(options, benchmarkTypes[type])
    )
    printer.info('Benchmark', `"${type}"`, 'Completed')
    printer.resultTable(results)
  }
}

function askForOptions() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'connections',
      message: 'Specify the number of connections:',
      default: defaults.connections,
      validate(value) {
        return !Number.isNaN(parseFloat(value)) || 'Please enter a number'
      },
      filter: Number
    },
    {
      type: 'input',
      name: 'pipelining',
      message: 'Specify the number of pipelines:',
      default: defaults.pipelining,
      validate(value) {
        return !Number.isNaN(parseFloat(value)) || 'Please enter a number'
      },
      filter: Number
    },
    {
      type: 'input',
      name: 'duration',
      message: 'Specify the duration:',
      default: defaults.duration,
      validate(value) {
        return !Number.isNaN(parseFloat(value)) || 'Please enter a number'
      },
      filter: Number
    }
  ])
}

async function askForType() {
  const { type } = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: 'Specify the benchmark type:',
    choices: Object.keys(benchmarkTypes)
  })
  return type
}

async function askForSubjectsList(type) {
  return await chooseSubjects((subject) => subject.supports.includes(type))
}
