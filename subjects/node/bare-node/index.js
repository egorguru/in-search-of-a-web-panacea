const http = require('http')
const url = require('url')

http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname
  switch (path) {
    case '/api/post':
      let buffer = ''
      req.on('data', (chunk) => buffer += chunk)
      req.on('end', () => {
        const body = JSON.parse(buffer)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(body))
      })
      break
    case '/api/get':
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ hello: 'world' }))
      break
    default:
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Not Found' }))
  }
}).listen(3000, () => console.log('Server has been started'))
