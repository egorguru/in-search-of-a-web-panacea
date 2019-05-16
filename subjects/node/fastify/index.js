const fastify = require('fastify')

const app = fastify()

app.post('/api/post', async (request, reply) => {
  return request.body
})

app.get('/api/get', async (request, reply) => {
  return {
    id: 123,
    message: 'Hello There',
    extra: [
      'And',
      'There'
    ]
  }
})

app.listen(8080, () => console.log('START'))
