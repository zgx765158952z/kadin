import { http } from '@/network/http.js'

export function modifyUserInfo(params) {
	return http.put('/user/modifyUserInfo', params)
}