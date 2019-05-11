const fastify = require('fastify')

const app = fastify()

app.post('/api/post', async (request, reply) => {
  return request.body
})

app.get('/api/get', async (request, reply) => {
  return { hello: 'world' }
})

app.listen(8080, () => console.log('Server has been started'))
