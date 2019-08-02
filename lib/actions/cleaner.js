const { execSync } = require('child_process')

const defaults = require('../../settings/defaults')
const chooseSubjects = require('../helpers/choose-subjects')
const printer = require('../helpers/printer')

module.exports = async () => {
  const subjects = await chooseSubjects()
  return () => {
    printer.info('Cleaning Started')
    for (const { name, dir, clean } of subjects) {
      printer.info(`Cleaning of ${name} Started`)
      execSync(`cd subjects/${dir}; ${clean};`, {
        stdio: defaults['cleaner-processes-stdio']
      })
      printer.info(`Cleaning of ${name} Competed`)
    }
    printer.info('Cleaning Completed', '\r\n')
  }
}
