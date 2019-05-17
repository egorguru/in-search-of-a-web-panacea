const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const app = new Koa()

const router = new Router().prefix('/api')

router.post('/post-json-entity', (ctx) => {
  ctx.body = ctx.request.body
  ctx.status = 201
})

router.get('/get-json-entity', (ctx) => {
  ctx.body = {
    id: 123,
    message: 'Hello There',
    extra: [
      'And',
      'There'
    ]
  }
})

app.use(bodyparser())

app.use(router.routes())

app.listen(8080, () => console.log('START'))
