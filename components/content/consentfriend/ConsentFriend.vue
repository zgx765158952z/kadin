<template>
	<view class="consentfriend set-bgc">
		<default-list class="consentfriend-def-list" :noBorderBtm="true">
			<view slot="def-list-left" class="def-list-left">
				<image src="/static/image/global/phone.png"></image>
			</view>
			<view slot="def-list-center" class="def-list-center">
				添加手机联系人
			</view>
			
			<view class="def-list-right">
				
			</view>
		</default-list>
		
		<view class="consent-list">
			<block v-if="consentFriendList.length > 0">
				<block v-for="(item, index) in consentFriendList" :key="index">
					<view class="consent-item">
						<head-img-item>
							<block v-if="item.faceImage">
								<image slot="start-img" :src="imgUrl+item.faceImage" mode="aspectFill"></image>
							</block>
							<block v-else>
								<image slot="start-img" src="/static/image/global/boyHeadImg.png"></image>
							</block>
							<block v-if="item.nickname">
								<text slot="title">
									{{ item.nickname }} 
								</text>
							</block>
							<block v-else>
								<text slot="title">
									未命名 
								</text>
							</block>
							<text slot="msg">
								申请条件申请条件申请条件申请条件申请条件申请条件申请条件申请条件
							</text>
							<view v-if="!isShowAgree" slot="right">
								已添加
							</view>
						</head-img-item>
						<view v-if="isShowAgree" class="right-btn">
							<button class="consent-btn"  @tap="doAgree(index)" type="primary">同意</button>
						</view>
					</view>
				</block>
			</block>
			
		</view>
		
	</view>
</template>

<script>
	import HeadImgItem from '@/components/content/defimglist/HeadImgItem.vue'
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	
	import { queryFriendRequestListRequest, argeeFriendRequest } from '@/network/addfriend.js'

	import { imgBaseUrl } from "@/common/helper.js"
	
	export default {
		components: {
			HeadImgItem,
			DefaultList
		},
		data() {
			return {
				consentFriendList: null,
				isShowAgree: true,
				userAccount: '',
				currentIndex: '',
				imgUrl: ''
			}
		},
		methods: {
			//获取申请好友列表
			queryListRequest() {
				queryFriendRequestListRequest(`?myAccount=${this.userAccount}`).then(res => {
					console.log(res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							if(res.data.data && res.data.data.length > 0) {
								this.consentFriendList = res.data.data
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
					senderAccount: senderAccount,
					acceptAccount: this.userAccount,
					integer: 1
				}
				argeeFriendRequest(SenderAndAccept).then(res => {
					if(res.status === 200) {
						if(res.data.code === 2000) {
							this.isShowAgree = false
							
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
		computed: {
			//计算同意或忽略哪一个申请
			calcWhichAgreeIgnore(index) {
				
			}
		},
		onLoad() {
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
		created() {
			const userInfo = uni.getStorageSync('userInfo')
			this.userAccount = userInfo.user.userAccount;
			this.imgUrl = imgBaseUrl
		},
		mounted() {
		}
		
	}
</script>

<style lang="scss">
	
	.consentfriend {
		height: 100vh;
		.defaultlist {
			// border-top: 30rpx solid #F7F7F7;
			// border-bottom: 30rpx solid #F7F7F7;
		}
		.consentfriend-def-list {
			.def-list-left {
				display: flex;
				align-items: center;
				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
			.def-list-center {
				color: #181818;
			}
		}
		
		
		.consent-list {
			margin-top: 30rpx;
			.consent-item {
				position: relative;
				background-color: #FFFFFF;
				.right-btn {
					position: absolute;
					z-index: 999;
					display: flex;
					justify-content: space-between;
					right: 25rpx;
					top: 35rpx;
					button {
						font-size: 23rpx;
					}
					.consent-btn {
						background-color: #1aad19;
					}
				}
			}
		}
		
		
		
	}
</style>
