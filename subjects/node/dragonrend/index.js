const http = require('http')
const { Dragonrend, Router } = require('../../../../dragonrend')
const jsonBodyParser = require('dragonrend-json-body-parser')
const response = require('dragonrend-response')

const cluster = require('../cluster')

const app = new Dragonrend()

jsonBodyParser(app)
response(app)

const router = new Router({ prefix: '/api' })

router.get('/get-tiny-json-entity', (ctx) => {
  ctx.response.body = { message: 'Hello There' }
})

router.get('/get-large-json-entity', (ctx) => {
  ctx.response.body = {
    id: 123,
    message: 'Hello There',
    entity: {
      message: 'Hello There Again'
    },
    extra: [
      'And',
      'Again'
    ]
  }
})

router.post('/post-tiny-json-entity', (ctx) => {
  ctx.response.body = ctx.request.body
  ctx.response.status = 201
})

router.post('/post-large-json-entity', (ctx) => {
  ctx.response.body = ctx.request.body
  ctx.response.status = 201
})

router.get('/get-plain-text', (ctx) => {
  ctx.response.body = 'Hello There'
  ctx.response.contentType = 'text/plain'
})

router.get('/get-tiny-json-entity-by-id/:id', (ctx) => {
  ctx.response.body = {
    id: ctx.params.id,
    message: 'Hello There'
  }
})

app.merge(router)

cluster(() => {
  http
    .createServer(app.toListener())
    .listen(8080, () => console.log('START'))
})
