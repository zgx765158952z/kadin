import SDK from '@/js_sdk/NIM_Weixin_SDK_v7.3.0/NIM_Web_SDK_weixin_v7.3.0.js'
import ENVIRONMENT_CONFIG from '@/common/imConfig.js'
import store from '@/vuex/store.js'

let app = getApp()
let orderCounter = 0

// 第一次进去onConnect onBlacklist onMutelist onFriends onMyInfo onUsers onTeams SyncDone onPushEvents

export default class IMController {
	constructor(headers) {
	  app.globalData.nim = SDK.NIM.getInstance({
	    // 初始化SDK
	    debug: false,
	    appKey: ENVIRONMENT_CONFIG.appkey,
	    token: headers.token,
	    account: headers.account,
		syncSessionUnread: true, // 同步未读数
	    promise: true,
	    transports: ['websocket'],
	    onconnect: this.onConnect,
	    onwillreconnect: this.onWillReconnect,
	    ondisconnect: this.onDisconnect,
	    onerror: this.onError,
		// 私有化配置文件
		privateConf: ENVIRONMENT_CONFIG.openPrivateConf ? app.globalData.ENVIRONMENT_CONFIG.privateConf : '',
		// 同步完成
		onsyncdone: this.onSyncDone,
		// 用户关系
		onblacklist: this.onBlacklist,
		onsyncmarkinblacklist: this.onMarkInBlacklist,
		onmutelist: this.onMutelist,
		onsyncmarkinmutelist: this.onMarkInMutelist,
		// // 用户名片
		onmyinfo: this.onMyInfo,
		// 机器人列表的回调
		onrobots: this.onRobots,
		// 群组
		onAddTeamMembers: this.onAddTeamMembers,
		onRemoveTeamMembers: this.onRemoveTeamMembers,
		onUpdateTeam: this.onUpdateTeam,
		onUpdateTeamManagers: this.onUpdateTeamManagers,
		onDismissTeam: this.onDismissTeam,
		onTransferTeam: this.onTransferTeam,
		onUpdateTeamMembersMute: this.onUpdateTeamMembersMute,
		shouldCountNotifyUnread: this.shouldCountNotifyUnread,
		// 会话
		onsessions: this.onSessions,
		onupdatesession: this.onUpdateSession,
		// 消息
		onroamingmsgs: this.onRoamingMsgs,
		onofflinemsgs: this.onOfflineMsgs,
		onmsg: this.onMsg,
		// 系统通知
		onofflinesysmsgs: this.onOfflineSysMsgs,
		onsysmsg: this.onSysMsg,
		onupdatesysmsg: this.onUpdateSysMsg,
		onsysmsgunread: this.onSysMsgUnread,
		onupdatesysmsgunread: this.onUpdateSysMsgUnread,
		onofflinecustomsysmsgs: this.onOfflineCustomSysMsgs,
		oncustomsysmsg: this.onCustomSysMsg,
		// 收到广播消息
		onbroadcastmsg: this.onBroadcastMsg,
		onbroadcastmsgs: this.onBroadcastMsgs,
		// 事件订阅
		onpushevents: this.onPushEvents,
	  })
	}
	
	onConnect(res) {
		console.log('连接成功:', res)
	}
	
	onWillReconnect(res) {
		console.log('重新连接:', res)
		uni.showToast({title: '正在重新连接~',icon: 'none'})
	}
	
	onDisconnect(res) {
		console.log('断开连接:', res)
		uni.showToast({title: '断开了连接',icon: 'none'})
	}
	
	onError(err) {
		console.log('连接失败:', err)
	}
	
	onSyncDone(data) {
		console.log('同步完成:', data)
		try {
			store.dispatch({
				type: 'imAction',
				mode: 'onSyncDone'
			})
		}catch(e) {
			console.log(e)
		}
	}
	
	onBlacklist(res) {
		console.log('黑名单列表:', res)
	}
	
	onMarkInBlacklist(res) {
		console.log('加入或移除黑名单:', res)
	}
	
	onMutelist(res) {
		console.log('同步静音列表:', res)
	}
	
	onMarkInMutelist(res) {
		console.log('加入/移除:', res)
	}
	
	onmyinfo(res) {
		console.log('我的用户名片:', res)
	}
	
