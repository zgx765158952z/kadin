<template>
	<view class="index">
		
		<!-- #ifdef MP-WEIXIN -->
		<button @tap="sendMsg" type="default" size="mini">发消息</button>
		<button @tap="toReminded" type="default" size="mini">提醒</button>
		<button @tap="handleShowMask" type="default" size="mini">菜单</button>
		<button @tap="handleSendSocket" type="default" size="mini">socket发送消息</button>
		
		<!-- #endif -->
		<button @tap="toInteraction" type="default" size="mini">互动页面</button>
		<index-content ref="indexcontent"></index-content>
		<!-- 菜单 -->
		<def-mask class="index-def-mask" ref="indexMask">
			<view class="edit-list" slot="popup-list">
				<view class="edit-list-horn">
				</view>
				<view class="edit-list-item edit-list-item-start" @click="toAddfriend">
					<image class="edit-list-item-img" src="/static/image/home/addFriend.png" mode=""></image>
					<view class="edit-list-item-text">添加好友</view>
				</view>
				<view @tap="toChooseFriend" class="edit-list-item">
					<image class="edit-list-item-img" src="/static/image/home/addGroup.png" mode=""></image>
					<text class="edit-list-item-text">发起群聊</text>
				</view>
				<view class="edit-list-item">
					<image class="edit-list-item-img" src="/static/image/home/sweepCode.png" mode=""></image>
					<text class="edit-list-item-text">扫一扫</text>
				</view>
				<view class="edit-list-item edit-list-item-last">
					<image class="edit-list-item-img" src="/static/image/home/mail.png" mode=""></image>
					<text class="edit-list-item-text">帮助与反馈</text>
				</view>
				
			</view>
		</def-mask>
		
		

	</view>
</template>

