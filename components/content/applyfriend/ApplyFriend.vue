<template>
	<view class="applyfriend">
		<view class="applyfriend-head">
			申请添加好友
		</view>
		<view class="applyfriend-top">
			<view class="def-font2">
				发送添加好友申请
			</view>
			<textarea v-model="requestMsg" @confirm="applyReason" value="" class="long-input" placeholder="输入申请原因" />
		</view>
		<view class="applyfriend-middle">
			<view class="def-font2">
				设置备注(功能暂未开放)
			</view>
			<input type="text" value="" placeholder="昵称备注" />
		</view>
		<view class="applyfriend-bottom">
			<view class="def-font2">
				好友动态权限设置(功能暂未开放)
			</view>
			<view class="bottom-item1">
				<view class="left">不让他看我</view>
				<switch class="right" color="#04BE02" />
			</view>
			<view class="bottom-item2">
				<view class="left">不看他</view>
				<switch class="right" color="#04BE02" />
			</view>
		</view>
		
		<button @tap="finishedApply" type="primary">申请</button>
	</view>
</template>

<script>
	import { ApplyAddFriendRequest } from '@/network/addfriend.js'
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				friendPhone: null,
				requestMsg: '', //请求信息
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			finishedApply() {
				if(this.requestMsg === '') {
					uni.showToast({
						title: '请求信息不能为空',
						icon: 'none'
					})
					return
				}
				let obj = {
					sender: this.userInfo.user.userPhone,
					receiver: this.friendPhone,
					addType: 1,
					requestMsg: this.requestMsg
				}
				ApplyAddFriendRequest(obj).then(res => {
					if(res.status === 200) {
						console.log(res)
						if(res.data.code === 4003) {
							uni.showToast({
								title: '请求已发送',
								mask: true,
								success: () => {
									setTimeout(() => {
										uni.navigateBack()
									}, 1000)
								}
							})
						}else if(res.data.code === 2000) {
							uni.showToast({
								title: '添加好友请求发送成功',
								mask: true,
								success: () => {
									setTimeout(() => {
										uni.navigateBack()
									}, 1000)
								}
							})
							
						} else {
							uni.showToast({
								title: '请求发送失败，请稍后重试',
								icon: 'none'
							})
						}
						
					}else {
						uni.showToast({
							title: '网络连接错误',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: '添加失败,请稍后重试',
						icon: 'none'
					})
				})
			}
		},
		onLoad(option) {
			console.log(option);
			this.friendPhone = option.friendPhone;
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				//点击完成申请好友
				this.finishedApply()
			}
		}
	}
</script>

<style lang="scss">
	.applyfriend {
		width: 85%;
		margin: 0 auto;
		.applyfriend-head {
			margin: 40rpx 0;
			font-size: 45rpx;
			font-weight: bold;
			text-align: center;
		}
		
		.applyfriend-top, .applyfriend-middle {
			margin-top:50rpx;
			
			.long-input {
				height: 120rpx;
				font-size: 36rpx;
				padding: 30rpx;
				margin-top: 5rpx;
				width: 91%;
				background-color: #F8F8F8;
				// border-radius: 12rpx;
			}
			input {
				font-size: 36rpx;
				padding: 30rpx;
				margin-top: 5rpx;
				background-color: #F8F8F8;
			}
		}
		
		.applyfriend-bottom {
			margin-top:50rpx;
			.bottom-item1, .bottom-item2 {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				background-color: #F7F7F7;
			}
			.bottom-item1 {
				margin-top: 5rpx;
				border-bottom: 1rpx solid rgba(100, 100, 100, .1);
			}
		}
	}
</style>
