const { execSync } = require('child_process')

const defaults = require('../settings/defaults')
const printer = require('./printer')

module.exports = (subjects) => {
  printer.info('Building Started')
  for (const { name, dir, build } of subjects) {
    printer.info(`Building of ${name} Started`)
    execSync(`cd subjects/${dir}; ${build};`, {
      stdio: defaults['builder-processes-stdio']
    })
    printer.info(`Building of ${name} Competed`)
  }
  printer.info('Building Completed', '\r\n')
}
