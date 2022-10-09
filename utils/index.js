export const setTimeBuryPoint = (options) => {
  options.metaData = {
    startTime: Date.now()
  }
  return options
}
export const setDuration = (options) => {
  const endTime = Date.now()
  const duration = endTime - options.metaData.startTime
  options.metaData.endTime = endTime
  return duration
}

const rejectInjectInstance = () => { throw new Error('please inject axios instance') }

export const checkInstance = (instance) => {
  if (!instance) {
    rejectInjectInstance()
  }
}
