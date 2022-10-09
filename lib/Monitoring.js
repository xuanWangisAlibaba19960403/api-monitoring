import { setDuration, checkInstance } from "../utils"
export default class Monitoring {
  constructor(instance/* axios */) {
    checkInstance(instance)
    this.instance = instance
    this.reqEventIds = []
    this.resEventIds = []
  }
  get request() {
    checkInstance(this.instance)
    return this.instance.interceptors.request
  }

  get response() {
    checkInstance(this.instance)
    return this.instance.interceptors.response
  }
  observe() {
    checkInstance(this.instance)
    // 添加请求拦截器
    this.reqEventIds.push(this.request.use(function (config) {
      config.metaData = {
        startTime: Date.now()
      }
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }))

    // 添加响应拦截器
    this.resEventIds.push(this.response.use(function (response) {
      // 对响应数据做点什么
      setDuration(response)
      return response;
    }, function (error) {
      // 对响应错误做点什么
      setDuration(error)
      return Promise.reject(error);
    }))
  }
  disconnect() {
    checkInstance(this.instance)
    this.reqEventIds.forEach((eventId) => {
      this.request.eject(eventId)
    })
    this.resEventIds.forEach((eventId) => {
      this.response.eject(eventId)
    })
    this.reqEventIds.length = 0
    this.resEventIds.length = 0
  }
}