	onRobots(res) {
		console.log('机器人列表:', res)
	}
	
	
	
	
	onAddTeamMembers(res) {
		console.log('新成员入群:', res)
		try{
			store.dispatch({
				type: 'imAction',
				mode: 'onAddTeamMembers',
				data: res
			})
		}catch(e) {
			console.log(e)
		}
	}
	
	onRemoveTeamMembers(res) {
		console.log('有人退群了:', res)
		try {
			store.dispatch({
				type: 'imAction',
				mode: 'onRemoveTeamMembers',
				data: res
			})
		}catch(e) {
			console.log(e)
		}
	}
	
	onUpdateTeam(res) {
		console.log('群信息发生更新:', res)
	}
	
	onUpdateTeamManagers(res) {
		console.log('群管理员更新(返回包含群信息和管理员信息):', res)
	}
	
	onDismissTeam(res) {
		console.log('解散群:', res)
	}
	
	onTransferTeam(res) {
		console.log('移交群:', res)
	}
	
	onUpdateTeamMembersMute(res) {
		console.log('更新群成员禁言状态:', res)
	}
	shouldCountNotifyUnread(res) {
		console.log('群消息通知是否加入未读数开关:', res?'开启':'关闭' )
	}
	
	
	onSessions(res) {
		console.log('收到会话列表:', res)
		try{
			store.dispatch({
				type: 'imAction',
				mode: 'getSessionsList',
				data: res
			})
		}catch(e) {
			console.log(e)
		}
	}
	/**
	* 会话更新：收到消息、发送消息、设置当前会话、重置会话未读数 触发
	* {id:'p2p-zys2',lastMsg:{},scene,to,unread,updateTime}
	* {id:'team-1389946935',lastMsg:{attach:{accounts,team},type,users},scene,to,from,type,unread,updateTime}
	*/
	onUpdateSession(res) {
		console.log('会话更新了:', res)
		store.dispatch({
			type: 'imAction',
			mode: 'onUpdateSession',
			data: res
			// data: res
		})
		
	}
	onMsg(res) {
		console.log('收到消息', res)
		try {
			store.dispatch({
				type: 'imAction',
				mode: 'onMsg',
				data: res,
				nim: app.globalData.nim
			})
		}catch(e) {
			console.log(e)
		}
	}
	onRoamingMsgs(res) {
		console.log('收到漫游消息:', res)
		app.globalData.nim.deleteSessions({
		    sessions: [{
		        scene: 'team',
		        to: '2810259961'
		    }, {
		        scene: 'p2p',
		        to: '1587348899053'
		    },
			{
				scene: 'p2p',
				to: '1576463907795'
			},
			{
				scene: 'team',
				to: '2804760970'
			},{
				scene: 'team',
				to: '2804760970'
			},
			{
				scene: 'team',
				to: '2810854816'
			}],
		    done: this.deleteSessionsDone
		});
	}
	
	onOfflineMsgs(res) {
		console.log('收到离线消息:', res)
		try{
			store.dispatch({
				type: 'imAction',
				mode: 'onOfflineMsgs',
				data: res
			})
		}catch(e) {
			console.log(e)
		}
	}
	pushMsg(msgs) {
	}
	onOfflineSysMsgs(res) {
		console.log('收到离线消息的通知:', res)
	}
	
	onSysMsg(res) {
		console.log('收到系统通知:', res)
	}
	
	onUpdateSysMsg(res) {
		console.log('更新系统通知后的通知: 通过/拒绝', res)
	}
	
	onSysMsgUnread(res) {
		console.log('收到系统通知未读数:', res)
	}
	
	onUpdateSysMsgUnread(res) {
		console.log('更新系统通知未读数:', res)
	}
	
	onOfflineCustomSysMsgs(res) {
		console.log('同步离线自定义系统通知:', res)
	}
	
	onCustomSysMsg(res) {
		console.log('收到自定义系统通知:', res)
	}
	
	onBroadcastMsg(res) {
		console.log('收到广播消息:', res)
	}
	
	onBroadcastMsgs(res) {
		console.log('收到离线广播消息:', res)
	}
	
	onPushEvents(res) {
		console.log('订阅事件:', res)
	}
	deleteSessionsDone(error, obj) {
		console.log(error);
		console.log(obj);
		console.log('批量删除会话' + (!error?'成功':'失败'));
	}
}





