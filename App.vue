<script>
	
	
	import { mapState, mapMutations, mapActions } from 'vuex'
	
	import { formatTimeStamp } from '@/common/index.js'
	
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['setLogin']),
			...mapActions(['doGetMyUserInfo', 'getFriendList']),
			
			loginStatus() {
				const userInfo = uni.getStorageSync('userInfo')
				console.log('app>userInfo:', userInfo)
				if(userInfo && userInfo.token.length > 0) {
					console.log('已登录')
					this.setLogin(userInfo)
					//获取好友列表
					this.getFriendList()
					// uni.switchTab({
					// 	url: '/pages/index/index'
					// })
					
				}else {
					console.log('未登录')
					// uni.reLaunch({
					// 	url: '/components/content/login/login'
					// })
				}
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			
			//再次进入应用时判断是否登录
			this.loginStatus()
			
			
		},
		onShow: function() {
			console.log('App Show')
			//监听修改好友信息，并更新数据
			uni.$on('updateFriendList', data => {
				this.getFriendList()
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	
	
	/* ---------------- 这里写除了NVUE的样式  ------------------  */
	/* #ifndef APP-PLUS-NVUE */
	
	//引入字体图标
	@import './static/iconfont/iconfont.css';
	
	
	/* css动画 淡出淡入效果 */
	.fadeInRightIn {
	    animation-name: fadeInRightIn;
	    -webkit-animation: fadeInRightIn;
	}
	
	//常规动画
	@keyframes fadeInRightIn{
		0% {
			opacity: 0; /* 初始状态  透明度为0 */
		}
		50% {
			opacity: 0.5; /* 中间状态 透明度为0.5 */
		}
		100%{
			opacity: 1; /* 结尾状态 透明度为1 */
		}
	}
	//Safari and Chrome浏览器
	@-webkit-keyframes fadeInRightIn {
		0% {
			opacity: 0; /* 初始状态  透明度为0 */
		}
		50% {
			opacity: 0.5; /* 中间状态 透明度为0.5 */
		}
		100%{
			opacity: 1; /* 结尾状态 透明度为1 */
		}
	}
	
	//淡出效果
	.effect-in {
		-webkit-animation-name: fadeInRightIn; /*动画名称*/
		-webkit-animation-duration: .5s; /*动画持续时间*/
		-webkit-animation-count: 1; /*动画次数*/
		-webkit-animation-delay: 0s; /*延迟时间*/
	}
	
	//淡入效果
	.effect-hide {
		-webkit-animation-name: fadeInRightIn; /*动画名称*/
		-webkit-animation-duration: .5s; /*动画持续时间*/
		-webkit-animation-count: 1; /*动画次数*/
		-webkit-animation-delay: 0s; /*延迟时间*/
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
	
	
	//字体文件设置类名
	.my-iconfont {
		font-family: 'iconfont';
	}
	
	
	/***       以下是   登录与注册  公共样式  ****/
	/***       涉及表单等  					****/
	
	
	
	.center-content {
		display: flex;
		align-items: center;
		height: 100%;
		width: 90%;
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
			}
		}
		
	}
	
	.register1, .register2 .login, .changepwd1, .changepwd2 {
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
				padding: 15rpx 50rpx;
				line-height: 36rpx;
			}
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
		.line-left, .line-right {
			flex: 1;
			color: rgba(0, 0, 0, 0);
		}
		
		.line {
			position: relative;
			.line-left-text, .line-right-text {
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
		uni-list{
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
