import { http } from '@/network/http.js'

export function doLogin(data) {
	return http.post('/login/phoneLogin', data)
}