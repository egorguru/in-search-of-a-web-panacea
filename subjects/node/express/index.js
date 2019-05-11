const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const router = express.Router()

app.use(bodyParser.json())

router.post('/post', (req, res) => res.json(req.body))

router.get('/get', (req, res) => {
  res.json({ hello: 'world' })
})

app.use('/api', router)

app.listen(3000, () => console.log('Server has been started'))
