<template>
	<view class="index">
		
		
		<button @tap="handleShowMask" type="primary">菜单</button>
		
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
				<view class="edit-list-item">
					<image class="edit-list-item-img" src="/static/image/home/addGroup.png" mode=""></image>
					<text class="edit-list-item-text">添加群聊</text>
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
	
	
	//网易云IM
	import SDK from '@/js_sdk/NIM_Weixin_SDK_v7.3.0/NIM_Web_SDK_weixin_v7.3.0.js'
	
	export default {
		components: {
			IndexContent,
			DefMask
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		
		methods: {
			//显示与隐藏遮罩层
			handleShowMask() {
				this.$refs.indexMask.isShowMask = !this.$refs.indexMask.isShowMask
			},
			
			
			toAddfriend() {
				uni.navigateTo({
					url: "/components/content/addfriend/AddFriend"
				})
			},
			
			
			
			//IM相关方法
			onConnect(res) {
				console.log('连接成功')
				console.log(res)
			},
			onWillReconnect(obj) {
			    // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
			    console.log('即将重连');
			    console.log(obj.retryCount);
			    console.log(obj.duration);
			},
			onDisconnect(error) {
				// 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
				console.log('丢失连接');
				console.log(error);
				if (error) {
					switch (error.code) {
				      // 账号或者密码错误, 请跳转到登录页面并提示错误
				      case 302:
						break;
						// 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
					  case 417:
						break;
						// 被踢, 请提示错误后跳转到登录页面
				      case 'kicked':
						break;
				      default:
						break;
				    }
				}
			},
			onError(error) {
				config.log(error)
			}
		},
		//页面卸载
		onUnload() {
			console.log('onUnload')
			//隐藏遮罩层
			this.$refs.indexMask.isShowMask = false
			//隐藏弹窗
			this.$refs.indexcontent.hidePop()
		},
		//页面隐藏
		onHide() {
			console.log('onHide')
			//隐藏遮罩层
			this.$refs.indexMask.isShowMask = false
			//隐藏弹窗
			this.$refs.indexcontent.hidePop()
		},
		onNavigationBarButtonTap(options) {
			//隐藏弹窗
			this.$refs.indexcontent.hidePop()
			if(options.index === 0) {
				uni.navigateTo({
					url: "/components/content/remind/Remind"
				})
			}
			if(options.index === 1) {
				this.handleShowMask()
			}
		},
		created() {
			
			let data = {}
			//初始化
			let nim = SDK.NIM.getInstance({
				debug: true,
				appKey: 'a59ba9fafb323c6fcc49a5cbf48d369a',
				account: '1576463907795',
				token: '5814066d953e7eb41a18362c08ed53fd',
				db: false,
				onconnect: res => {
					this.onConnect(res)
				},
				onwillreconnect: res => {
					this.onWillReconnect(res)
				},
				ondisconnect: err => {
					this.onDisconnect(err)
				},
				onerror: err => {
					this.onError(err)
				}
			})
			
		}
	}
</script>

<style lang="scss">
	.index {
		.edit-list {
			position: fixed;
			top: 15rpx;
			right: 15rpx;
			z-index: 100;
			
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
