const http = require('http')
const url = require('url')

http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname
  switch (path) {
    case '/api/post-json-entity':
      let buffer = ''
      req.on('data', (chunk) => buffer += chunk)
      req.on('end', () => {
        const body = JSON.parse(buffer)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(body))
      })
      break
    case '/api/get-json-entity':
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        id: 123,
        message: 'Hello There',
        extra: [
          'And',
          'There'
        ]
      }))
      break
    default:
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Not Found' }))
  }
}).listen(8080, () => console.log('START'))
