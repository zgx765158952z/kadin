<template>
	<view class="change-name">
		<view class="infoFm">
			<input type="text" class="infoFmInput" v-model="currentNickName" focus/>
			<view class="littleTips">
				好名字可以让你的朋友更容易记住你
			</view>
		</view>
	</view>
</template>

<script>
	import { modifyUserInfo } from '@/network/changePersonInfo.js'
	import { mapState } from 'vuex'
	
	export default {
		methods: {
			submitName(e) {
				console.log(e)
			}
		},
		data() {
			return {
				currentNickName: '',
				userAccount: ''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				if(this.currentNickName) {
					if(this.currentNickName !== this.userInfo.user.nickname) {
						modifyUserInfo(
						{
							userAccount: this.userAccount,
							modifyContent: this.currentNickName,
							modifyType: 1
						}
						).then(res => {
							if(res.status === 200) {
								if(res.data.code === 2000) {
									//修改userInfo的nickname
									this.$set(this.userInfo.user, 'nickname', this.currentNickName)
									uni.setStorageSync('userInfo', this.userInfo)
									uni.showToast({
										title: '成功保存',
										icon: 'none'
									})
									uni.navigateBack()
								}else {
									uni.showToast({
										title: '服务器睡着了',
										icon: 'none'
									})
								}
							}else {
								uni.showToast({
									title: '您可能与服务器断开连接了',
									icon: 'none'
								})
							}
							
						}).catch(err => {
							uni.showToast({
								title: '您可能与服务器断开连接了',
								icon: 'none'
							})
							console.log(err)
						})
					}else {
						uni.navigateBack()
					}
				}else {
					uni.showToast({
						title: '昵称不能为空',
						icon: 'none'
					})
				}
				
				
			}
		},
		created() {
			//将vuex的nickname与userAccount赋值给本组件的变量
			this.currentNickName  = this.userInfo.user.nickname
			this.userAccount = this.userInfo.user.userAccount
		}
	}
</script>

<style lang="scss">
	.change-name {
		background-color: #F7F7F7;
		height: 100vh;
		border-top: 1rpx solid rgba(100, 100, 100, .1);
		.infoFm {
			margin: 40rpx 30rpx 0 30rpx;
			.infoFmInput {
				font-size: 36rpx;
				padding: 15rpx;
				border-bottom: 1rpx solid rgba(100, 100, 100, .2);
			}
			.littleTips {
				color: $uni-text-color-grey;
				font-size: $uni-font-size-lg;
				padding: 15rpx;
			}
		}
	}
	
</style>
