const fastify = require('fastify')

const app = fastify()

app.post('/api/post-json-entity', (request, reply) => {
  reply
    .code(201)
    .header('Content-Type', 'application/json')
    .send(request.body)
})

app.get('/api/get-json-entity', (request, reply) => {
  reply
    .header('Content-Type', 'application/json')
    .send({
      id: 123,
      message: 'Hello There',
      extra: [
        'And',
        'There'
      ]
    })
})

app.get('/api/get-plain-text', (request, reply) => {
  reply
    .header('Content-Type', 'plain/text')
    .send('Hello There')
})

app.listen(8080, () => console.log('START'))
