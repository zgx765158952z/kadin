import axios from '@/js_sdk/gangdiedao-uni-axios'


// import { baseUrl, req_data } from '@/common/helper.js'
import { http_config } from '@/common/helper.js'
import { showRes, showErr } from '@/common/toast.js'
/**
 * 请求接口日志记录
 */
function _reqlog(req) {
    if (process.env.NODE_ENV === 'development') {
        console.log("请求地址：" + req.url, req.data || req.params)
    }
    //TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${res.config.url}响应结果：`, res)
    }
}

const http = axios.create(http_config)
// const http = axios.create({
// 	// baseURL: [baseUrl],
// 	baseURL: baseUrl,
// 	// baseURL: "http://192.168.1.138:9090",
// 	timeout: 5000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
// 	// #ifdef H5
// 	withCredentials: true,
// 	// #endif
// 	headers: {
// 		// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
// 		'Content-Type': 'application/json;charset=UTF-8'
// 		// 'X-Requested-With': 'XMLHttpRequest',
// 		// 'Access-Control-Allow-Origin': '*', //跨域加上头
// 	}
// })




// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
	// code...
	// 获取本地存储的Cookie
	// const cookie = uni.getStorageSync('cookie')
	// 设置Cookie
	// config.headers.Cookie = cookie
	
	
	//登录时发送token
	// const loginUrl = config.url;
	// if(loginUrl.slice(0,18) === '/login/phoneLogin') {
	// 	//获取本地Storeage,验证用户
	// 	const userInfo = uni.getStorageInfoSync('userInfo');
	// 	config.headers.token = userInfo.token
	// }
	
	// const data = config.data
	// console.log(data.userPhone, data.userPassword)
	// return false
	console.log(config)
	_reqlog(config)
	return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
	_reslog(response)
	// code...
	// 获取cookie
	// let headerStr = JSON.stringify(response.headers)
	// let cookie = (/(?:Set-Cookie).+;/.exec(headerStr)[0]).replace(/Set-Cookie|:|"/g, "")
	// if (cookie) {
		// uni.setStorage({
			// key: 'cookie',
			// data: cookie.split(';')[0]
		// })
	// }
	// showRes(response)
	return response
}, error => {
	// showErr(error)
	return Promise.reject(error.message)
})
	
export  { http }


