const { Dragonrend, Router } = require('dragonrend')

const cluster = require('../cluster')

const app = new Dragonrend()

const router = new Router({ prefix: '/api' })

router.get('/get-tiny-json-entity', (ctx) => {
  ctx.response.json({ message: 'Hello There' })
})

router.get('/get-large-json-entity', (ctx) => {
  ctx.response.json({
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

router.post('/post-tiny-json-entity', (ctx) => {
  ctx.response.status(201).json(ctx.request.body)
})

router.post('/post-large-json-entity', (ctx) => {
  ctx.response.status(201).json(ctx.request.body)
})

router.get('/get-plain-text', (ctx) => {
  ctx.response.text('Hello There')
})

router.get('/get-tiny-json-entity-by-id/:id', (ctx) => {
  ctx.response.json({
    id: ctx.params.id,
    message: 'Hello There'
  })
})

app.merge(router)

cluster(() => {
  app.listen(8080).then(() => console.log('START'))
})
