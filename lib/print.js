const Table = require('cli-table3')
const colors = require('colors')

function toColor(color, array) {
  return array.map((s) => color(s))
}

module.exports = (results) => {
  const table = new Table({
    head: toColor(colors.cyan, [
      'Name',
      'Requests Total', 'Requests Average',
      'Latency Average',
      'Throughput Total', 'Throughput Average',
      '2xx',
      'Non 2xx',
      'Duration'
    ])
  })
  results.forEach((result, name) => {
    table.push([
      colors.bold(name),
      result.requests.total,
      result.requests.average,
      result.latency.average,
      result.throughput.total,
      result.throughput.average,
      result['2xx'],
      result.non2xx,
      result.duration
    ])
  })
  console.log(table.toString())
}
