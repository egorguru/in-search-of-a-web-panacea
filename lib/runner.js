const minimist = require('minimist')

const benchmarkTypes = require('../settings/benchmark-types')
const benchmark = require('./benchmark')
const printer = require('./printer')

module.exports = async () => {
  const args = minimist(process.argv.slice(2))
  const type = args.type || args.t || 'get'
  const opts = {
    connections: args.connections || args.c || 100,
    pipelining: args.pipelining || args.p || 10,
    duration: args.duration || args.d || 40
  }
  const results = await benchmark(Object.assign(opts, benchmarkTypes[type]), type)
  printer.resultTable(results)
}