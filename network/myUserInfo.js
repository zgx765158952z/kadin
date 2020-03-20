import { http } from "@/network/http.js"

export function getMyUserInfo(params) {
	return http.get('/query/getOwnInfo' + params)
}