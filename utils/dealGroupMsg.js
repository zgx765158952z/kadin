function getMsgKey(msg, tempState, selfAccount) {
	var obj = {}
	var flow = msg.flow
	selfAccount = selfAccount || tempState && tempState.userInfo.user.userAccount
	console.log('selfAccount:', selfAccount)
	obj.type = msg.attach && msg.attach.type
	obj.from = msg.from
	obj.fromNick = msg.fromNick || obj.from
	obj.teamId = msg.to
	obj.timetag = msg.time
	obj.team = msg.attach && msg.attach.team || {}
	obj.teamType = obj.team.type === 'advanced' || tempState && tempState.groupList[obj.team.teamId] && tempState.groupList[
		obj.team.teamId].type === 'advanced' ? '群' : (obj.team.type === 'normal' || tempState && tempState.groupList[obj.team
		.teamId] && tempState.groupList[obj.team.teamId].type === 'normal' ? '讨论组' : '群组')
	obj.account = msg.attach && msg.attach.account || ''
	obj.accounts = msg.attach && msg.attach.accounts || []
	obj.members = msg.attach && msg.attach.members || []
	obj.showNick = selfAccount === obj.from ? '你' : obj.fromNick
	obj.attachAccount = selfAccount === obj.account ? '你' : obj.account
	obj.mute = msg.attach && msg.attach.mute
	let index = obj.accounts.indexOf(selfAccount)
	if (index !== -1) {
		obj.accounts.splice(index, 1, '你')
	}
	console.log('getMsgKey后', obj)
	return obj
}

function dealMsg(msg, tempState, selfAccount) {
	var msgKey = getMsgKey(msg, tempState, selfAccount)
	switch (msgKey.type) {
		case 'updateTeam':
			if (msgKey.team.name) {
				msg.groupNotification = msgKey.showNick + '更新了' + msgKey.teamType + '名称'
			} else if (msgKey.team.intro) {
				msg.groupNotification = msgKey.showNick + '更新了群介绍'
			} else if (msgKey.team.announcement) {
				msg.groupNotification = msgKey.showNick + '更新了群公告'
			} else {
				msg.groupNotification = msgKey.showNick + '更新了群设置'
			}
			// if (tempState) {
			// 	onUpdateTeam(msg, msgKey, tempState)
			// }
			break;
		case 'addTeamMembers':
			msg.groupNotification = msgKey.showNick + '邀请' + msgKey.accounts.join('，') + '进入了' + msgKey.teamType
			// if (tempState) {
			// 	onAddTeamMembers(msg, msgKey, tempState)
			// }
			break;
		case 'removeTeamMembers':
			if (msgKey.from === msgKey.accounts.join('，')) {
				msg.groupNotification = msgKey.accounts.join('，') + '退出了' + msgKey.teamType
			} else {
				msg.groupNotification = msgKey.showNick + '将' + msgKey.accounts.join('、') + '移出了' + msgKey.teamType
			}
			// if (tempState) {
			// 	onRemoveTeamMembers(msg, msgKey, tempState)
			// }
			break;
		case 'acceptTeamInvite':
			msg.groupNotification = msgKey.showNick + '接受了' + msgKey.attachAccount + '的入群邀请'
			break;
		case 'passTeamApply':
			if (msgKey.from === msgKey.account) {
				msg.groupNotification = msgKey.showNick + '进入了' + msgKey.teamType
			} else {
				msg.groupNotification = msgKey.showNick + '通过了' + msgKey.attachAccount + '的加群申请'
			}
			break;
		case 'addTeamManagers':
			msg.groupNotification = msgKey.showNick + '将' + msgKey.accounts.join('，') + '设置为管理员'
			break;
		case 'removeTeamManagers':
			msg.groupNotification = msgKey.showNick + '取消了' + msgKey.accounts.join('，') + '管理员身份'
			break;
		case 'leaveTeam':
			msg.groupNotification = msgKey.showNick + '退出了' + msgKey.teamType
			// if (tempState) {
			// 	onLeaveTeam(msg, msgKey, tempState)
			// }
			break;
		case 'dismissTeam':
			msg.groupNotification = msgKey.showNick + '解散了群'
			break;
		case 'transferTeam':
			msg.groupNotification = msgKey.showNick + '转移了群主身份给' + msgKey.attachAccount
			break;
		case 'updateTeamMute':
			msg.groupNotification = msgKey.attachAccount + '被' + msgKey.showNick + (msgKey.mute ? '' : '解除') + '禁言'
			break;
	}
}

