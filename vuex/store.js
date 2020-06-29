import Vue from 'vue'
import Vuex from 'vuex'
import dealGroupMsg from '@/utils/dealGroupMsg.js'

import { queryFriendRequest } from '@/network/addfriend.js'
import { getMyUserInfo } from "@/network/myUserInfo.js"
import { getNewestDynamicRequest, getMyDynamicRequest, getPersonDynamicRequest } from '@/network/dynamic.js'
import { formatList, setNewestFriendCard, deepClone } from '@/common/index.js'
import { handlePushMsg } from '@/common/socketHelper.js'

import { queryGroupInfoRequest } from '@/network/session/session.js'
import { judgeMessageType, calcTimeHeader, judgeOverTwoMinute, generateRichTextNode, generateImageNode, generateFingerGuessImageFile, generateBigEmojiImageFile } from '@/utils/utils.js'


//#ifdef APP-PLUS
import { insertOneRawMsg } from '@/common/imHelper.js'
//#endif


Vue.use(Vuex)

//变量
var state = {
	
	//登录状态
	hasLogin: false,
	//用户信息
	userInfo: {},
	//好友列表
	friendList: [],
	//朋友动态的数据
	friendDynamicList: [],
	//个人动态的数据
	personDynamicList: [],
	
	friendCard: {}, //好友列表，含名片信息，额外添加在线信息
	remindInfos: [], //事项提醒列表
	
	/*即时通讯篇*/
	currentChatTo: '', // 正在聊天 sessionId
	currentChatList: [], //正在聊天的会话列表
	rawMessageList: {}, //所有的聊天列表
	newGroupInfo: {}, //新建群信息
	
	currentGroup: {}, //当前群信息
	currentGroupMembers: [], //当前群成员列表
	
	personList: {}, // 所有有信息的人的列表
	groupList: {}, // 群列表
	groupMemberList: {}, //群成员列表
	groupMemberMap: {}, // 群成员列表
	unreadInfo: {}, // 未读信息，包含已、未订阅的账户数
	notificationList: { system: [], custom: [] }, //系统通知：分系统消息和自定义通知
	
	historyMsgList: [], //当前帐户的所有聊天记录
	
	/* 收到的socket服务器回调消息  用于更新 */
	//data: "{'pushType': '定时推送', 'object': {'id': 75, 'remindTitle': 'title'.....}}"
	newPushMsg: null, //定时推送
	newFriendRequest: 0, //朋友请求添加好友
	newFriendDynamic: [], //好友与我互动的数据
	newCommentCount: 0, //新评论和点赞数
	newAppVersion: null, //APP版本更新
	
	/* 本地数据库存储的信息 */
	localUserInfo: {} //本地所有人的信息
	/**
	 * 登录用户个人信息
	 * userInfo: {account, avatar, birth, createTime, email, gender, nick, sign, tel, updateTime}
	 * friendCard: { account: {account,nick,avatar,sign,gender:'male/female/unknown',tel,updateTime,createTime, isBlack, status} }
	 * onlineList: {account: status}
	 * groupList: {teamId:{avatar,beInviteMode,createTime,inviteMode,joinMode,level,memberNum,memberUpdateTime,mute,muteType,name,owner,teamId,type,updateCustomMode,updateTeamMode,updateTime,valid,validToCurrentUser}}
	 * groupMemberList: {teamId: [{teamId,account,type,nickInTeam,active,joinTime,updateTime}]}
	 * messageListToRender: {account: {unixtime1: {from,to,type,scene,text,sendOrReceive,displayTimeHeader,time}, unixtime2: {}}}
	 * rawMessageList: {sessionId: {unixtime1: {flow,from,fromNick,idServer,scene,sessionId,text,target,to,time...}, unixtime2: {}}}
	 * unreadInfo: {sessionId: unread}
	 * notificationList: {system: [{desc:'',msg:{category,from,idServer,read,state,status,time,to,type}}], custom: []}
	 * netcallCallList: [{account,nick,avatar}]
	 * netcallGroupCallInfo: {id,members:['account'],teamName,type}
	 */
}
var mutations = {
	//应用隐藏时保存数据
	appHideSetData(state) {
		uni.setStorageSync(`state_${state.userInfo.user.userAccount}`, state)
		console.log('完成state的存储:', state)
	},
	
	appStartGetData(state, account) {
		console.log('原始state:', state)
		let obj = uni.getStorageSync(`state_${account}`)
		let newObj = Object.assign({}, obj)
		let userInfo = Object.assign({}, state.userInfo)
		state.rawMessageList = newObj.rawMessageList || {}
		state.unreadInfo = newObj.unreadInfo || {}
		state.groupMemberList = newObj.groupMemberList
		state.groupMemberMap = newObj.groupMemberMap
		//以下测试用
		state.groupList['2804760970'] = {
			tid: '2804760970',
			groupName: '年创公司的讨论组',
			announcement: null,
			gourpIcon: null,
			msgNotification: null,
			creator: '1579139382461',
			createTime: '1587542138000',
			myGroupName: '年创公司'
		}
		console.log('state初始化完成:', state)
	},
	
	//获取单个sessionId历史记录并追加
	appendRawMessageList(state, payload) {
		let temp = Object.assign({}, state.rawMessageList[payload.sessionId])
		state.rawMessageList[payload.sessionId] = Object.assign({}, temp, payload.data)
		console.log('获取单个sessionId历史记录并追加:', state.rawMessageList)
	},
	setRawMessageList(state, data) {
		console.log('数据库rawMsg:', data)
		state.rawMessageList = data
	},
	
	setRemindInfos(state, list) {
		this.remindInfos = deepClone(list)
		console.log('this.remindInfos', this.remindInfos)
	},
	
	setFriendCard(state, data) {
		state.friendCard = data
	},
	
	//修改当前会话id
	setCurrentChatTo(state, sessionId) {
		state.currentChatTo = sessionId
		console.log('改变当前chatTo为:', state.currentChatTo)
	},
	
	setCurrentGroup(state, account) {
		state.currentGroup = state.groupList[account]
		console.log('设置currentGroup当前群为:', state.currentGroup)
	},
	setCurrentChatList(state, data) {
		state.currentChatList = data
		console.log('更新当前会话为:', state.currentChatList)
	},
	setHistoryMsgList(state, payload) {
		state.historyMsgList = payload
	},
	
	//改变为已登录状态,并存储用户信息
	setLogin(state, userInfo) {
		state.hasLogin = true
		state.userInfo = userInfo
		uni.setStorageSync('userInfo', userInfo)
	},
	
	//清空数据更新
	clearNewData(state, payload) {
		switch(payload) {
			case 'clearnewPushMsg': { //清除新定时提醒标志
				break
			}
			case 'clearnewFriendRequest': { //清除添加好友新请求标志
				break
			}
			case 'clearnewCommentCount': { //清除朋友圈新动态标志
				state.newCommentCount = 0
				break
			}
			
		}
	},
	
	//退出登录,未登录状态,删除用户信息
	logout(state) {
		state.hasLogin = false
		state.userInfo = {}
		uni.removeStorageSync('userInfo')
	},
	
	
	//获取本地userInfo
	getLocalUserInfo(state) {
		const userInfo = uni.getStorageSync('userInfo')
		state.userInfo = userInfo
	},
	
	
	//刷新个人用户信息
	RefreshMyUserInfo(state, data) {
		state.userInfo.user = data
		uni.setStorageSync('userInfo', state.userInfo)
	},
	
	
	
	
	//对获取的朋友动态的数据以时间戳排序并存储
	/*index=1是所有朋友的动态列表, index=2是个人的动态列表*/
	sortFriendDynamicList(state, data) {
		const newList = data.list.sort(function(a, b){
			return b.time - a.time
		})
		if(data.index === 1) {
			state.friendDynamicList.push(...newList)
		}else if(data.index === 2) {
			state.personDynamicList = newList
		}
	},
	
	//自己发表动态后更新朋友圈数据
	updateFriendDynamicList(state, data) {
		state.friendDynamicList.splice(0, 0, data)
	},
	//清空所有动态
	clearFriendDynamicList(state) {
		state.friendDynamicList = []
	},
	/***
		1,打开应用
			获取userInfo,判断当前是否为登录状态
				未登录:	跳转到登录页面
				已登录:	跳转到首页,并给全局变量userInfo hasLogin赋值
		2,关闭应用前
			将全局变量userInfo保存到本地仓储userInfo
			
		3,登录/注册/修改密码  成功后
			请求最新的个人信息,保存个人信息到全局变量userInfo与hasLogin,还有本地仓储userInfo
			
		4,退出登录
			清除全局userInfo与hasLogin与本地仓储userInfo
			
	
	***/
	
	
	
	//清除指定未读
	clearUnread(state, sessionId) {
		state.rawMessageList.forEach(item => {
			if(item.sessionId === sessionId) {
				item.unread = 0
				return
			}
		})
	}
	
	
	
}




