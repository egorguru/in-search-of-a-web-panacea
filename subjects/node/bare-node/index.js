const http = require('http')
const url = require('url')

const cluster = require('../cluster')

const routes = {
  '/api/get-tiny-json-entity': (_, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Hello There' }))
  },
  '/api/get-large-json-entity': (_, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      id: 123,
      message: 'Hello There',
      entity: {
        message: 'Hello There Again'
      },
      extra: [
        'And',
        'Again'
      ]
    }))
  },
  '/api/post-tiny-json-entity': (req, res) => {
    let buffer1 = ''
    req.on('data', (chunk) => buffer1 += chunk)
    req.on('end', () => {
      const body = JSON.parse(buffer1)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(body))
    })
  },
  '/api/post-large-json-entity': (req, res) => {
    let buffer2 = ''
    req.on('data', (chunk) => buffer2 += chunk)
    req.on('end', () => {
      const body = JSON.parse(buffer2)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(body))
    })
  },
  '/api/get-plain-text': (_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello There')
  }
}

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname
  const handler = routes[path]
  if (handler === undefined) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Not Found' }))
  } else {
    handler(req, res)
  }
})

cluster(() => {
  server.listen(8080, () => console.log('START'))
})
