<script>
	import ENVIRONMENT_CONFIG from '@/common/imConfig.js'

	// #ifdef APP-PLUS
	import {
		initiLocalDB,
		getRawMsg
	} from '@/common/imHelper.js'
	// #endif
	
	
	
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	
	
	import {
		formatTimeStamp
	} from '@/common/index.js'
	
	
	export default {
		globalData: {
			nim: null,
			socketTask: null,
			newRemindVibrate: null, //新提醒震动
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'rawMessageList', 'groupMemberList', 'groupMemberMap'])
		},
		watch: {
			hasLogin(newV, oldV) { //监听登录状态
				if(newV) {
					console.log('监听登录状态:', newV)
					this.setLogin(this.userInfo)
					//获取用户详细信息
					this.doGetMyUserInfo()
					
					//获取好友列表
					this.getFriendList()
					// #ifdef APP-PLUS
					//初始化数据库操作
					this.initiLocalData(this.userInfo.user.userAccount)
					// #endif
					
					// uni.switchTab({
					// 	url: '/pages/index/index'
					// })
				}else {
					// uni.reLaunch({
					// 	url: '/components/content/login/login'
					// })
					this.logout()
				}
			}
		},
		methods: {
			...mapMutations(['setLogin', 'logout', 'setRawMessageList', 'appHideSetData']),
			...mapActions(['doGetMyUserInfo', 'getFriendList']),


			loginStatus() {
				const userInfo = uni.getStorageSync('userInfo')
				console.log('app>userInfo:', userInfo)
				if (userInfo && userInfo.token.length > 0) {
					console.log('已登录')
					this.setLogin(userInfo)
					
					
				} else {
					console.log('未登录')
				}
			},

			//监听网络状态变化
			onNetworkStatusChange() {
				uni.onNetworkStatusChange(res => {
					console.log('监听网络状态变化:', res)
					uni.showToast({
						title: `网络类型:${res.networkType}-${res.isConnected}`,
						icon: 'none'
					})
				})
			},
			myTimeoutTest() {
				
			},
			
			myCycleTime(timeStamp) {
				setInterval(() => {
					let date = new Date()
					console.log('getDate()', date.getTime())
				}, 10000)
			},
			
			
			
			// #ifdef APP-PLUS
			//初始化本地数据
			initiLocalData(account) {
				if(initiLocalDB(account)){
					//获取的原始消息数据
					getRawMsg(account, 'p2p-1579139382461')
				}
			},
			toReminded() {
				uni.navigateTo({
					url: '/components/content/remind/Reminded'
				})
			},
			
			//判断当前运行平台
			judgePlatform(){  
			    switch ( plus.os.name ) {  
			        case "Android":  
						console.log('Android')
						// Android平台: plus.android.*  
						let main = plus.android.runtimeMainActivity();
						//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
						plus.runtime.quit = function(){  
							main.moveTaskToBack(false);  
						};  
						//重写toast方法如果内容为 ‘再按一次退出应用’ 就隐藏应用，其他正常toast  
						plus.nativeUI.toast = (function(str){  
							if(str == '再按一次退出应用'){  
								main.moveTaskToBack(false);
								console.log('隐藏到后台1')
								return false;  
							}else{  
								console.log('隐藏到后台2')
								uni.showToast({  
									title:str,  
									icon:'none',  
								})  
							}  
						});
			        break;  
			        case "iOS":  
			        // iOS平台: plus.ios.*  
			        break;  
			        default:  
			        // 其它平台  
			        break;  
			    }  
			}
			// #endif
			
		},
		onLaunch: function() {
			console.log('App Launch')
			console.log('this.globalData', this.globalData)
			//再次进入应用时判断是否登录
			this.loginStatus()
			this.onNetworkStatusChange()
			
			// {
			// 	id: 1,
			// 	remindContent: '主任务A',
			// 	remindTime: '1590980220000',
			// 	remindPerson: ['1590980220000'],
			// 	remindLocation: '天河区',
			// 	subtaskList: [
			// 		{
			// 			id: 2
			// 		},
			// 		{
			// 			id: 3
			// 		}
			// 	]
			// }
			
			
			
			//#ifdef APP-PLUS
			this.judgePlatform()
			plus.push.addEventListener('click', function(msg) {
				console.log('新的推送通知:', msg)
				uni.switchTab({
					url: '/pages/index/index',
					success: res => {
						uni.navigateTo({
							url: '/components/content/remind/Reminded',
							success: res => {
								plus.nativeUI.alert(msg.content, function() {
									console.log('点击后显示的UI')
								}, msg.title, '收到')
							}
						})
					}
				})
			}, false)
			
			//监听tabbar中间按钮点击事件
			uni.onTabBarMidButtonTap(() => {
				this.toReminded()
			})
			
			//#endif
		},
		onShow: function() {
			console.log('getApp():', getApp())
			console.log('App Show')
			//监听修改好友信息，并更新数据
			uni.$on('updateFriendList', data => {
				this.getFriendList()
			})

			setTimeout(() => {
				console.log('groupMemberList:', this.groupMemberList)
				console.log('groupMemberMap', this.groupMemberMap)
			}, 2000)
		},
		onHide: function() {
			console.log('App Hide')
			this.appHideSetData()
		},
		// 捕获 app error
		onError(e) {
			console.log('error:', e)
		}
	}
