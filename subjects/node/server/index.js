const fastify = require('fastify')

const cluster = require('../cluster')

const app = fastify()

app.get('/api/proxy', ({ query }, reply) => reply.send(query))

// cluster(() => {
app.listen(8090, () => console.log('START'))
// })
