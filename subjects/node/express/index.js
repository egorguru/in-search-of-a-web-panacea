const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const router = express.Router()

app.use(bodyParser.json())

router.post('/post', (req, res) => res.json(req.body))

router.get('/get', (req, res) => {
  res.json({
    id: 123,
    message: 'Hello There',
    extra: [
      'And',
      'There'
    ]
  })
})

app.use('/api', router)

app.listen(8080, () => console.log('START'))
