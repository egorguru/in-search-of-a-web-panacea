const http = require('http')
const { Dragonrend, Router } = require('dragonrend')
const jsonBodyParser = require('dragonrend-json-body-parser')
const jsonResponse = require('dragonrend-response')

const app = new Dragonrend()

app.addHandlerBefore(jsonBodyParser.before)

app.addHandlerBefore(jsonResponse.before)

app.addHandlerAfter(jsonResponse.after)

const router = new Router({ prefix: '/api' })

router.post('/post-json-entity', (data) => {
  data.response.body = data.request.body
})

router.get('/get-json-entity', (data) => {
  data.response.body = {
    id: 123,
    message: 'Hello There',
    extra: [
      'And',
      'There'
    ]
  }
  data.response.status = 201
})

router.get('/get-plain-text', (data) => {
  data.response.body = 'Hello There'
  data.response.contentType = 'application/json'
})

app.merge(router)

http
  .createServer(app.toListener())
  .listen(8080, () => console.log('START'))
