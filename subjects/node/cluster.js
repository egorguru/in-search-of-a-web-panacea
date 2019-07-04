const cluster = require('cluster')
const os = require('os')

module.exports = (fn) => {
  if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork()
    }
  } else {
    fn()
  }
}