//异步操作
var actions = {
	
	
	
	//获取自己的用户信息
	doGetMyUserInfo(context) {
		getMyUserInfo(`?myAccount=${store.getters.getUserAccount}`).then(res => {
			if(res.status === 200) {
				if(res.data.code === 2000) {
					context.commit('RefreshMyUserInfo', res.data.data)
				}else {
					uni.showToast({
						title: '您可能与服务器断开了连接',
						icon: 'none'
					})
				}
			}else {
				uni.showToast({
					title: '您可能与服务器断开了连接',
					icon: 'none'
				})
			}
		}).catch(err => {
			console.log(err)
		})
	},
	
	//获取好友列表
	getFriendList(context) {
		queryFriendRequest(`?account=${store.state.userInfo.user.userAccount}`).then(res => {
			if(res.status === 200) {
				if(res.data.code === 4003) {
				}else if(res.data.code === 2000) {
					if(res.data.data.length > 0) {
						state.friendList = formatList(res.data.data)
						
						state.friendCard = setNewestFriendCard(state, res.data.data)
						console.log('state.friendCard:', state.friendCard)
					}
				}
			}
			
		}).catch(err => {
			console.log(err)
			uni.showToast({
				title: '您可能与服务器断开连接了',
				icon: 'none'
			})
		})
	},
	
	
	//获取所有朋友的动态
	getNewestDynamic(context, payload) {
		getNewestDynamicRequest(payload).then((res) => {
			if(res.status === 200 && res.data.code === 2000) {
				let data = res.data.data
				if(state.friendDynamicList.length > 0 && data[data.length-1].id === state.friendDynamicList[state.friendDynamicList.length-1].id) {
					let globalData = getApp().globalData
					globalData.moreFriendDynamicList = false
					console.log('后面没有更多数据', globalData.moreFriendDynamicList)
				}else {
					console.log('后面还有数据')
					//传多个参数方式
					context.commit({
						type: 'sortFriendDynamicList',
						list: res.data.data,
						index:1
					})
				}
				
				console.log('state.friendDynamicList', state.friendDynamicList)
			}
		})
	},
	
	//获取自己的动态
	doGetMyDynamicRequest(context, payload) {
		uni.showLoading()
		getMyDynamicRequest(`?account=${payload.account}`).then(res => {
			console.log(res)
			uni.hideLoading()
			if(res.status === 200) {
				if(res.data.code === 2000) {
					//传多个参数方式
					context.commit({
						type: 'sortFriendDynamicList',
						list: res.data.data.length > 0 ? res.data.data: [],
						index: 2
					})
				}else {
					uni.showToast({
						title: '程序飞到外星球去了',
						icon: 'none'
					})
				}
			}else if(res.status === 404) {
				uni.showToast({
					title: '网络飞到外星球去了',
					icon: 'none'
				})
			}else {
				uni.showToast({
					title: '程序飞到外星球去了',
					icon: 'none'
				})
			}
		}).catch(err => {
			uni.showToast({
				title: '网络飞到外星球去了',
				icon: 'none'
			})
			console.log(err)
		})
	},
	
	//获取某个朋友的动态
	doGetPersonDynamicRequest(context, payload) {
		getPersonDynamicRequest(payload).then(res => {
			console.log(res)
			if(res.status === 200) {
				if(res.data.code === 2000) {
					context.commit({
						type: 'sortFriendDynamicList',
						list: res.data.data.length > 0? res.data.data: [],
						index: 2
					})
				}else {
					uni.showToast({
						title: '程序跑到火星去了',
						icon: 'none'
					})
				}
			}else if(res.status === 404) {
				uni.showToast({
					title: '网络跑到火星去了',
					icon: 'none'
				})
			}else {
				uni.showToast({
					title: '程序跑到火星去了',
					icon: 'none'
				})
			}
		}).catch(err => {
			console.log(err)
			uni.showToast({
				title: '程序跑到火星去了',
				icon: 'none'
			})
		})
	},
	
	/*  接收socket服务器的消息并更新本地一些数据  */
	updateNewest(context, payload) {
		let newData = payload.object
		switch(payload.pushType) {
			case "定时推送": {
				let globalData = getApp().globalData
				handlePushMsg(newData, globalData)
				state.newPushMsg = newData
				break
			}
			case "好友请求": {
				state.newFriendRequest += 1
				uni.setTabBarBadge({
					index: 2,
					text: `${state.newFriendRequest}`
				})
				break
			}
			case "朋友圈更新": {
				console.log('朋友圈更新')
				uni.showTabBarRedDot({
					index: 1
				})
				break
			}
			case "点赞评论更新": {
				
				if(state.friendCard[newData.fromUser]) {
					state.newFriendDynamic.splice(0, 0, newData)
					console.log('state.newFriendDynamic', state.newFriendDynamic)
					if(state.friendDynamicList.length > 0) { //更新动态
						let tempFriendDynamicList = Object.assign([], state.friendDynamicList)
						for(let i=0; i<tempFriendDynamicList.length; i++) {
							if(tempFriendDynamicList[i].id === newData.friendCircleId) {
								let addComment = {}
								if(newData.type === 2) { //增加评论
									addComment['commentContent'] = newData.content
									addComment['commentFatherId'] = newData.commentFatherId
									addComment['commentId'] = newData.commentId
									addComment['commentTime'] = newData.time
									addComment['friendCircleId'] = newData.friendCircleId
									addComment['user'] = newData.fromUser
									addComment['toUser'] = newData.toUser
									addComment['userNickname'] = state.friendCard[newData.fromUser].friendRemarkName
									addComment['friendName'] = state.friendCard[newData.toUser].friendRemarkName
									tempFriendDynamicList[i].comment.push(addComment)
								}else if(newData.type === 1) { //增加点赞数
									tempFriendDynamicList[i].likePerson[`${newData.fromUser}`] = state.friendCard[newData.fromUser].friendRemarkName
								}
								state.friendDynamicList = Object.assign([], tempFriendDynamicList)
								console.log('state.friendDynamicList:', state.friendDynamicList)
								break //终止循环
							}
						}
					}
					console.log('555')
					state.newCommentCount += 1
					uni.setTabBarBadge({
						index: 1,
						text: `${state.newCommentCount}`,
					})
				}
				
				break
			}
			
			case "APP版本更新": {
				state.newAppVersion = payload.object
			}
		}
	},
	
	/*即时通讯篇*/
	
	imAction(context, payload) {
		switch(payload.mode) {
			//获取会话列表，并请求对应好友用户信息与列表合并
			case 'getSessionsList': {
				break
			}
			//存储原始消息: rawMessageList
			case 'onMsg': {
				/*
				  attach:{type: "acceptTeamInvite", team: {…}, account: "twilbeter3", users: Array(2), members: Array(1)}
				  cc:true
				  flow:"out"
				  from:"twilbeter"
				  fromClientType:"Web"
				  fromNick:""
				  idClient:"c86b07d8-c98f-4186-94a4-68c2db010ae2"
				  idServer:"93284035043786753"
				  isHistoryable:true
				  isLocal:false
				  isOfflinable:true
				  isPushable:true
				  isReplyMsg:true
				  isRoamingable:true
				  isSyncable:true
				  isUnreadable:true
				  needMsgReceipt:false
				  needPushNick:false
				  scene:"team"
				  sessionId:"team-1390040443"
				  status:"success"
				  target:"1390040443"
				  text:""
				  time:1536914522419
				  to:"1390040443"
				  type:"notification"
				*/
				
			    let tempState = Object.assign({}, state)
				let msg = payload.data
				let nim = payload.nim
				tempState.rawMessageList = Object.assign({}, tempState.rawMessageList)
				// 自己的退群消息就不记录、展示了
				if (msg && msg.type === 'notification') { // 群通知消息  && msg.scene === 'team'
				  if ((msg.attach.type === 'leaveTeam' || msg.attach.type ===  'dismissTeam') && msg.from === tempState.userInfo.account) {
				    return
				  }
				  dealGroupMsg.dealMsg(msg, tempState, tempState.userInfo.user.userAccount)
				}
				
				let sessionId = msg.sessionId
				if (!tempState.rawMessageList[sessionId]) { 
				  tempState.rawMessageList[sessionId] = {} //初始化该消息对应的原始消息的对应属性
				}
				tempState.rawMessageList[sessionId][msg.time] = Object.assign({}, msg) //当前消息时间做键
				if(tempState.currentChatTo === msg.sessionId && nim) { 
					nim.resetSessionUnread(msg.sessionId) //当前会话时清除未读数
				}
				state.rawMessageList = tempState.rawMessageList //追加进原始消息
				console.log('state.rawMessageList:', state.rawMessageList)
				
				
				//插入一条数据到本地数据库
				//#ifdef APP-PLUS
					insertOneRawMsg(state.userInfo.user.userAccount, msg)
				//#endif
				
				break
			}
			case 'onUpdateSession': { //更新未读数
				let tempUnreadInfo = Object.assign({}, state.unreadInfo)
				tempUnreadInfo[payload.data.id] = payload.data.unread
				state.unreadInfo = tempUnreadInfo
				console.log('更新未读数', state.unreadInfo)
				break
				
				
				// #ifdef APP-PLUS
				//将所有聊天内容存储到数据库
				
				// #endif
				
				
				
				console.timeEnd('time1')
				break
				
			}
			//存储离线消息
			case 'onOfflineMsgs': {
				let sessionId = payload.data.sessionId
				let msgs = payload.data.msgs
				let tempState = Object.assign({}, state)
				if(!tempState.rawMessageList[sessionId]) { //初始化
					tempState.rawMessageList[sessionId] = {}
				}
				msgs.map(item => {
					tempState.rawMessageList[sessionId][item.time] = item
				})
				state = Object.assign({}, state, tempState)
				// if(!state.rawMessageList[sessionId]) { //初始化
				// 	state.rawMessageList[sessionId] = {}
				// }
				// msgs.map(item => {
				// 	console.log('item:', item)
				// 	state.rawMessageList[sessionId][item.time] = Object.assign({}, item)
				// })
				
				console.log('离线消息存储完成:', state.rawMessageList)
				
				//#ifdef APP-PLUS
				insertOneRawMsg(state.userInfo.user.userAccount, payload.data.msgs)
				//#endif
				
				break
				
			}
			case 'onDisconnect': {
				
				break
			}
			
			
			case 'onAddTeamMembers': { //新成员入群或创建群
				//判断当前是新建群还是新成员入群
				const teamId = payload.data.team.teamId
				
				queryGroupInfoRequest(state.userInfo.user.userAccount, teamId).then(res => {
					this.$toast.showRes(res)
					if(res.data.code === 2000) {
						dealGroupMsg.onAddTeamMembers(res.data.data, null, state)
					}
				}).catch(err => {
					this.$toast.showErr(err)
				})
				
				break
				
			}
			
			
			case 'onRemoveTeamMembers': { //有成员退群
				let tempState = Object.assign({}, state)
				dealGroupMsg.onRemoveTeamMembers(payload.data, null, tempState)
				break
			}
			
			case 'onSyncDone': { //同步完成
				uni.$emit('syncComplete', {})
				break
			}
			
		}
	},
	
	
	//获取群信息
	queryGroupInfo(context, payload) {
		queryGroupInfoRequest(payload.account, payload.teamId).then(res => {
			showRes(res)
			if(res.data.code === 2000) {
				return res.data
			}
		}).catch(err => {
			showErr(err)
			return false
		})
	}
	
}

