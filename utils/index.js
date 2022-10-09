export const setTimeBuryPoint = (config) => {
  config.metaData = {
    startTime: Date.now()
  }
}

export const setDuration = (response) => {
  const { config } = response
  const endTime = Date.now()
  config.metaData.endTime = endTime
  response.duration = endTime - config.metaData.startTime
}

const rejectInjectInstance = () => { throw new Error('please inject axios instance') }

export const checkInstance = (instance) => {
  if (!instance) {
    rejectInjectInstance()
  }
}
