const { execSync } = require('child_process')

const subjects = require('../settings/subjects')
const printer = require('./printer')

printer.info('Start Building\r\n')

for (const name of Object.keys(subjects)) {
  const { dir, build } = subjects[name]
  printer.info(`Start Building of ${name} \r\n`)
  execSync(`cd subjects/${dir}; ${build};`, { stdio: 'inherit' })
}

printer.info('End Building')