//计算属性
var getters = {
	getUserAccount(state) {
		return state.userInfo.user.userAccount
	},
	/**
	 * 将原生消息转化为最近会话列表渲染数据
	 */
	MconvertRawMessageListToRenderChatList(state) {
		let chatList = []
		let sessions = Object.keys(state.rawMessageList)
		let index = 0
		sessions.map(session => { //遍历原始消息列表的键sessionId
			let account = session.indexOf('team-') === 0 ? session.slice(5, session.length) : session.slice(4, session.length)
			let isP2p = session.indexOf('p2p-') === 0
			let chatType = isP2p ? 'p2p' : (state.groupList[account] && state.groupList[account].type)
			let sessionCard = (isP2p ? state.friendCard[account] : state.groupList[account]) || {}
			let unixtimeList = Object.keys(state.rawMessageList[session]) //遍历原始消息对应sessionId的属性的键(即时间戳)
			if (!unixtimeList) {
				return
			}
			let maxTime = Math.max(...unixtimeList) //返回时间戳数组中最大即最新的时间戳,时间戳对应的属性就是对应该消息
			if (maxTime) { //处理单条消息,后作为首页的会话列表展示
				let msg = state.rawMessageList[session][maxTime + ''] || {} //取到最新消息
				let msgType = judgeMessageType(msg)
				let lastestMsg = msgType
				let status = isP2p ? (sessionCard.status || '离线') : '' //名片信息
				let nick = isP2p ? (sessionCard.nick || '非好友') : sessionCard.name
				// let avatar =  isP2p ? (sessionCard.avatar || app.globalData.PAGE_CONFIG.defaultUserLogo) : (sessionCard.avatar || app.globalData.PAGE_CONFIG.defaultUserLogo)
				console.log('state.unreadInfo[session]', state.unreadInfo[session])
				chatList.push({
					chatType,
					session,
					account,
					status,
					nick, //名字
					// avatar, //头像
					lastestMsg: lastestMsg || msg.text,
					type: msgType || msg.type,
					timestamp: msg.time,
					unread: state.unreadInfo[session] || 0,
					displayTime: msg.time ? calcTimeHeader(msg.time) : ''
				})
			}
		})
		// 排序
		chatList.sort((a, b) => {
			return b.timestamp - a.timestamp
		})
		console.log('chatList:', chatList, state.rawMessageList)
		
		return chatList
	},
	
	
	
	
	
	/**
	 * 原始消息列表转化为适用于渲染的消息列表
	 * {unixtime1: {flow,from,fromNick,idServer,scene,sessionId,text,target,to,time...}, unixtime2: {}}
	 * =>
	 * [{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
	 */
	SconvertRawMessageListToRenderMessageArr() {
	  let rawMsgList = state.rawMessageList[state.currentChatTo]
	  let messageArr = []
	  for(let time in rawMsgList) {
	    let rawMsg = rawMsgList[time]
	    let msgType = ''
	    if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 1) {
	      msgType = '猜拳'
	    } else if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 3) {
	      msgType = '贴图表情'
	    } else {
	      msgType = rawMsg.type
	    }
		//返回距离上条消息超过两分钟的时间
	    let displayTimeHeader = judgeOverTwoMinute(rawMsg.time, messageArr)
	    let sendOrReceive = rawMsg.flow === 'in' ? 'receive' : 'send'
	    let specifiedObject = {}
	    switch(msgType) {
	      case 'text': {
	        specifiedObject = {
	          nodes: generateRichTextNode(rawMsg.text) //生成富文本节点
	        }
	        break
	      }
	      case 'image': {
	        specifiedObject = {
	          nodes: generateImageNode(rawMsg.file)  //处理图片富文本节点
	        }
	        break
	      }
	      case 'geo': { //地理信息
	        specifiedObject = {
	          geo: rawMsg.geo
	        }
	        break
	      }
	      case 'audio': {
	        specifiedObject = {
	          audio: rawMsg.file
	        }
	        break
	      }
	      case 'video': {
	        specifiedObject = {
	          video: rawMsg.file
	        }
	        break
	      }
	      case '猜拳': {
	        let value = JSON.parse(rawMsg['content']).data.value
	        specifiedObject = {
	          nodes: generateImageNode(generateFingerGuessImageFile(value))
	        }
	        break
	      }
	      case '贴图表情': {
	        let content = JSON.parse(rawMsg['content'])
	        specifiedObject = {
	          nodes: generateImageNode(generateBigEmojiImageFile(content))
	        }
	        break
	      }
	      case 'tip': {
	        specifiedObject = {
	          text: rawMsg.tip,
	          nodes: [{
	            type: 'text',
	            text: rawMsg.tip
	          }]
	        }
	        break
	      }
	      case '白板消息':
	      case '阅后即焚': {
	        specifiedObject = {
	          nodes: [{
	            type: 'text',
	            text: `[${msgType}],请到手机或电脑客户端查看`
	          }]
	        }
	        break
	      }
	      case 'file':
	      case 'robot': {
	        let text = msgType === 'file' ? '文件消息' : '机器人消息'
	        specifiedObject = {
	          nodes: [{
	            type: 'text',
	            text: `[${text}],请到手机或电脑客户端查看`
	          }]
	        }
	        break
	      }
	      case 'custom':
	        specifiedObject = {
	          nodes: [{
	            type: 'text',
	            text: '自定义消息'
	          }]
	        }
	        break;
	      case 'notification':
	        specifiedObject = {
	          // netbill的text为空
	          text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text),
	          nodes: [{
	            type: 'text',
	            text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text)
	          }]
	        }
	        break;
	      default: {
	        break
	      }
	    }
	    messageArr.push(Object.assign({}, {
	      from: rawMsg.from,
	      type: msgType,
	      text: rawMsg.text || '',
	      time,
	      sendOrReceive, //此消息是收到还是发送
	      displayTimeHeader 
	    }, specifiedObject))
	  }
	  console.log('改变了:', messageArr)
	  return messageArr
	},
	
	
	
	
	
	//自己对当前群的权限
	isGroupAdmin(state) {
		const myGroupInfo = state.groupMemberMap[state.currentGroup.tid][state.userInfo.user.userAccount]
		return myGroupInfo.groupIdentity
	},
	
	
	
	
	
	
	//以帐号获取好友的用户的指定信息
	getFriendInfoByAcccount: (state) => (scene, account, type, groupInfo=null) => {
		if(!groupInfo) {
			for(let i=0; i<state.friendList.length; i++) {
				if(state.friendList[i].list.length > 0) {
					const infoItem = state.friendList[i].list.find(item => Object.is(item.friendAccount, account))
					if(infoItem) {
						return infoItem[type]
					}
				}
				continue
			}
		}else {
			const info = {
				'friendAccount': '1582100290662',
				'friendFaceImage': 'group1/M00/00/01/wKgBsF5M8pOAXXuUAACwUQ5hK8k971.jpg',
				'friendRemarkName': '讨论组',
				'remarkTag': 1
			}
			return info[type]
			
			
		}
		
		
		// if(scene === 'p2p') {
		// 	for(let i=0; i<state.friendList.length; i++) {
		// 		if(state.friendList[i].list.length > 0) {
		// 			const infoItem = state.friendList[i].list.find(item => Object.is(item.friendAccount, account))
		// 			console.log('第几个:', i)
		// 			if(infoItem) {
		// 				console.log('true:', infoItem)
						
		// 				return infoItem[type]
		// 			}
		// 		}
		// 		continue
		// 	}
		// }else {
		// 	const Info = groupInfo.find(item => Object.is(item.account, account))
		// 	return Info[type]
		// }
		
	},
	
	//最近会话列表加入用户/群信息和以最新时间排序
	calcRawMessageList(state) {
		let list =  state.rawMessageList
		
		for(let i=0; i<list.length; i++) {
			
			state.friendList.forEach(item1 => {
				item1.list.forEach(item2 => {
					if(item2.friendAccount === list[i].target) {
						list[i].friendInfo = item2
					}
				})
			})
		}
		return list.sort(function(a, b) {
			return b.time - a.time
		})
	},
	
	
	
	
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

export default store;



