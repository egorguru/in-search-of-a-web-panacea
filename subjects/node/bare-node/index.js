const http = require('http')
const url = require('url')

http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname
  switch (path) {
    case '/api/get-tiny-json-entity':
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Hello There' }))
      break
    case '/api/get-large-json-entity':
      res.writeHead(201, { 'Content-Type': 'application/json' })
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
      break
    case '/api/post-tiny-json-entity':
      let buffer1 = ''
      req.on('data', (chunk) => buffer1 += chunk)
      req.on('end', () => {
        const body = JSON.parse(buffer1)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(body))
      })
      break
    case '/api/post-large-json-entity':
      let buffer2 = ''
      req.on('data', (chunk) => buffer2 += chunk)
      req.on('end', () => {
        const body = JSON.parse(buffer2)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(body))
      })
      break
    case '/api/get-plain-text':
      res.writeHead(201, { 'Content-Type': 'text/plain' })
      res.end('Hello There')
      break
    default:
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Not Found' }))
  }
}).listen(8080, () => console.log('START'))