<script>
	import IndexContent from './indexCpns/IndexContent'
	//遮罩层
	import DefMask from '@/components/content/defmask/DefMask.vue'
	
	import { mapState, mapMutations, mapActions } from 'vuex'
	import { getAccountImTokenRequest } from '@/network/login.js'
	import IMController from '@/controller/im.js'
	import { socketURL } from '@/common/socketConfig.js'
	//测试发消息
	import SDK from '@/js_sdk/NIM_Weixin_SDK_v7.3.0/NIM_Web_SDK_weixin_v7.3.0.js'
	import store from '@/vuex/store.js'
	
	let globalData = getApp().globalData
	export default {
		components: {
			IndexContent,
			DefMask
		},
		data() {
			return {
				nim: null,
				count: 1,
				title: 'Hello',
				imToken: '',
				toToken: '',
				receiveMsg: ''
			}
		},
		computed: {
			...mapState(['userInfo', 'rawMessageList'])
		},
		watch: {
		},
		methods: {
			...mapMutations(['appStartGetData']),
			...mapActions(['updateNewest']),
			//测试发消息
			sendMsg() {
				this.nim.sendText({
					scene: 'p2p',
					to: '1576463907795',
					text: `我是AAAAAA---消息${this.count}`,
					done: res => {
						this.count ++
					}
				})
			},
			
			toInteraction() {
				uni.navigateTo({
					url: '/components/content/interaction/Interaction'
				})
			},
			
			//webSocket连接
			connectSocket(account) {
				let url = socketURL + account
				
				globalData.socketTask = uni.connectSocket({
					url,
					complete: res => {
						console.log('socket连接回调', res)
					}
				})
				
			},
			
			onSocketOpen() {
				globalData.socketTask.onOpen(res => {
					console.log('监听socket打开', res)
				})
			},
			onSocketMessage() {
				globalData.socketTask.onMessage(res => {
					console.log('接收到服务器的socket消息:', res)
					let str = res.data
					this.updateNewest(str)
				})
			},
			handleSendSocket() {
				globalData.socketTask.send({
					data: `我是${this.userInfo.user.userAccount}`,
					success: res => {
						console.log('socket发送消息成功:', res)
					}
				})
			},
			onSocketError() {
				globalData.socketTask.onError(err => {
					console.log('监听socket错误:', err)
				})
			},
			//显示与隐藏遮罩层
			handleShowMask() {
				// this.$refs.indexMask.isShowMask = !this.$refs.indexMask.isShowMask
				if(this.$refs.indexMask.isShowMask) {
					this.$refs.indexMask.tapHideMask()
				}else {
					this.$refs.indexMask.tapShowMask()
				}
			},
			
			toReminded() {
				uni.navigateTo({
					url: '/components/content/remind/Reminded'
				})
			},
			toAddfriend() {
				uni.navigateTo({
					url: "/components/content/addfriend/AddFriend"
				})
			},
			
			//获取当前帐户的IM的token
			getAccountImToken(accid) {
				getAccountImTokenRequest(`?accid=${accid}`).then(res => {
					
					if(res.status === 200) {
						if(res.data.code === 2000) {
							console.log('返回我的的token：', res.data.data)
							new IMController({
								token: res.data.data,
								account: accid
							})
						}
					}
				}).catch(err => {
					console.log('错误信息：',err)
				})
			},
			
			//发起群聊
			toChooseFriend() {
				uni.navigateTo({
					url: '/components/content/chooseFriend/ChooseFriend?type=createGroup'
				})
			},
			
		},
		//页面加载
		onLoad() {
			console.log('userInfo', this.userInfo.user.userAccount)
			this.appStartGetData(this.userInfo.user.userAccount)
			console.log('rawMessageList index', this.rawMessageList)
			this.getAccountImToken(this.userInfo.user.userAccount)
			getAccountImTokenRequest('?accid=1576463946323').then(res => {
				
				if(res.status === 200) {
					if(res.data.code === 2000) {
						console.log('返回我的的token2：', res.data.data)
						this.nim = SDK.NIM.getInstance({
							// 初始化SDK
							debug: false,
							appKey: 'a59ba9fafb323c6fcc49a5cbf48d369a',
							token: res.data.data,
							account: 1576463946323,
							promise: true,
							transports: ['websocket'],
							onconnect: this.test,
							onwillreconnect: this.test,
							ondisconnect: this.test,
							onerror: this.test
						})
					}
				}
			}).catch(err => {
				console.log('错误信息：',err)
			})
			
			//webSocket连接
			this.connectSocket(this.userInfo.user.userAccount)
			this.onSocketOpen()
			this.onSocketError()
			setTimeout(() => {
				this.onSocketMessage()
			}, 80)
			
			
		},
		onShow() {
			// uni.setTabBarBadge({
			// 	index: 1,
			// 	text: "1",
			// })
			// uni.showTabBarRedDot({
			// 	index: 1
			// })
		},
		//页面卸载
		onUnload() {
			console.log('onUnload')
			//隐藏遮罩层
			this.$refs.indexMask.tapHideMask()
			//隐藏弹窗
			this.$refs.indexcontent.hidePop()
		},
		//页面隐藏
		onHide() {
			console.log('onHide')
			//隐藏遮罩层
			this.$refs.indexMask.tapHideMask()
			//隐藏弹窗
			this.$refs.indexcontent.hidePop()
		},
		onNavigationBarButtonTap(options) {
			//隐藏弹窗
			this.$refs.indexcontent.hidePop()
			if(options.index === 0) {
				this.handleShowMask()
			}
		}
		
	}
</script>

<style lang="scss">
	.index {
		.edit-list {
			
			//小尖角
			.edit-list-horn {
				position: absolute;
				top: -10rpx;
				right: 30rpx;
				width: 40rpx;
				height: 40rpx;
				background-color: #444444;
				z-index: 1;
				transform: rotate(45deg);
			}
			.edit-list-item {
				position: relative;
				z-index: 100;
				display: flex;
				align-items:center;
				padding: 35rpx 40rpx;
				background-color: #444444;
				border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
				.edit-list-item-img {
					height: 50rpx;
					width: 50rpx;
				}
				.edit-list-item-text {
					// padding: 30rpx 30rpx 30rpx 0;
					margin-left: 24rpx;
					font-size: 30rpx;
					color: #FFFFFF;
				}
				
			}
			.edit-list-item:active {
				background-color: #333333;
			}
			.edit-list-item-start {
				border-top-left-radius: 12rpx;
				border-top-right-radius: 12rpx;
			}
			.edit-list-item-last {
				border-bottom-left-radius: 12rpx;
				border-bottom-right-radius: 12rpx;
			}
		}
	}
</style>
