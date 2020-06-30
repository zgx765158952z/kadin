import { http } from '@/network/http.js'
import {create}  from '@/js_sdk/pocky-request/index.js'

//搜索好友
function searchFriendRequest(params) {
	return http.get('/query/searchFriend' + params)

}

//申请添加好友
function ApplyAddFriendRequest(data) {
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
function queryFriendRequestListRequest(params) {
	return http.get('/query/queryFriendRequestList' + params)
}


//同意或忽略添加好友
function argeeFriendRequest(params) {
	return http.post('/user/consentFriendRequest', params)
}

//查询好友列表
function queryFriendRequest(params) {
	return http.get('/query/queryFriendList' + params)
}

//获取某个好友个人信息
function getFriendInfo(params) {
	return http.get('/query/queryFriendInfo' + params)
}

//删除好友
function delFriendRequest(data) {
	// account friendAccount
	return http.post('/myFriend/deleteFriend', data)
}

export {
	searchFriendRequest,
	ApplyAddFriendRequest,
	queryFriendRequestListRequest,
	argeeFriendRequest,
	queryFriendRequest,
	getFriendInfo,
	delFriendRequest
}