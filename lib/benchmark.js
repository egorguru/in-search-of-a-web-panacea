const { spawn } = require('child_process')
const { StringDecoder } = require('string_decoder')
const autocannon = require('autocannon')
const usage = require('usage')

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
      printer.error(name, 'process completed with code', code, '\r\n')
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

function averageProcessUsage(pid) {
  return new Promise((resolve, reject) => {
    usage.lookup(pid, { keepHistory: true }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

module.exports = async (subjects, opts) => {
  const results = new Map()
  for (const { name, dir, run } of subjects) {
    const process = spawn(run.command, run.args, { cwd: `subjects/${dir}` })
    handleCloseWithError(process, name)
    await waitSignal(process)
    printer.info(name, 'Started')
    results.set(name, {
      benchmark: await bench(opts),
      usage: await averageProcessUsage(process.pid)
    })
    process.kill('SIGINT')
    await waitClosing(process)
    printer.info(name, 'Completed', '\r\n')
  }
  return results
}
