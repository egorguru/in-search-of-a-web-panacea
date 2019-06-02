const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const app = new Koa()

const router = new Router().prefix('/api')

router.get('/get-tiny-json-entity', (ctx) => {
  ctx.body = { message: 'Hello There' }
})

router.get('/get-large-json-entity', (ctx) => {
  ctx.body = {
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
  ctx.body = ctx.request.body
  ctx.status = 201
})

router.post('/post-large-json-entity', (ctx) => {
  ctx.body = ctx.request.body
  ctx.status = 201
})

router.get('/get-plain-text', (ctx) => {
  ctx.body = 'Hello There'
})

app.use(bodyparser())

app.use(router.routes())

app.listen(8080, () => console.log('START'))
