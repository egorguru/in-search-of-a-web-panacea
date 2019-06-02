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

exports.resultTable = (results) => {
  const table = new Table({
    head: toColor(colors.cyan, [
      'Name',
      'Requests Total',
      'Latency Average',
      '2xx',
      'Non 2xx',
      'Duration'
    ])
  })
  results.forEach((result, name) => {
    table.push([
      colors.bold(name),
      result.requests.total,
      result.latency.average,
      result['2xx'],
      result.non2xx,
      result.duration
    ])
  })
  console.log(table.toString())
}
