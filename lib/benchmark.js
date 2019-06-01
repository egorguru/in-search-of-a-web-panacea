const autocannon = require('autocannon')
const { spawn } = require('child_process')
const { StringDecoder } = require('string_decoder')

const defaults = require('../settings/defaults')
const printer = require('./printer')

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

function handleCloseWithError(process, name) {
  process.on('close', (code) => {
    if (code !== null && code !== 0 && code !== 130) {
      printer.error('\r\n', name, 'process exit with code', code, '\r\n')
    }
  })
}

function waitSignal(process) {
  const decoder = new StringDecoder()
  return new Promise((resolve) => {
    process.stdout.on('data', (chunk) => {
      if (decoder.write(chunk).startsWith(defaults['start-signal'])) {
        resolve()
      }
    })
  })
}

function waitClosing(process) {
  return new Promise((resolve) => process.on('close', () => resolve()))
}

module.exports = async (subjects, opts) => {
  const results = new Map()
  for (const { name, dir, run } of subjects) {
    const process = spawn(run.command, run.args, { cwd: `subjects/${dir}` })
    handleCloseWithError(process, name)
    await waitSignal(process)
    printer.info('Start', name)
    results.set(name, await bench(opts))
    process.kill('SIGINT')
    await waitClosing(process)
    printer.info('End', name, '\r\n')
  }
  return results
}
