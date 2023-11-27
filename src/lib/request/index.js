import { deepClone } from '$lib'
import axios from 'axios'
// import { Loading } from 'stdf'
// import Cookies from 'js-cookie'
import proxy from './base'
const TIMEOUT = 3000000
const CancelToken = new axios.CancelToken(cancel => cancel())
const ERRORS = {
    'Network Error': '网络错误，请检查网络',
    99999: '系统繁忙，请稍后再试！',
    [`timeout of ${TIMEOUT}ms exceeded`]: '请求超时，服务器未响应',
    'Internal Server Error': '请求服务器错误',
    'Request failed with status code 502': '请求服务器错误',
    api: '接口错误'
}

const httpPending = {}
const removeHttpPending = (config, isRemove = true) => {
    if (!config || !config.headers.method) {
        return false
    }
    const key = config.headers.method
    const val = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data
    if (httpPending[key] === val) {
        isRemove ? delete httpPending[key] : console.warn(`[${key}]: repeated http request`)
        return true
    }
    if (!isRemove) {
        httpPending[key] = val
    }
    return false
}

const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: TIMEOUT // request timeout
    // headers: { 'format': 'JSON' }
})
service.defaults.headers.post['Content-Type'] = 'application/json'
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
service.defaults.headers.put['Content-Type'] = 'application/json'
// request interceptor
service.interceptors.request.use(
    config => {
        config.url = config.headers.url
        if (config.headers.url) {
            delete config.headers.url
        }
        // 请求遮罩层
        // if ((config.data && config.data.loading) || (config.params && config.params.loading)) {
        //     let options = config.data || config.params
        //     loadingInstance = Loading.service({
        //         fullscreen: true,
        //         lock: true,
        //         text: options.loadingText || '加载中...',
        //         spinner: 'el-icon-loading',
        //         background: 'rgba(255, 255, 255, 0.8)',
        //         ...options
        //     })
        // }
        if ((config.method === 'post' || config.method === 'put') && config.headers['Content-Type'] === 'application/json') {
            // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
            config.data = JSON.stringify(config.data)
        }
        if (config.method === 'get') {
            // 遍历get请求参数中含有数组参数转化成字符串传参
            for (const key in config.data) {
                if (config.data[key] instanceof Array) {
                    config.data[key] = config.data[key].toString()
                }
            }
            config.params = config.data || {}
        }
        // 防止重复提交
        if (removeHttpPending(config, false)) {
            config.cancelToken = CancelToken
        }
        // const token = Cookies.get(`${website}_token`)
        // token && (config.headers.Authorization = 'Bearer ' + token)
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        if (response.headers.authorization) {
            // let { authorization } = response.headers
            // Cookies.set(`${website}_token`, authorization)
        }
        if (response.status !== 200) {
            return Promise.reject(response.data)
        }
        //  文件流下载
        // eslint-disable-next-line no-irregular-whitespace
        // if (response.data instanceof Blob) {
        //     return response.data
        // }
        const { code } = response.data
        if (code === '00000') {
            return response.data
        }
        return response.data
    },
    error => {
        // 请求异常处理, 如网络错误、http 500
        removeHttpPending(error.config)
        const msg = error.message
        if (msg) {
            error.message = ERRORS[msg] || msg
        }
        const data = {
            success: false,
            code: 500,
            message: error.message
        }
        return data
    }
)

export default service

/**
 * 封装 http
 * @param method: open api code
 * @param data: request body
 * @param opt: string | boolean | object
 * @returns {AxiosPromise}
 * opt:
 *   string: appkey不符合通用规则时，值为特殊的appkey
 *   boolean: 接口出错时是否弹出提示信息
 *   object: 自定义配置，比如替换接口的错误提示信息
 *   {
 *     msg: '自定义错误提示信息',
 *     cancel: true, // 接口调用失败时是否提示错误信息
 *     log: false, // 是否上报接口调用日志
 *     axios: {} // axios request config
 *   }
//  */
//  this.$http('[get]{prefix}/portal/web/recommend/queryRecommendPage', {
//     currentPage: 1, pageSize: 10
// })
export const http = (url, data, opt) => {
    const regex1 = /\[(.+?)\]/g // [] 中括号及内容
    // eslint-disable-next-line no-useless-escape
    const reg1 = /[^\[]*\[(.*)\][^\]]*/ // 匹配[]
    const regex2 = /\{(.+?)\}/g // {} 大括号及内容
    // eslint-disable-next-line no-useless-escape
    const reg2 = /[^\{}]*\{(.*)\}[^\}]*/ // 匹配{}
    let methodName = 'get'
    if (regex2.test(url)) {
        const domainName = url.match(regex2)[0].replace(reg2, '$1')
        proxy[domainName] && (url = url.replace(regex2, proxy[domainName]))
    } else {
        url = `${proxy.baseUrl || ''}${url}`
    }
    if (regex1.test(url)) {
        methodName = url.match(regex1)[0].replace(reg1, '$1')
        url = url.replace(regex1, '')
    }
    const cof = { method: methodName, data }
    if (opt && opt.headers) {
        opt = deepClone(opt)
        opt.headers.url = url
        Object.assign(cof, opt)
    } else {
        Object.assign(cof, { headers: { url } })
    }
    return service(cof)
}
