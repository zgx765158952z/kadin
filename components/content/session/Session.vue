<template>
	<view class="session">
		<view class="session-content" @touchstart="hideAll" :style="showTool?contentStyle2:contentStyle1">
			<view class="msg-list">
				<view class="msg-list-time">
					<text class="time-text">今天 18:33</text>
				</view>
				<view class="msg-list-time">
					<text class="withdraw-text">你撤回了一条消息</text>
				</view>
				<view class="msg-item">
					<view class="friend-item">
						<image @tap="toGroupInfo" class="friend-item-img msg-item-img" src="/static/image/test/test.jpg" mode="aspectFill"></image>
						
						<view class="friend-item-msg item-msg">
							
							<view hover-class="tap-hover-color" class="friend-name">
								徐培文
							</view>
							<view class="friend-msg msg">
								Hello world!Hello云信开发者。我是你在云信Demo上的第一个好友。如果还没添加其他好友进行消息收发测试，那就发给我试试吧
								<view class="friend-horn"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="msg-list">
				<view class="msg-list-time">
					<text class="time-text">今天 18:26</text>
				</view>
				<view class="msg-item">
					<view class="my-item">
						<view class="my-item-msg item-msg">
							<view class="my-msg msg">
								Hello world!Hello云信开发者。我是你在云信Demo上的第一个好友。如果还没添加其他好友进行消息收发测试，那就发给我试试吧
								<view class="my-horn"></view>
							</view>
							
						</view>
						<image @tap="toChatFriendSetting" class="my-item-img msg-item-img" src="/static/image/global/boyHeadImg.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			
			<view class="msg-list">
				<view class="msg-list-time">
					<text class="time-text">今天 17:55</text>
				</view>
				<view class="msg-item">
					<view class="my-item">
						<view class="my-item-msg item-msg">
							<view class="my-msg msg">
								Hello world!Hello云信开发者。我是你在云信Demo上的第一个好友。如果还没添加其他好友进行消息收发测试，那就发给我试试吧
								<view class="my-horn"></view>
							</view>
							
						</view>
						<image class="my-item-img msg-item-img" src="/static/image/global/boyHeadImg.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			
			<view class="msg-list">
				<view class="msg-list-time">
					<text class="time-text">今天 17:04</text>
				</view>
				<view class="msg-item">
					<view class="friend-item">
						<image class="friend-item-img msg-item-img" src="/static/image/global/boyHeadImg.png" mode="aspectFill"></image>
						<view class="friend-item-msg item-msg">
							
							<view hover-class="tap-hover-color" class="friend-name">
								徐培文
							</view>
							<view class="friend-msg msg">
								Hello world!Hello云信开发者。我是你在云信Demo上的第一个好友。如果还没添加其他好友进行消息收发测试，那就发给我试试吧
								<view class="friend-horn"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		
		<view class="session-btm">
			<!-- 输入框 -->
			<view class="session-first">
				<view @tap="doSpeak" v-if="showKeyboard" hover-class="tap-hover-color" class="my-iconfont voice-icon">&#xe62e;</view>
				<view @tap="doInput" v-if="!showKeyboard" class="my-iconfont keyboard-icon">&#xe7db;</view>
				<textarea v-model="msgContent" @tap="updateFocus" @input="handleInput" :adjust-position="adjust" @focus="handleFocus" :fixed="true" :focus="isFocus" v-if="showKeyboard" auto-height />
				<view @touchstart="showSpeaking" @touchmove="moveHandle" :class="isSpeak?'speaking-class': ''" @touchend="hideSpeaking" v-if="!showKeyboard" class="voice-title">
					{{ speakingTitle }}
				</view>
				<view class="my-iconfont smiling-icon">&#xe611;</view>
				<view v-if="msgContent === ''" @tap="handleTool" class="my-iconfont add-icon">&#xe691;</view>
				<view v-if="msgContent" class="send-btn">发送</view>
			</view>
			
			
			<!-- 工具栏 -->
			<view v-if="showTool" class="session-tool">
				<view class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon0">
						<text class="my-iconfont">&#xe60d;</text>
					</view>
					<view class="tool-item-title">图片</view>
				</view>
				<view class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon1">
						<text class="my-iconfont">&#xe66c;</text>
					</view>
					<view class="tool-item-title">拍摄</view>
				</view>
				<view class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon2">
						<text class="my-iconfont">&#xe688;</text>
					</view>
					<view class="tool-item-title">位置</view>
				</view>
				<view class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon3">
						<text class="my-iconfont">&#xe62e;</text>
					</view>
					<view class="tool-item-title">语音通话</view>
				</view>
				<view class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon4">
						<text class="my-iconfont">&#xe66b;</text>
					</view>
					<view class="tool-item-title">视频通话</view>
				</view>
				<view class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon5">
						<text class="my-iconfont">&#xe60f;</text>
					</view>
					<view class="tool-item-title">文件</view>
				</view>
				<view class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon6">
						<text class="my-iconfont">&#xe614;</text>
					</view>
					<view class="tool-item-title">红包</view>
				</view>
			</view>
			
			
		</view>
		
		<def-mask ref="speakMask">
			<view slot="popup-list" class="speaking-list" :class="{'speaking-list-bgc': showCancel}">
				<!-- <view class="popup-item">
					<view class="speaking-item">
						<view class="speaking-item-time">
							00:12
						</view>
						<view class="speaking-select">
							上滑取消或转文字
						</view>
						
					</view>
				</view> -->
				<view class="speaking-item">
					<view class="speaking-item-time">
						{{ calcSpeakCount }}
					</view>
					<view class="speaking-select">
						上滑取消或转文字
					</view>
					
				</view>
				
				<view v-if="showCancel" class="cancel-and-translate">
					<view @touchmove="handleCancel" class="cancel-item" :class="{'cancel-item-active': cancelActive}">
						<view>
							<view class="cancel-item-icon my-iconfont">&#xe657;</view>
							<view class="cancel-item-title">
								取消
							</view>
						</view>
					</view>
					
					<view @touchstart="handleTranslate" class="translate-item" :class="{'translate-item-active': translateActive}">
						<view>
							<view class="translate-item-icon my-iconfont">&#xe652;</view>
							<view class="translate-item-title">
								转文字
							</view>
						</view>
					</view>
					
				</view>
				
				
			</view>
		</def-mask>
		
		
		
	</view>
