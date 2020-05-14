import { http } from '@/network/http.js'

export function doLogin(data) {
	return http.post('/login/phoneLogin', data)
}



//获取当前账号的IM的token
export function getAccountImTokenRequest(params) {
	return http.get('/yunxin/getToken' + params)
}