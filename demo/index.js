import instance from './request'
import Monitoring from '../lib/Monitoring'
// dependency injection
const monitoring = new Monitoring(instance)
// start observe
monitoring.observe()
instance.get('/v2/api/getUser')
  .then((response) => {
    console.log(response.duration)
  })
  .catch((error) => {
    console.log(error.duration)
  })
  .finally(() => {
    // cancel observe
    monitoring.disconnect()
    instance.get('/v2/api/getUser').catch((error) => {
      console.log(error.duration)
    })
  })