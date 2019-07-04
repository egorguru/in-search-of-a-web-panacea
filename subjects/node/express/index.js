const express = require('express')
const bodyParser = require('body-parser')

const cluster = require('../cluster')

const app = express()

const router = express.Router()

app.use(bodyParser.json())

router.get('/get-tiny-json-entity', (req, res) => {
  res.json({ message: 'Hello There' })
})

router.get('/get-large-json-entity', (req, res) => {
  res.json({
    id: 123,
    message: 'Hello There',
    entity: {
      message: 'Hello There Again'
    },
    extra: [
      'And',
      'Again'
    ]
  })
})

router.post('/post-tiny-json-entity', (req, res) => {
  res.status(201)
  res.json(req.body)
})

router.post('/post-large-json-entity', (req, res) => {
  res.status(201)
  res.json(req.body)
})

router.get('/get-plain-text', (req, res) => {
  res.contentType('text/plain').send('Hello There')
})

router.get('/get-tiny-json-entity-by-id/:id', (req, res) => {
  res.json({
    id: req.params.id,
    message: 'Hello There'
  })
})

app.use('/api', router)

cluster(() => {
  app.listen(8080, () => console.log('START'))
})
