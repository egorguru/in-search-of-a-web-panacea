const { dragonrend } = require('dragonrend')

const cluster = require('../cluster')

const { GET, POST, START } = dragonrend({
  routing: {
    prefix: '/api'
  }
})

GET('/get-tiny-json-entity', ctx => {
  ctx.response.json({ message: 'Hello There' })
})

GET('/get-large-json-entity', ctx => {
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

POST('/post-tiny-json-entity', ctx => {
  ctx.response.status(201).json(ctx.request.body)
})

POST('/post-large-json-entity', ctx => {
  ctx.response.status(201).json(ctx.request.body)
})

GET('/get-plain-text', ctx => {
  ctx.response.text('Hello There')
})

GET('/get-tiny-json-entity-by-id/:id', ctx => {
  ctx.response.json({
    id: ctx.request.params.id,
    message: 'Hello There'
  })
})

cluster(() => {
  START(8080, () => console.log('START'))
})
