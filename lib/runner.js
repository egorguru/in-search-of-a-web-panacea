const inquirer = require('inquirer')

const actions = require('./actions')

module.exports = async () => {
  const queue = []
  let isLoop = true
  while (isLoop) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: Object.keys(actions)
    })
    queue.push(await actions[action]())
    const { toContinue } = await inquirer.prompt({
      type: 'confirm',
      name: 'toContinue',
      message: 'Do you want extra task to queue?',
      default: false
    })
    isLoop = toContinue
  }
  for (const action of queue) {
    await action()
  }
}
