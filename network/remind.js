import { http } from '@/network/http.js'

//添加定时任务
function saveMindRequest(data) {
	return http({
		url: '/remind/saveMindThing',
		method: 'post',
		data,
		headers: {
			'Content-Type': 'application/json'
		}
	})
	
}

//删除定时任务
function delRemindRequest(data) {
	return http.post('/remind/deleteScheduledTasks', data)
}

//修改定时任务
function modifyRemindRequest(data) {
	return http({
		headers: {
			"Content-Type": 'application/json'
		},
		url: '/remind/modifyScheduledTasks',
		method: 'post',
		data
	})
}

//查询用户所有的定时任务
function queryRemindRequest(account, pageNum, pageSize=20) {
	return http.get(`/remind/queryScheduledTasks?account=${account}&pageNum=${pageNum}&pageSize=${pageSize}`)
}
module.exports = {
	saveMindRequest,
	delRemindRequest,
	modifyRemindRequest,
	queryRemindRequest
}