function splitGroupMemberArray(item, isInvalid, memberList) {
	if (!item) {
		console.log('不存在item--1')
		return
	}
	console.log('item:', item)
	console.log('memberList:', memberList)
	switch (item.groupIdentity) {
		case '3':
			memberList.unshift(item)
			break;
		case '2':
			if (memberList[0] && memberList[0].groupIdentity === '3') {
				memberList.splice(1, 0, item)
			} else {
				memberList.unshift(item)
			}
			break;
		default:
			console.log('追加成员列表')
			memberList.push(item)
	}
	console.log('最终item、memberList:', item, memberList)
}
// 更新群信息
function onUpdateTeam(msg, msgKey, tempState, updateIsCurrentNotIn) {
	var card
	if (msgKey) {
		card = Object.assign({}, tempState.groupList[msgKey.teamId], msgKey.team)
		tempState.groupList[msgKey.teamId] = card
	} else {
		card = Object.assign({}, tempState.groupList[msg.teamId], msg)
		tempState.groupList[msg.teamId] = card
	}
	if (tempState.currentGroup.teamId === card.teamId) {
		tempState.currentGroup = card
	}
	if (updateIsCurrentNotIn) {
		card.isCurrentNotIn = false
	}
	return card
}
// 更新群信息
function onUpdateTeamAndCurrent(msg, msgKey, tempState, updateIsCurrentNotIn) {
	tempState.currentGroup = onUpdateTeam(msg, msgKey, tempState, updateIsCurrentNotIn)
}

