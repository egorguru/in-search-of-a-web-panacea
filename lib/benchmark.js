const autocannon = require('autocannon')
const { spawn } = require('child_process')
const { StringDecoder } = require('string_decoder')

const subjects = require('../settings/subjects')

function bench(opts) {
  return new Promise((resolve, reject) => {
    autocannon(opts, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

function waitSignal(process, signal) {
  const decoder = new StringDecoder()
  return new Promise((resolve) => {
    process.stdout.on('data', (chunk) => {
      if (decoder.write(chunk).startsWith(signal)) {
        resolve()
      }
    })
  })
}

module.exports = async function run(opts) {
  const results = new Map()
  for (const name of Object.keys(subjects)) {
    const process = spawn(subjects[name].command, subjects[name].args)
    await waitSignal(process, subjects[name].signal)
    results.set(name, await bench(opts))
    process.kill('SIGINT')
  }
  return results
}