</template>

<script>
	import DefMask from '@/components/content/defmask/DefMask.vue'
	
	export default {
		components: {
			DefMask
		},
		data() {
			return {
				/* 常规模块 */
				
				//输入栏文字
				msgContent: '',
				
				//无工具栏的底部高度
				btmHeight1: 0,
				
				//有工具栏的底部高度
				btmHeight2: 0,
				
				
				//session-content无工具栏时的定位样式
				contentStyle1: '',
				
				//session-content有工具栏时的定位样式
				contentStyle2: '',
				
				//显示键盘
				showKeyboard: true,
				
				//是否聚焦输入框
				isFocus: false,
				
				//显示工具栏
				showTool: false,
				
				//键盘弹起时是否上推页面
				adjust: true,
				
				
				
				/** 语音输入模块 **/
				
				//语音计时器
				speakTimer: null,
				
				//语音计时
				speakCount: 0,
				
				//说话模式
				isSpeak: false,
				
				speakingTitle: '按住 说话',
				
				//说话时上滑到一定位置显示取消按钮
				showCancel: false,
				
				//触摸到取消按钮时
				cancelActive: false,
				
				//触摸到转文字按钮时
				translateActive: false,
				
				//存储取消与转文字按钮节点坐标信息
				cancelInfo: {
					'left1': 0,
					'right1': 0,
					'left2': 0,
					'right2': 0,
					'top': 0,
					'bottom': 0
				}
			}
		},
		
		
		computed: {
			calcSpeakCount() {
				if(this.speakCount<10) {
					return `0${this.speakCount}`
				}else {
					return this.speakCount
				}
			}
		},
		watch: {
			//监听工具栏的显示与隐藏，从而重新获取底部高度让content重新定位
			// showTool(newV, oldV) {
			// 	console.log(newV, oldV)
			// 	if(newV !== oldV) {
			// 		this.$nextTick(() => {
			// 			this.getBtmHeight()
			// 		})
			// 	}
			// }
			
		},
		methods: {
			
			//监听按住说话手指移动
			moveHandle(e) {
				if(e.touches[0].clientY < 540) {
					
					console.log(e)
					this.showCancel = true
					
					
				}else {
					this.showCancel = false
				}
				if(this.showCancel) {
					if(this.cancelInfo.right2 === 0) {
						this.$nextTick(() => {
							const query = uni.createSelectorQuery().in(this)
							query.select('.cancel-item').boundingClientRect(data => {
								
								this.cancelInfo.left1 = data.left
								this.cancelInfo.right1 = data.right
								this.cancelInfo.top = data.top
								this.cancelInfo.bottom = data.bottom
								console.log(this.cancelInfo)
							}).exec()
							
							query.select('.translate-item').boundingClientRect(data => {
								
								this.cancelInfo.left2 = data.left
								this.cancelInfo.right2 = data.right
								console.log(this.cancelInfo)
								return
							}).exec()
						})
					}else {
						if(e.touches[0].clientY>this.cancelInfo.top && e.touches[0].clientY<this.cancelInfo.bottom) {
							if(e.touches[0].clientX>this.cancelInfo.left1 && e.touches[0].clientX<this.cancelInfo.right1) {
								this.$nextTick(() => {
									this.cancelActive = true
								})
							}else if(e.touches[0].clientX>this.cancelInfo.left2 && e.touches[0].clientX<this.cancelInfo.right2) {
								this.$nextTick(() => {
									this.translateActive = true
								})
							}else {
								this.$nextTick(() => {
									this.cancelActive = false
									this.translateActive = false
								})
							}
						}else {
							this.$nextTick(() => {
								this.cancelActive = false
								this.translateActive = false
							})
						}
						
					}
				}
				
				
				
				
			},
			//按住说话
			showSpeaking() {
				this.isSpeak = true
				this.speakingTitle = '松开 结束'
				this.$refs.speakMask.isShowMask = true
				this.speakTimer = setInterval(() => {
					this.speakCount += 1
				}, 1000)
				this.speakTimer
			},
			
			//松开结束说话
			hideSpeaking() {
				if(this.cancelActive) {
					console.log('取消语音')
				}else if(this.translateActive) {
					console.log('将语音转成文字')
				}else {
					console.log('发送语音')
				}
				
				
				this.isSpeak = false
				this.speakingTitle = '按住 说话'
				this.showCancel = false
				this.cancelActive = false
				this.translateActive = false
				clearInterval(this.speakTimer)
				this.speakCount = 0
				this.$refs.speakMask.isShowMask = false
			},
			
			//取消
			handleCancel(e) {
				console.log('取消')
				console.log(e)
			},
			
			//转文字
			handleTranslate(e) {
				console.log('转文字')
				console.log(e)
			},
			
			//改变为说话模式
			doSpeak() {
				this.$nextTick(() => {
					this.showKeyboard = false
					this.isFocus = false
				})
			},
			
			//改变为输入模式
			doInput() {
				this.$nextTick(() => {
					this.showKeyboard = true
					this.isFocus = true
				})
			},
			
			//监听输入
			handleInput(e) {
				console.log(e)
			},
			
			//解决 当工具栏出现时，点击输入框聚焦页面不上推问题
			updateFocus() {
				if(this.showTool) {
					this.showTool = false
				}
				setTimeout(() => {
					this.$nextTick(() => {
						this.isFocus = false
						this.adjust = false
						setTimeout(() => {
							this.isFocus = true
							this.adjust = true
						}, 80)
					})
				}, 80)
			},
			
			//聚焦时触发
			handleFocus() {
				
			},
			
			//触摸页面隐藏键盘和工具栏和表情等
			hideAll() {
				if(this.showTool) {
					this.$nextTick(function(){
						setTimeout(() => {
							this.showTool = false
						}, 200)
					})
				}
				if(this.isFocus) {
					this.$nextTick(function(){
						setTimeout(() => {
							this.isFocus = false
						}, 200)
					})
				}
			},
			//工具栏的显示
			handleTool() {
				
				this.showTool = !this.showTool
				
				setTimeout(() => {
					//只获取一次工具栏高度
					if(this.btmHeight2 === 0) {
						const query = uni.createSelectorQuery().in(this)
						query.select('.session-btm').boundingClientRect(data => {
							const h = data.height
							
							//#ifdef APP-PLUS
							this.contentStyle2 = `top: 0; right: 0; bottom: ${h}px; left: 0; `
							//#endif
							
							//#ifdef MP-WEIXIN
							this.contentStyle2 = `top: 0; right: 0; bottom: ${h}rpx; left: 0; `
							//#endif
							this.btmHeight2 = h
						}).exec()
					}
				}, 80)
				
			},
			
			//获取底部无工具栏时的高度,改变content定位
			getBtmHeight() {
				const query = uni.createSelectorQuery().in(this)
				query.select('.session-btm').boundingClientRect(data => {
					const h = data.height
					//#ifdef APP-PLUS
					this.contentStyle1 = `top: 0; right: 0; bottom: ${h}px; left: 0; `
					//#endif
					
					//#ifdef MP-WEIXIN
					this.contentStyle1 = `top: 0; right: 0; bottom: ${h}rpx; left: 0; `
					//#endif
					
					console.log(h)
				}).exec()
			},
			
			//跳转到GroupInfo
			toGroupInfo() {
				uni.navigateTo({
					url: '/components/content/session/sessionSon/GroupInfo'
				})
			},
			
			//跳转到ChatFriendSetting
			toChatFriendSetting() {
				uni.navigateTo({
					url: '/components/content/session/sessionSon/ChatFriendSetting'
				})
			}
		},
		onLoad(option) {
			if(option.name) {
				uni.setNavigationBarTitle({
					title: `${option.name}(离线)`
				})
			}
			
		},
		mounted() {
			
			this.getBtmHeight()
		},
		
		onBackPress() {
			if(this.showTool) {
				this.showTool = false
				return true
				// if(e.from === 'navigateBack') {
				// 	//返回
				// 	return false
				// }
				// if(e.from === 'backbutton') {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '您确定退出当前编辑？',
				// 		success(res) {
				// 			if(res.confirm) {
				// 				uni.navigateBack()
				// 			}else if(res.cancel){
				// 				//表示禁止默认返回
				// 				return true
				// 			}
				// 		},
				// 		fail(err) {
				// 			console.log(err)
				// 			return true
				// 		}
				// 	})
				// }
			}else {
				return false
			}
		},
		onPageScroll(e) {
			console.log(e)
			
			return
			if(this.isFocus) {
				this.$nextTick(() => {
					this.isFocus = false
				})
			}
			//页面滚动时隐藏键盘和工具栏
			if(this.showTool) {
				this.$nextTick(() => {
					this.showTool = false
				})
			}
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				this.toGroupInfo()
			}
		},
		onHide() {
			clearInterval(this.speakTimer)
		}
	}
