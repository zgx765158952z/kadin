import { http } from '@/network/http.js'

export function saveMindRequest(params) {
	return http.post('/remind/saveMindThing', params)
}