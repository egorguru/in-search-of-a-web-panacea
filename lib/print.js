module.exports = (results, type) => {
  console.log()
  console.log('Benchmark Type:', type)
  console.log()
  results.forEach((result, name) => {
    console.log(name)
    console.log('Request Total:', result.requests.total)
    console.log('2xx:', result['2xx'])
    console.log('Duration:', result.duration)
    console.log()
  })
  console.log()
}
