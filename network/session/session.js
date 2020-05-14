import { http } from '@/network/http.js'

//发送消息
function sendMsgRequest(data) { 
	return http({
		url: '/singleChat/sendMsg',
		method: 'post',
		data,
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
//创建群
function createGroupRequest(data) {
	return http({
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'post',
		url: '/group/createGroup',
		data
		
	})
}

//拉人入群
function addGroupRequest(data) {
	return http.post({
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'post',
		url: '/group/addGroup',
		data
	})
}

//踢人出群
function kickGroupRequest(params) {
	return http.delete('/group/kickGroup' + params)
}

//查看群信息
function queryGroupInfoRequest(accid, tid) {
	return http.get(`/group/queryGroupInfo?accid=${accid}&tid=${tid}`)
}

//修改群消息提醒
function modifyMsgRemindRequest(data) {
	return http({
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'post',
		url: '/group/modifyMsgRemind',
		data
	})
}

//退群
function quitGroupRequest(data) {
	return http.post('/group/quitGroup', data)
}

//添加管理员
function addManagerRequest(data) {
	return http({
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'post',
		url: '/group/addManager',
		data
	})
}



//移除管理员
function removeManagerRequest(params) {
	return http.delete('/group/removeManager' + params)
}

//移交群主
function changeOwnerRequest(params) {
	return http.put('/group/changeOwner', params)
}


module.exports = {
	sendMsgRequest,
	createGroupRequest,
	addGroupRequest,
	kickGroupRequest,
	queryGroupInfoRequest,
	modifyMsgRemindRequest,
	quitGroupRequest,
	addManagerRequest,
	removeManagerRequest,
	changeOwnerRequest
}