</script>

<style lang="scss">
	/* ---------------- 这里写除了NVUE的样式  ------------------  */
	/* #ifndef APP-PLUS-NVUE */

	//引入字体图标
	@import './static/iconfont/iconfont.css';


	//常规动画,淡入显示
	@keyframes fadeIn {
		0% {
			opacity: 0;
			/* 初始状态  透明度为0 */
			transform: scale(0.0);
			
		}

		100% {
			opacity: 1;
			/* 结尾状态 透明度为1 */
			transform: scale(1.0);
		}
	}

	//淡出隐藏
	@keyframes fadeOut {
		0% {
			opacity: 1;
			transform: scale(1.0);
		}

		100% {
			opacity: 0;
			transform: scale(0.0);
		}
	}


	//淡入出现效果
	.effect-in {
		-webkit-animation-name: fadeIn;
		/*动画名称*/
		-webkit-animation-duration: .5s;
		/*动画持续时间*/
		-webkit-animation-iteration-count: 1;
		/*动画次数*/
		-webkit-animation-delay: -.3s;
		/*延迟时间*/
	}

	//淡出隐藏效果
	.effect-hide {
		-webkit-animation-name: fadeOut;
		/*动画名称*/
		-webkit-animation-duration: .5s;
		/*动画持续时间*/
		-webkit-animation-iteration-count: 1;
		/*动画次数*/
		-webkit-animation-delay: -.3s;
		/*延迟时间*/
	}
	
	@keyframes expandDown {
		0% {
			transform: scale(1,0);
		}
		100% {
			transform: scale(1,1);
		}
	}
	
	@keyframes zoomUp {
		0% {
			transform: scale(1,1);
		}
		100% {
			transform: scale(1,0);
		}
	}
	.expandDown {
		-webkit-animation-name: expandDown;
		/*动画名称*/
		-webkit-animation-duration: 1s;
		/*动画持续时间*/
		-webkit-animation-iteration-count: 1;
		/*动画次数*/
		-webkit-animation-delay: 0s;
		/*延迟时间*/
		max-height: 100%;
	}
	
	.zoomUp {
		-webkit-animation-name: zoomUp;
		/*动画名称*/
		-webkit-animation-duration: 1s;
		/*动画持续时间*/
		-webkit-animation-iteration-count: 1;
		/*动画次数*/
		-webkit-animation-delay: .3s;
		/*延迟时间*/
		max-height: 0;
		overflow: auto;
	}
	/*  弹性布局   */
	//水平与垂直居中
	.def-center-box {
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
	}

	//背景颜色
	.set-bgc {
		background-color: #F7F7F7;
	}

	//点击态样式
	.tap-hover-color {
		// background-color: $uni-bg-color-hover !important;
		background-color: #f3f3f3 !important;
	}
	
	//默认类型标题
	.def-type-title {
		width: 100%;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		color: #666;
		background-color: #F7F7F7;
	}
	//清除input按钮
	.del-icon {
		position: absolute;
		display: flex;
		align-items: center;
		width: 50rpx;
		height: 50rpx;
		z-index: 10;
		right: 20rpx;
		top: 50%;
		color: $uni-text-color-grey;
		margin-top: -25rpx;
		font-size: 36rpx;
		opacity: .5;
	}

	//按钮
	.def-button {
		margin-top: 50rpx;
		font-size: $uni-font-size-lg;
	}
	

	//水平垂直居中
	.center-box {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	//默认灰色字体
	.def-font2 {
		font-size: 36rpx;
		color: #989898;
	}

	//默认base字体尺寸
	.def-font-base {
		font-size: $uni-font-size-base;
	}

	//默认lg字体尺寸
	.def-font-lg {
		font-size: $uni-font-size-lg;
	}

	//点击态时字体变色
	.cliFontColor:active {
		color: #4CD964;
	}

	//默认用户名字:颜色、大小
	.def-username {
		font-size: $uni-font-size-base;
		font-weight: bold;
		color: #536C99;
	}
	//默认上边框
	.def-top-border {
		position: relative;

		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			height: 1rpx;
			width: 100%;
			background-color: rgba(0, 0, 0, .03);
		}
	}

	//默认下边框
	.def-bottom-border {
		position: relative;

		&:after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			height: 1rpx;
			width: 100%;
			background-color: rgba(0, 0, 0, .03);
		}
	}

	//字体文件设置类名
	.my-iconfont {
		font-family: 'iconfont';
	}



	.def-popup {
	
		/*遮罩*/
		.def-popup-mask {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 100;
	
			/*列表*/
			.def-popup-list {
				position: fixed;
				z-index: 101;
				max-width: 500rpx;
				color: #333;
				text-align: left;
				font-size: $uni-font-size-lg;
				box-sizing: border-box;
				background-color: #FFFFFF;
				box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.5);
				line-height: 80rpx;
	
				.def-popup-item {
					padding: 0 40rpx 0 30rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	
	}

	/***       以下是   登录与注册  公共样式  ****/
	/***       涉及表单等  					****/



	.center-content {
		display: flex;
		align-items: center;
		height: 100%;
		width: 80%;
		margin: 0 auto;
	}

	.login-content {
		width: 100%;

		.login-more {
			text-align: center;
			margin: 20rpx 0;

			.login-more-left {
				color: #009900;
				font-size: $uni-font-size-lg;
			}

			.login-more-right {
				color: #00cc00;
				font-size: $uni-font-size-lg;
				margin-left: 20rpx;
			}
		}

		.login-other {
			display: flex;
			align-items: center;
			text-align: center;
			justify-content: center;
			margin: 20rpx 0;

			.login-other-img {
				image {
					display: flex;
					align-items: center;
					width: 50rpx;
					height: 50rpx;
				}
			}

			.login-other-title {
				margin-left: 12rpx;
				font-size: $uni-font-size-base;
			}
		}
	}


	//输入框
	.my-input {
		position: relative;

		.def-input {
			font-size: $uni-font-size-lg;
			border-bottom: 1rpx solid rgba(100, 100, 100, .3);
			padding: 20rpx;
		}

		.def-input-del {

			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80rpx;
			position: absolute;
			right: 0rpx;
			top: 10rpx;
			z-index: 9;
			
			.def-input-del-icon {
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
			}
		}

	}

	.register1,
	.register2 .login,
	.changepwd1,
	.changepwd2 {
		height: 100vh;
		margin: 0 auto;
	}

	.login-head {
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
		color: #333366;
	}

	.login-form {
		font-size: $uni-font-size-lg;

		.input-and-code {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgba(100, 100, 100, .3);

			.left-input {
				flex: 1;
				padding: 20rpx;
			}

			.right-btn {
				width: auto;
				font-size: $uni-font-size-lg;
				// padding: 15rpx 50rpx;
				// line-height: 36rpx;
				
				color: #007AFF;
			}
			.right-btn-disabled {
				color: $uni-text-color-disable;
			}
		}
		
		.submit-btn {
			margin-top: 50rpx;
			text-align: center;
			font-size: $uni-font-size-lg;
			color: #fff;
		}
	}


	/***********   登录注册 以上为止		************/













	//中划线
	.dividing-line {
		display: flex;
		font-szie: 36rpx;
		line-height: 36rpx;
		width: 85%;
		margin: 0 auto;

		.line-left,
		.line-right {
			flex: 1;
			color: rgba(0, 0, 0, 0);
		}

		.line {
			position: relative;

			.line-left-text,
			.line-right-text {
				width: 100%;
				border-bottom: 1rpx solid rgba(100, 100, 100, .3);
				position: absolute;
				top: -50%;
			}
		}

		.line-font {
			width: auto;
			margin: 0 20rpx;
		}
	}









	//默认按钮颜色
	button[type=primary] {
		background-color: #1aad19;
	}

	//默认按钮disabled后颜色
	button[disabled][type=primary] {
		background-color: #1aad19;
	}

	//优化所有图片
	image {
		will-change: transform;
	}

	//修改   index首页List与Item样式
	.indecon {
		width: 100%;

		uni-list {
			.uni-list-item__icon.data-v-bc2c2592 {
				padding: 24rpx 0;

				.uni-list-item__icon-img.data-v-bc2c2592 {
					height: 90rpx;
					width: 90rpx;
					position: relative;
				}
			}

			.uni-list-item__content.data-v-bc2c2592 {
				border-bottom: 1rpx solid rgba(144, 144, 144, .1);

				.uni-list-item__content-title.data-v-bc2c2592 {
					font-size: 35rpx;
				}

				.uni-list-item__content-note.data-v-bc2c2592 {
					margin-top: 4rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 80%;
				}
			}

		}
	}


	//修改  内置组件list-item的全局样式
	.uni-list.data-v-8ed9886a {
		.uni-list-item__container.data-v-bc2c2592 {
			border-top-width: 0;
			padding: 0;

			//左图片item
			.uni-list-item__icon.data-v-bc2c2592 {
				.uni-list-item__icon-img.data-v-bc2c2592 {
					display: flex;
					align-items: center;
					border-radius: 8rpx;
				}
			}

			//标题item
			.uni-list-item__content.data-v-bc2c2592 {
				padding: 24rpx 0;
			}

			.uni-list-item__extra.data-v-bc2c2592 {
				margin-right: 20rpx;
			}
		}
	}

	//无navbar时，顶部状态栏占位块
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}


	/* #endif*/
</style>
