const uws = require('uWebSockets')

const cluster = require('../cluster')

const app = uws.App()

app.get('/api/get-tiny-json-entity', (res, _) => {
  res.writeHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ message: 'Hello There' }))
})

app.get('/api/get-large-json-entity', (res, _) => {
  res.writeHeader('Content-Type', 'application/json')
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
})

app.get('/api/get-plain-text', (res, _) => {
  res.writeHeader('Content-Type', 'text/plain')
  res.end('Hello There')
})

cluster(() => {
  app.listen(8080, () => console.log('START'))
})
