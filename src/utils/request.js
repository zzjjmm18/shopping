import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'

// 创建一个新的axios实例
const instance = axios.create({
  baseURL,
  timeout: 5000 // 超时时间
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 获取用户信息对象
  const { profile } = store.state.user
  // 判断是否有token
  if (profile.token) {
    // 有token，在头部携带token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码时进入该函数
  if (err.response && err.response.status === 401) {
    // 清空无效用户信息
    store.commit('user/setUser', {})
    // 跳转需要传参（当前路由地址）给登录页码
    // encodeURIComponent 转换uri编码，防止解析地址出问题
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 如果是get请求  需要使用params来传递参数
    // 如果不是get请求  需要使用data来传递参数   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData === params:submitData
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
