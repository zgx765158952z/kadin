<template>
	<view class="signature">
		<view class="infoFm">
			<input v-model="currentSigna" maxlength="30" class="infoFmInput" placeholder="最长30个字" focus type="text"/>
		</view>
	</view>
</template>

<script>
	import { modifyUserInfo } from '@/network/changePersonInfo.js'
	import { mapState } from 'vuex'
	
	export default {
		methods: {
		},
		data() {
			return {
				currentSigna: ''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		created() {
			console.log('this.userInfo.user.signature:', this.userInfo.user.signature)
			this.currentSigna = this.userInfo.user.signature
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				if(this.currentSigna) {
					modifyUserInfo(
					{
						userAccount: this.userInfo.user.userAccount,
						modifyContent: this.currentSigna,
						modifyType: 2
					}
					).then(res => {
						if(res.status === 200) {
							if(res.data.code === 2000) {
								this.$set(this.userInfo.user, 'signature', this.currentSigna)
								uni.setStorageSync('userInfo', this.userInfo)
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
					uni.showToast({
						title: '内容不能为空',
						icon: 'none'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	
	.signature {
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
