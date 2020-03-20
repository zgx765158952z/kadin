import { http } from '@/network/http.js'

//获取手机号对应帐号,用于测试
export function getAccount(phone) {
	return http.get('/query/getAccount' + phone)
}


//发送验证码
export function sendCode(params) {
	return http.get(
		'/query/getSecurityCode' + params
	)
	
}

export function doRegister(params) {
	return http.post('/register/phoneRegister', params)
}

export function queryPhoneHasBeenUsed(params) {
	return http.get('/query/queryPhoneStatus' + params)
}