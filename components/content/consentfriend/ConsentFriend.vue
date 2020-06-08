<template>
	<view class="consentfriend set-bgc">
		<default-list class="consentfriend-def-list" :noBorderBtm="true">
			<view class="my-iconfont" slot="def-list-left" >&#xe620;</view>
			<view class="consentfriend-def-list-center" slot="def-list-center">添加手机联系人</view>
			<view class="def-list-right" slot="def-list-right"></view>
		</default-list>
		
		<view class="consent-list">
			
			<view v-if="consentFriendList.length > 0">
				<view v-for="(item, index) in consentFriendList" :key="index" class="consent-item">
					<head-img-item :noBorderBtm="(index+1)===consentFriendList.length">
						<image v-if="item.faceImage" slot="start-img" :src="imgUrl+item.faceImage"></image>
						<image v-else slot="start-img" src="/static/image/global/boyHeadImg.png"></image>
						<text v-if="item.nickname" slot="title">
							{{ item.nickname }} 
						</text>
						<text v-if="item.requestMsg" slot="msg">
							{{ item.requestMsg }}
						</text>
						<view v-if="!item.isFriend" @tap="doAgree(index)" :class="{'consent-btn': !item.isFriend}" slot="right">
							同意
						</view>
					</head-img-item>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import HeadImgItem from '@/components/content/defimglist/HeadImgItem.vue'
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	
	import { queryFriendRequestListRequest, argeeFriendRequest } from '@/network/addfriend.js'
	import { mapState, mapMutations } from 'vuex'
	
	import { imgBaseUrl } from "@/common/helper.js"
	
	export default {
		components: {
			HeadImgItem,
			DefaultList
		},
		computed: {
			...mapState(['userInfo', 'newFriendRequest'])
		},
		data() {
			return {
				consentFriendList: null,
				currentIndex: '',
				imgUrl: ''
			}
		},
		
		methods: {
			...mapMutations(['clearNewData']),
			//获取申请好友列表
			queryListRequest() {
				queryFriendRequestListRequest(`?myAccount=${this.userInfo.user.userAccount}`).then(res => {
					console.log(res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							if(res.data.data && res.data.data.length > 0) {
								this.consentFriendList = res.data.data
								this.consentFriendList.forEach(item => {
									item.isFriend = false
								})
								if(this.newFriendRequest) {
									this.clearNewData('clearnewPushMsg')
								}
							}else {
								this.consentFriendList = null
							}
						}
					}else if(res.status === 404) {
						uni.showToast({
							title: '网络走丢了,请稍后重试',
							icon: 'none'
						})
					}else {
						uni.showToast({
							title: '程序走丢了,请稍后重试',
							icon: 'none'
						})
					}
				}).catch(err => {
					uni.showToast({
						title: '程序走丢了,请稍后重试',
						icon: 'none'
					})
				})
			},
			
			//同意申请
			doAgree(index) {
				const senderAccount = this.consentFriendList[index].userAccount;
				
				const SenderAndAccept = {
					senderAccount,
					acceptAccount: this.userInfo.user.userAccount,
					integer: 1
				}
				argeeFriendRequest(SenderAndAccept).then(res => {
					if(res.status === 200) {
						if(res.data.code === 2000) {
							this.consentFriendList[index].isFriend = true
							console.log('this.consentFriendList:', this.consentFriendList)
							this.queryListRequest()
						}else if(res.status === 404) {
							uni.showToast({
								title: '网络走丢了,请稍后重试',
								icon: 'none'
							})
						}else {
							uni.showToast({
								title: '程序走丢了,请稍后重试',
								icon: 'none'
							})
						}
					}else {
						uni.showToast({
							title: '程序走丢了,请稍后重试',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: '程序走丢了,请稍后重试',
						icon: 'none'
					})
				})
			},
			
			
			
		},
		onLoad() {
			this.imgUrl = imgBaseUrl
			//获取申请好友列表
			this.queryListRequest()
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				uni.navigateTo({
					url: '/components/content/addfriend/AddFriend'
				})
			}
		},
		mounted() {
		}
		
	}
</script>

<style lang="scss">
	
	.consentfriend {
		height: 100vh;
		.consentfriend-def-list {
			.my-iconfont {
				color: #55A532;
				font-size: 36rpx;
			}
			.consentfriend-def-list-center {
				color: #181818;
			}
		}
		
		
		.consent-list {
			margin-top: 30rpx;
			.consent-item {
				position: relative;
				background-color: #FFFFFF;
				image {
					width: 92rpx;
					height: 92rpx;
				}
				// .right-btn {
				// 	position: absolute;
				// 	z-index: 999;
				// 	display: flex;
				// 	justify-content: space-between;
				// 	right: 25rpx;
				// 	top: 35rpx;
				// 	button {
				// 		font-size: 18rpx;
				// 	}
				// 	.consent-btn {
				// 		background-color: #1aad19;
				// 	}
				// }
				.consent-btn {
					font-size: 32rpx;
					color: #007AFF;
				}
			}
		}
		
		
		
	}
</style>
