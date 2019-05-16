const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const app = new Koa()

const router = new Router().prefix('/api')

router.post('/post', (ctx) => {
  ctx.body = ctx.request.body
})

router.get('/get', (ctx) => {
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
