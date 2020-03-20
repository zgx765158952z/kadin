import { http } from '@/network/http.js'

//获取某个好友的信息
export function getMyFriendInfoRequest(params) {
	return http.get('/myFriend/queryFriendInfo' + params)
}


//修改某个好友信息
export function updateFriendInfoRequest(params) {
	return http.put('/myFriend/updateFriendInfo', params)
}