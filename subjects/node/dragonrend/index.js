const http = require('http')
const { Dragonrend, Router } = require('dragonrend')
const jsonBodyParser = require('dragonrend-json-body-parser')
const jsonResponse = require('dragonrend-response')

const app = new Dragonrend()

app.addHandlerBefore(jsonBodyParser.before)

app.addHandlerBefore(jsonResponse.before)

app.addHandlerAfter(jsonResponse.after)

const router = new Router({ prefix: '/api' })

router.post('/post', (data) => {
  data.response.body = data.request.body
})

router.get('/get', (data) => {
  data.response.body = { hello: 'world' }
})

app.merge(router)

http
  .createServer(app.toListener())
  .listen(8080, () => console.log('Server has been started'))
