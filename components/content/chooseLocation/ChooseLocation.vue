<template>
	<view class="choose-location">
		<view class="choose-location-head">
			<view class="choose-category-text">
				当前位置
			</view>
			
			<default-list :noBorderBtm="true" class="current-location-list" @click.native="changeUserRegion">
				<view slot="def-list-left">
					<block v-if="currentAddress.country.length > 0">
						<text class="def-list-left-text-loading">{{ currentAddress.country }}</text>
						<text class="def-list-left-text def-list-left-text-loading">{{ currentAddress.province }}</text>
						<text class="def-list-left-text def-list-left-text-loading">{{ currentAddress.city }}</text>
					</block>
					
					<text v-else class="def-list-left-text-loading">定位中...</text> 
				</view>
			</default-list>
		</view>
		
		
		<view class="choose-location-content">
			<view class="choose-category-text">
				全部地区
			</view>
			<default-list @click.native="toChooseProvince">
				<view slot="def-list-left">
					中国大陆
					<text v-if="userInfo.user.region" class="def-list-left-text">{{ userInfo.user.region }}</text>
				</view>
			</default-list>
		</view>
		
		
	</view>
</template>

<script>
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	import { mapState } from 'vuex'
	import { modifyUserInfo } from '@/network/changePersonInfo.js'
	
	export default {
		components: {
			DefaultList
		},
		data() {
			return {
				currentAddress: {},
				selectProvince: '',
				selectCity: ''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			//跳转到ChooseProvince
			toChooseProvince() {
				uni.navigateTo({
					url: '/components/content/chooseLocation/ChooseProvince'
				})
			},
			
			getLocationInfo() {
				uni.getLocation({
					geocode: true,
					success: res => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
						if(res) {
							console.log(res.address)
							this.currentAddress = res.address
						}
					},
					fail: err => {
						console.log(err)
					}
				})
			},
			changeUserRegion() {
				if(this.currentAddress) {
					console.log('this.currentAddress.length')
					const obj = {
						userAccount: this.userInfo.user.userAccount,
						modifyContent: this.currentAddress.province + this.currentAddress.city,
						modifyType: 4
					}
					modifyUserInfo(obj).then(res => {
						if(res.status === 200) {
							if(res.data.code === 2000) {
								this.$set(this.userInfo.user, 'region', obj.modifyContent)
								uni.setStorageSync('userInfo', this.userInfo)
								uni.showToast({
									title: '成功保存',
									icon: 'none'
								})
								uni.navigateBack({
									delta: 1
								})
							}else {
								uni.showToast({
									title: '程序走丢了，请稍后重试',
									icon: 'none'
								})
							}
						}else if(res.status === 404) {
							uni.showToast({
								title: '网络走丢了，请稍后重试',
								icon: 'none'
							})
						}else {
							uni.showToast({
								title: '程序走丢了，请稍后重试',
								icon: 'none'
							})
						}
						
					}).catch(err => {
						uni.showToast({
							title: '程序走丢了，请稍后重试',
							icon: 'none'
						})
						console.log(err)
					})
				}
			}
		},
		watch: {
			currentAddress(newV, oldV) {
				console.log(newV, oldV)
			}
		},
		created() {
			this.getLocationInfo()
		},
		mounted() {
			console.log(this.currentAddress)
		},
		onShow() {
			console.log('onShow')
			uni.$on('ProvinceCity', data => {
				console.log('用户选择的城市：', data);
				this.selectProvince = data.province;
				this.selectCity = data.city;
			})
		},
		onLoad() {
			console.log('onLoad')
			
		},
		onUnload() {
			uni.$off('ProvinceCity', () => {
				
			})
		}
		
	}
</script>

<style lang="scss">
	.choose-location {
		height: 100vh;
		background-color: #F7F7F7;
		.choose-location-head {
			padding-top: 20rpx;
			border-top: 1rpx solid rgba(100, 100, 100, .1);
			.current-location-list {
				
				.def-list-left-text-loading {
					color: #4CD964;
				}
			}
		}
		
		.choose-location-content {
			padding-top: 20rpx;
		}
		
		
		
		
		
		.choose-category-text {
			color: $uni-text-color-grey;
			font-size: $uni-font-size-lg;
			margin: 15rpx 30rpx;
		}
		
	}
	
	.def-list-left-text {
		margin-left: 10rpx;
	}
</style>
