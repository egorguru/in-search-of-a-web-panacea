const { request } = require('http')
const HttpAgent = require('agentkeepalive')
const fastify = require('fastify')

const cluster = require('../cluster')

const app = fastify()

const agent = new HttpAgent()

app.get('/api/proxy', ({ raw: { url, headers } }, { res }) => {
  request({
    agent,
    method: 'GET',
    protocol: 'http:',
    host: '127.0.0.1',
    port: 8090,
    path: url,
    headers
  }, response => {
    res.writeHead(response.statusCode, response.headers)
    response.pipe(res, { end: true })
  }).end()
})

cluster(() => {
  app.listen(8080, () => console.log('START'))
})