// 获取了某群组的所有成员、增加了成员
// 更新 groupList groupMemberList groupMemberMap currentGroup currentGroupMembers
function onAddTeamMembers(msg, msgKey, tempState) { // team, accounts, members
	var obj
	if (msgKey) {
		obj = msgKey
	} else {
		obj = msg
		console.log('无msgKey', msg)
	}
	console.log('obj=msg:', obj)
	if (!tempState.groupList[obj.tid]) { // 如果还没有初始化群
		tempState.groupList[obj.tid] = {}
		let teamInfo = {}
		teamInfo['tid'] = obj.tid
		teamInfo['groupName'] = obj.groupName
		teamInfo['announcement'] = obj.announcement
		teamInfo['groupIcon'] = obj.groupIcon
		teamInfo['msgNotification'] = obj.msgNotification
		teamInfo['groupDescription'] = obj.groupDescription
		teamInfo['creator'] = obj.creator
		teamInfo['createTime'] = obj.createTime
		teamInfo['myGroupName'] = obj.myGroupName
		console.log('首次设置群teamInfo:', teamInfo)
		tempState.groupList[obj.tid] = Object.assign({}, group, teamInfo)
		console.log('没有初始化群')
	}
	if (!tempState.groupMemberList[obj.tid]) { // 如果还没有初始化成员列表
		tempState.groupMemberList[obj.tid] = []
		console.log('没有初始化成员列表list')
	}
	if (!tempState.groupMemberMap[obj.tid]) { // 如果还没有初始化成员列表
		tempState.groupMemberMap[obj.tid] = {}
		console.log('没有初始化成员列表map')
	}
	var group = Object.assign({}, tempState.groupList[obj.tid])
	let list = tempState.groupMemberList[obj.tid].slice() // 因为该群成员列表可能是currentGroupMembers的值
	let listMap = tempState.groupMemberMap[obj.tid]
	var oldMembers = list.map(item => item.account)
	obj.groupMember.map(item => {
		console.log('oldMembers', oldMembers)
		let index = oldMembers.indexOf(item.account) //检索该成员是否已在groupMemberList里存有信息
		let oldInfo = tempState.personList[item.account] || {}
		if (index === -1 && !listMap[item.account]) { //该成员信息不存在
			console.log('新增成员不存在本地成员列表')
			splitGroupMemberArray(item, false, list)
			listMap[item.account] = item
			// tempState.personList[item.account] = Object.assign(oldInfo, item)
		} else { //该成员信息已存在
			console.log('新增成员在本地成员列表')
			list[index] = Object.assign({}, list[index], item)
			listMap[item.account] = list[index]
			// tempState.personList[item.account] = Object.assign(oldInfo, list[index])
		}
	})
	tempState.groupMemberList[obj.tid] = list //更新groupMemberList

	group = tempState.groupList[obj.tid]
	
	
	// if (list.length === tempState.groupList[obj.teamId].memberNum) {
	// 	list.allMembers = true // 记录以及取过所有成员
	// }
	if (obj.tid === tempState.currentGroup.tid) { // 需要更新当前会话中的群
		tempState.currentGroup = tempState.groupList[obj.tid]
		tempState.currentGroupMembers = list // 更新成员列表
	}
	console.log("tempState:", tempState)
}
// 移除了成员
// 更新更新 groupList groupMemberList groupMemberMap currentGroup currentGroupMembers ；
// 检验了当前用户是否在对应的群里,当前用户在该群时,需要删除历史记录和群信息等,更新群 isCurrentNotIn 标志;
function onRemoveTeamMembers(msg, msgKey, tempState) {
	
	var obj
	if (msgKey) {
		// team, accounts, members
		obj = msgKey
	} else {
		obj = msg
	}
	
	obj.tid = obj.teamId || obj.team && obj.team.teamId
	if(obj.accounts.indexOf(tempState.userInfo.user.userAccount) !== -1) {
		//我退出了群,需要删除关于该群的所有信息
		delete tempState.groupList[obj.tid]
		delete tempState.groupMemberList[obj.tid]
		delete tempState.groupMemberMap[obj.tid]
		//还有数据库的聊天记录
		
	}else {
		if (!tempState.groupList[obj.tid]) { // 如果还没有初始化群
			tempState.groupList[obj.tid] = {}
		}
		if (!tempState.groupMemberList[obj.tid]) { // 如果还没有初始化成员列表
			tempState.groupMemberList[obj.tid] = []
		}
		if (!tempState.groupMemberMap[obj.tid]) { // 如果还没有初始化成员列表
			tempState.groupMemberMap[obj.tid] = {}
		}
		var group = Object.assign({}, tempState.groupList[obj.tid])
		let list = tempState.groupMemberList[obj.tid].slice()
		let listMap = tempState.groupMemberMap[obj.teamId]
		for (let i = list.length - 1; i >= 0; i--) {
			if (obj.accounts.indexOf(list[i].account) !== -1) {
				list.splice(i, 1)
			}
		}
		obj.accounts.map(account => {
			if (listMap[account]) {
				delete listMap[account]
			}
		})
		tempState.groupMemberList[obj.teamId] = list
		if (obj.teamId === tempState.currentGroup.teamId) { // 需要更新当前群
			tempState.currentGroup = group
			tempState.currentGroupMembers = list // 更新成员列表
		}
	}
	
	console.log('tempState:', tempState)
}

function onLeaveTeam(msg, msgKey, tempState) {
	if (msgKey && msgKey.teamId) {
		if (msgKey.showNick === '你') {
			console.error('设置true')
			tempState.groupList[msgKey.teamId] = Object.assign({}, tempState.groupList[msgKey.teamId], {
				isCurrentNotIn: true
			})
		}
		msgKey.accounts = [msgKey.from]
		onRemoveTeamMembers(null, msgKey, tempState)
	}
}

module.exports = {
	dealMsg,
	splitGroupMemberArray,
	onUpdateTeam,
	onUpdateTeamAndCurrent,
	onAddTeamMembers,
	onRemoveTeamMembers,
	onLeaveTeam
}
