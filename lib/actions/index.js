const builder = require('./builder')
const benchmark = require('./benchmark')
const cleaner = require('./cleaner')

module.exports = {
  'Benchmark': benchmark,
  'Build Subjects': builder,
  'Remove files and directories with built subjects': cleaner
}
