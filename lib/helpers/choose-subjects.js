const inquirer = require('inquirer')

const subjects = require('../../settings/subjects')
module.exports = async (filter = () => true) => {
  const { all } = await inquirer.prompt({
    type: 'confirm',
    name: 'all',
    message: 'Should it select all subjects?',
    default: true
  })
  const subjectsWithNames = getSubjectsWithNames(filter)
  if (all) {
    return subjectsWithNames
  } else {
    const { selectedSubjects } = await inquirer.prompt({
      type: 'checkbox',
      message: 'Select Subjects',
      name: 'selectedSubjects',
      choices: subjectsWithNames,
      validate(answer) {
        return answer.length < 1 ?
          'You should choose at least one subject' : true
      }
    })
    return selectedSubjects
      .map((name) => subjectsWithNames.find((subject) => name === subject.name))
  }
}

function getSubjectsWithNames(filter) {
  const result = []
  for (const name in subjects) {
    const subject = subjects[name]
    if (filter(subject)) {
      subject.name = name
      result.push(subject)
    }
  }
  return result
}
