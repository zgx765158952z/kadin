import Vue from 'vue'
import Vuex from 'vuex'

import { queryFriendRequest } from '@/network/addfriend.js'
import { getMyUserInfo } from "@/network/myUserInfo.js"
import { getNewestDynamicRequest, getMyDynamicRequest, getPersonDynamicRequest } from '@/network/dynamic.js'
import { isChinese } from '@/common/index.js'

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
	personDynamicList: []
	
}
var mutations = {
	
	//改变为已登录状态,并存储用户信息
	setLogin(state, userInfo) {
		state.hasLogin = true
		state.userInfo = userInfo
		uni.setStorageSync('userInfo', userInfo)
		
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
	
	//根据名字的首字母进行分类合并加排序
	formatList(state, data) {
		const newArr = []
		//存放特殊字符
		const specialArr = []
		for(let i=0; i<26; i++) {
			const key = String.fromCharCode(65 + i) //A-Z赋给key当做键
			
			newArr[i] = {
				letters: key,
				list: []
			}
			
			data.map((v) => {
				//获取备注名
				const getFirstWorld = v.friendRemarkName;
				
				// 判断friendRemarkName，是否有备注名
				if(getFirstWorld) {
					//获取备注名的第一个词
					const fir = getFirstWorld.charAt(0)
					//判断该词是哪个类型并返回
					const getFirstWorldType = isChinese(fir);
					if(getFirstWorldType) {
						// 中文，提取第一个拼音并转大写,英文也可如此
						const UpperFirstWorld = getFirstWorldType.charAt(0).toUpperCase();
						if(UpperFirstWorld === key) {
							newArr[i].list.push(v)
						}
						
					}else {
						//特殊字符
						//将特殊字符组先放到一个特殊组里，只需要遍历一次
						
						if(i===0) {
							specialArr.push(v)
						}
					}
				}else {
					//将特殊字符组先放到一个特殊组里，只需要遍历一次
					
					if(i===0) {
						specialArr.push(v)
					}
				}
			})
			
		}
		
		
		
		//特殊字符对象
		const specialObj = {
			letters: "#",
			list: specialArr
		}
		//将特殊字符对象追加到newArr最后面
		newArr.push(specialObj)
		state.friendList = newArr
	},
	
	
	//对获取的朋友动态的数据以时间戳排序并存储
	/*index=1是所有朋友的动态列表, index=2是个人的动态列表*/
	sortFriendDynamicList(state, data) {
		const newList = data.list.sort(function(a, b){
			return b.time - a.time
		})
		if(data.index === 1) {
			state.friendDynamicList = newList
		}else if(data.index === 2) {
			state.personDynamicList = newList
		}
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
						context.commit('formatList', res.data.data)
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
	getNewestDynamic(context) {
		getNewestDynamicRequest(`?account=${store.state.userInfo.user.userAccount}`).then((res) => {
			console.log(res)
			if(res.status === 200) {
				if(res.data.code === 2000) {
					//传多个参数方式
					context.commit({
						type: 'sortFriendDynamicList',
						list: res.data.data,
						index:1
					})
				}else {
					uni.showToast({
						title: '程序走丢了,请稍后重试',
						icon: 'none'
					})
				}
			}else if(res.status === 404) {
				uni.showToast({
					title: '网络程走丢了,请稍后重试',
					icon: 'none'
				})
			}else {
				uni.showToast({
					title: '程序走丢了,请稍后重试',
					icon: 'none'
				})
			}
		}).catch(err => {
			uni.showToast({
				title: '程序走丢了,请稍后重试',
				icon: 'none'
			})
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
		getPersonDynamicRequest(`?account=${store.getters.getUserAccount}&friendAccount=${payload.friendAccount}`).then(res => {
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
	}
}

//计算属性
var getters = {
	getUserAccount(state) {
		return state.userInfo.user.userAccount
	}
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

export default store;



