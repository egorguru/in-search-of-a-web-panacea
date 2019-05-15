const { execSync } = require('child_process')
const { StringDecoder } = require('string_decoder')

const subjects = require('../settings/subjects')
const printer = require('./printer')

printer.info('Start Building\r\n')

for (const name of Object.keys(subjects)) {
  const { dir, build } = subjects[name]
  const decoder = new StringDecoder()
  printer.info(`Start Building of ${name} \r\n`)
  const output = execSync(`cd subjects/${dir}; ${build};`)
  console.log(decoder.write(output))
}

printer.info('End Building')
