import { http } from '@/network/http.js'

export function modifyUserInfo(data) {
	return http.post('/user/modifyUserInfo', data)
}