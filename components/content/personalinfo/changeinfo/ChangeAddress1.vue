<template>
	<view class="change-address1">
		<block v-if="getNestList">
			<block v-for="(item, index) in getNestList" :key="index">
				<view @tap="toChangeAddress2(index)" @longpress="isShowAction(index)" class="addr-list" hover-class="tap-hover-color">
					<view class="addr-list-top">
						<text>{{ item.consignee }}</text>
						<text class="addr-list-top-text">{{ item.phone }}</text>
					</view>
					<view class="addr-list-bottom">
						<text>{{ item.region }}{{ item.detailedAddress }}</text>
					</view>
				</view>
			</block>
		</block>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { modifyUserInfo } from '@/network/changePersonInfo.js'
	
	export default {
		data() {
			return {
				addressInfoList: []
			}
		},
		computed: {
			getNestList() {
				return JSON.parse(this.userInfo.user.userAddress)
			},
			...mapState(['userInfo'])
		},
		methods: {
			/***  跳转到ChangeAddress2,传入两个参数，
			newAddress表示新增地址，editAddress表示编辑地址,index
			***/
			toChangeAddress2(editAddress) {
				if(editAddress === 'newAddress') {
					uni.navigateTo({
						url: "/components/content/personalinfo/changeinfo/ChangeAddress2"
					})
				}else{
					uni.navigateTo({
						url: `/components/content/personalinfo/changeinfo/ChangeAddress2?index=${editAddress}`
					})
				}
			},
			isShowAction(index) {
				uni.showActionSheet({
					itemList: ['编辑', '删除', '复制'],
					success: res => {
						switch(res.tapIndex) {
							case 0:
								this.toChangeAddress2(index)
								break;
							case 1:
								uni.showModal({
									title: '提示',
									content: '您确定删除该地址？',
									success: res => {
										//删除指定我的地址
										if(res.confirm) {
											
											const list = JSON.parse(this.userInfo.user.userAddress)
											console.log('list:', list)
											list.splice(index, 1, )
											const newList = JSON.stringify(list)
											
											
											
											const reqInfo = {
												userAccount: this.userInfo.user.userAccount,
												modifyContent: newList,
												modifyType: 3
											}
											
											modifyUserInfo(reqInfo).then(res => {
												if(res.status === 200) {
													if(res.data.code === 2000) {
														this.$set(this.userInfo.user, 'userAddress', newList)
														uni.setStorageSync('userInfo', this.userInfo)
													}else {
														uni.showToast({
															title: '您可能与服务器断开了连接',
															icon: 'none'
														})
													}
													console.log(res)
												}else {
													uni.showToast({
														title: '您可能与服务器断开了连接',
														icon: 'none'
													})
												}
											}).catch(err => {
												uni.showToast({
													title: '您可能与服务器断开了连接',
													icon: 'none'
												})
												console.log(err)
											})
											
										}
										
									}
								})
								console.log('删除该地址');
								break;
							case 2:
								console.log('复制该地址');
								break;
							default:
								break;
						}
					},
					fail: err => {
						console.log(err)
					}
				})
			}
		},
		created() {
			//验证我的地址是否存在
			if(this.userInfo.user.userAddress.length > 0) {
				const userAddress = JSON.parse(this.userInfo.user.userAddress)
				this.addressInfoList = userAddress
			}
			
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				this.toChangeAddress2('newAddress')
			}
		}
	}
</script>

<style lang="scss">
	.change-address1 {
		.addr-list {
			padding: 20rpx 40rpx;
			.addr-list-top {
				font-size: 34rpx;
				.addr-list-top-text {
					margin-left: 30rpx;
				}
			}
			.addr-list-bottom {
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				.addr-list-bottom-text {
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