</script>

<style lang="scss">
	
	.cancel-item-active {
		background-color: #FA5251 !important;
		color: #FFFFFF !important;
	}
	
	.translate-item-active {
		background-color: #07C160 !important;
		color: #FFFFFF !important;
	}
	
	
	.speaking-list {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 101;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		
		.speaking-item {
			padding: 30rpx;
			background-color: #383838;
			color: #FFFFFF;
			border-radius: 20rpx;
			width: 40%;
			margin: 50rpx auto;
			margin-bottom: 250rpx;
			.speaking-item-time {
				text-align: center;
				padding: 50rpx 40rpx;
				font-size: 60rpx;
			}
			.speaking-select {
				font-size: $uni-font-size-base;
				text-align: center;
			}
			
		}
		
		
		
		// 取消和转文字
		.cancel-and-translate {
			position: absolute;
			bottom: 300rpx;
			left: 0;
			z-index: 299;
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			.cancel-item, .translate-item {
				display:flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				width: 180rpx;
				height: 180rpx;
				background-color: #FFFFFF;
				color: $uni-text-color;
				border-radius: 100%;
				.cancel-item-icon, .translate-item-icon {
					text-align: center;
					font-size: 40rpx;
				}
				.cancel-item-title, .translate-item-title {
					font-size: $uni-font-size-base;
				}
			}
			
			.cancel-item {
			}
			.translate-item {
				
			}
		}
		
	}
	
	.speaking-list-bgc {
		background-color: #383838;
	}
	
	
	//弹性盒子
	.friend-item {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
	}
	.my-item {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		
	}
	
	.session-first {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}
	
	.session-tool {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		.tool-item {
			width: 20%;
		}
	}
	
	//让聊天列表从下往上排列
	.session-content {
		display: flex;
		flex-flow: column-reverse nowrap;
		position: absolute;
		background-color: #F7F7F7;
		overflow-y: scroll;
	}
	
	
	.session {
		position: relative;
		height: 100vh;
		.msg-list {
			padding: 30rpx;
			font-size: $uni-font-size-lg;
			box-sizing: border-box;
			.msg-list-time {
				text-align: center;
				margin: 15rpx 0;
				.time-text, .withdraw-text {
					padding: 3rpx 15rpx;
					border-radius: 24rpx;
					background-color: rgba(192, 192, 192, .5);
					color: #FFFFFF;
					font-size: $uni-font-size-base;
				}
				.time-text {
					font-weight: 900;
				}
			}
			.msg-item {
				
				.my-item, .friend-item {
					.msg-item-img {
						width: 90rpx;
						height: 90rpx;
						border-radius: 8rpx;
					}
					.friend-item-msg {
						margin-left: 30rpx;
					}
					.my-item-msg {
						margin-right: 30rpx;
					}
					.item-msg {
						max-width: 70%;
						.friend-name {
							display: inline-block;
							margin: 5rpx 0 5rpx 8rpx;
							font-size: $uni-font-size-sm;
						}
						
						.msg {
							position: relative;
							color: $uni-text-color;
							padding: 14rpx 22rpx;
							box-sizing: border-box;
							border-radius: 26rpx;
							z-inde: 1;
							//朋友发消息的气泡小尖角
							.friend-horn {
								position: absolute;
								display: inline-block;
								left: -12rpx;
								top: 20rpx;
								width: 30rpx;
								height: 30rpx;
								background-color: #FFFFFF;
								//顺时针旋转45度
								transform: rotate(45deg);
							}
							
							//自己发消息的气泡小尖角
							.my-horn {
								position: absolute;
								display: inline-block;
								right: -12rpx;
								top: 20rpx;
								width: 30rpx;
								height: 30rpx;
								background-color: #4CD964;
								//顺时针旋转45度
								transform: rotate(45deg);
							}
						}
						
						
						
						.friend-msg {
							background-color: #FFFFFF;
						}
						.my-msg {
							background-color: #4CD964;
						}
						
					}
				}
			}
		}
		
		
		
	}
	
	
	//底部输入框与工具
	.session-btm {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 85;
		background-color: #FFFFFF;
		.session-first {
			margin: 20rpx 10rpx;
			textarea, .voice-title {
				flex: 1;
				display: flex;
				padding: 15rpx 30rpx;
				margin: 0 10rpx;
				font-size: $uni-font-size-lg;
				border: 1rpx solid rgba(100, 100, 100, .1);
				border-radius: 36rpx;
				max-height: 150rpx;
			}
			.voice-title {
				justify-content: center;
			}
			
			
			.voice-icon, .smiling-icon, .add-icon, .keyboard-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 10rpx;
				border-radius: 100%;
			}
			.voice-icon {
				font-size: 50rpx;
				color: #FFFFFF;
				width: 70rpx;
				height: 70rpx;
				background-color: #007AFF;
			}
			.smiling-icon, .add-icon, .keyboard-icon {
				font-size: 70rpx;
				width: 70rpx;
				height: 70rpx;
				color: $uni-text-color-disable;
				
				&:active {
					background-color: #eee;
				}
			}
			.speaking-class {
				background-color: $uni-text-color-disable;
			}
			
			
		}
		
		
		.session-tool {
			margin: 30rpx auto;
			.tool-item {
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				justify-content: center;
				margin: 20rpx 18rpx;
				.tool-item-icon {
					padding: 23rpx 25rpx;
					box-sizing: border-box;
					border-radius: 20rpx;
					.my-iconfont {
						color: #FFFFFF;
						font-size: 60rpx;
					}
				}
				.tool-item-title {
					font-size: $uni-font-size-base;
					color: $uni-text-color;
					text-align: center;
					margin-top: 10rpx;
				}
				.tool-item-icon0 {
					background-color: #0F77FA;
				}
				.tool-item-icon1 {
					background-color: #0DC702;
				}
				
				.tool-item-icon2 {
					background-color: #24D9B0;
				}
				.tool-item-icon3 {
					background-color: #259DF4;
				}
				.tool-item-icon4 {
					background-color: #3A95FE;
				}
				.tool-item-icon5 {
					background-color: #24D9B0;
				}
				
				.tool-item-icon6 {
					background-color: #FE5A59;
				}
			}
		}
	}
</style>
