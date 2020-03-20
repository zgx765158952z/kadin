import { http } from '@/network/http.js'

export function changepwdRequest(params) {
	return http.put('/user/forgetPassword', params)
}
