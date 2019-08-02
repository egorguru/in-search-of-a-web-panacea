const Table = require('cli-table3')
const colors = require('colors')

function toColor(color, array) {
  return array.map((s) => color(s))
}

function currentTime() {
  return `[${new Date().toLocaleTimeString()}]`
}

exports.info = (...output) => console.log(
  currentTime(),
  `[${toColor(colors.green, ['INFO'])}]`,
  ...toColor(colors.white, output)
)

exports.error = (...output) => console.log(
  currentTime(),
  `[${toColor(colors.red, ['ERROR'])}]`,
  ...toColor(colors.white, output)
)

function round(number) {
  return Math.round(number * 10) / 10
}

exports.resultTable = (results) => {
  const table = new Table({
    head: toColor(colors.cyan, [
      'Name',
      'Requests Total',
      'Latency Average',
      '2xx',
      'Non 2xx',
      'CPU % Average',
      'Memory MB Average',
      'Duration'
    ])
  })
  results.forEach(({ benchmark, usage }, name) => {
    table.push([
      colors.bold(name),
      benchmark.requests.total,
      benchmark.latency.average,
      benchmark['2xx'],
      benchmark.non2xx,
      round(usage.cpu),
      round(usage.memory / 1024 / 1024),
      benchmark.duration
    ])
  })
  console.log(table.toString())
}
