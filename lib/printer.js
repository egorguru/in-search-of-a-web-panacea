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
  return Math.round(number * 100) / 10
}

exports.resultTable = (results) => {
  const table = new Table({
    head: toColor(colors.cyan, [
      'Name',
      'Requests Total',
      'Latency Average',
      '2xx',
      'Non 2xx',
      'CPU (Last)',
      'CPU (Average)',
      'Memory (Average)',
      'Duration'
    ])
  })
  results.forEach((result, name) => {
    table.push([
      colors.bold(name),
      result.bench.requests.total,
      result.bench.latency.average,
      result.bench['2xx'],
      result.bench.non2xx,
      round(result.lastUsage.cpu) + ' %',
      round(result.averageUsage.cpu) + ' %',
      round(result.averageUsage.memory / 1024 / 1024) + ' MB',
      result.bench.duration
    ])
  })
  console.log(table.toString())
}
