const fastify = require('fastify')

const cluster = require('../cluster')

const app = fastify()

app.get('/api/get-tiny-json-entity', (request, reply) => {
  reply
    .header('Content-Type', 'application/json')
    .send({ message: 'Hello There' })
})

app.get('/api/get-large-json-entity', (request, reply) => {
  reply
    .header('Content-Type', 'application/json')
    .send({
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

app.post('/api/post-tiny-json-entity', (request, reply) => {
  reply
    .code(201)
    .header('Content-Type', 'application/json')
    .send(request.body)
})

app.post('/api/post-large-json-entity', (request, reply) => {
  reply
    .code(201)
    .header('Content-Type', 'application/json')
    .send(request.body)
})

app.get('/api/get-plain-text', (request, reply) => {
  reply
    .header('Content-Type', 'text/plain')
    .send('Hello There')
})

app.get('/api/get-tiny-json-entity-by-id/:id', (request, reply) => {
  reply
    .header('Content-Type', 'application/json')
    .send({
      id: request.params.id,
      message: 'Hello There'
    })
})

cluster(() => {
  app.listen(8080, () => console.log('START'))
})
