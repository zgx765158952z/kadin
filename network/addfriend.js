import { http } from '@/network/http.js'
import {create}  from '@/js_sdk/pocky-request/index.js'

//搜索好友
export function searchFriendRequest(params) {
	return http.get('/query/searchFriend' + params)

}

//申请添加好友
export function ApplyAddFriendRequest(data) {
	return http({
		headers: {
			"Content-Type": "application/json"
		},
		method: 'post',
		url: '/user/addFriendRequest',
		data
	})
}

//查询申请添加好友列表
export function queryFriendRequestListRequest(params) {
	return http.get('/query/queryFriendRequestList' + params)
}


//同意或忽略添加好友
export function argeeFriendRequest(params) {
	return http.post('/user/consentFriendRequest', params)
}

//查询好友列表
export function queryFriendRequest(params) {
	return http.get('/query/queryFriendList' + params)
}

//获取某个好友个人信息
export function getFriendInfo(params) {
	return http.get('/query/queryFriendInfo' + params)
}