const minimist = require('minimist')

const subjects = require('../settings/subjects')
const benchmarkTypes = require('../settings/benchmark-types')
const benchmark = require('./benchmark')
const printer = require('./printer')

function prepareSubjectsArray(type) {
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

module.exports = async () => {
  const args = minimist(process.argv.slice(2))
  const type = args.type || args.t || 'get-json-entity'
  const opts = {
    connections: args.connections || args.c || 100,
    pipelining: args.pipelining || args.p || 10,
    duration: args.duration || args.d || 40
  }
  const results = await benchmark(
    prepareSubjectsArray(type),
    Object.assign(opts, benchmarkTypes[type])
  )
  printer.resultTable(results)
}