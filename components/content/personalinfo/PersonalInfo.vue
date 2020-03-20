<template>
	<view class="personalinfo">
		<view @tap="changeHeadImg" class="defaultlist headImgList" hover-class="tap-hover-color">
			<view class="defaultlist-left">
				头像
			</view>
			<view class="defaultlist-center headImgItem">
				<view @tap.stop="previewHeadImg" class="headImg">
					<image v-if="userInfo.user.faceImage" class="center-img" :src=" imgUrl + userInfo.user.faceImage" mode="aspectFill"></image>
					<image v-else-if="userInfo.user.userSex" class="center-img" src="/static/image/global/boyHeadImg.png" mode="aspectFill"></image>
					<image v-else-if="!userInfo.user.userSex" class="center-img" src="/static/image/global/girlHeadImg.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="defaultlist-right">
				<image src="/static/image/global/right.png"></image>
			</view>
		</view>
		<view @tap="toChangeName" class="defaultlist" hover-class="tap-hover-color">
			<view class="defaultlist-left">
				名字
			</view>
			<view class="defaultlist-center">
				<block v-if="userInfo.user.nickname">
					{{ userInfo.user.nickname }}
				</block>
			</view>
			<view class="defaultlist-right">
				<image src="/static/image/global/right.png"></image>
			</view>
		</view>
		<view class="defaultlist" hover-class="tap-hover-color">
			<view class="defaultlist-left">
				卡丁号
			</view>
			<view class="defaultlist-center font-co">
				<block v-if="userInfo.user.userAccount">
					{{ userInfo.user.userAccount }}
				</block>
			</view>
		</view>
		<view @tap="toCard" class="defaultlist" hover-class="tap-hover-color">
			<view class="defaultlist-left">
				二维码名片
			</view>
			<view class="defaultlist-center">
			</view>
			<view class="defaultlist-right">
				<image src="/static/image/global/right.png"></image>
			</view>
		</view>
		<view @tap="toChangeMoreInfo" class="defaultlist" hover-class="tap-hover-color">
			<view class="defaultlist-left">
				更多信息
			</view>
			<view class="defaultlist-center">
			</view>
			<view class="defaultlist-right">
				<image src="/static/image/global/right.png"></image>
			</view>
		</view>
		<view @tap="toChangeAddress1" class="defaultlist" hover-class="tap-hover-color">
			<view class="defaultlist-left">
				我的地址
			</view>
			<view class="defaultlist-center">
				
			</view>
			<view class="defaultlist-right">
				<image src="/static/image/global/right.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { getMyUserInfo } from "@/network/myUserInfo.js"
	
	import { mapState } from 'vuex';
	
	import { imgBaseUrl, baseUrl } from '@/common/helper.js'
	import { addMyCollectRequest } from '@/network/collection.js'
	
	export default {
		components: {
		},
		data() {
			return {
				myHeadImgUrl: '',
				imgUrl: ''
			}
		},
		computed: {
			//批量映射
			...mapState(['userInfo'])
		},
		methods: {
			//修改用户头像
			changeHeadImg() {
				console.log('修改头像：')
				uni.chooseImage({
					count: 1,
					success: res1 => {
						uni.uploadFile({
							url: `${baseUrl}/user/updateUserAvatar`,
							filePath: res1.tempFilePaths[0],
							formData: {
								'account': this.userInfo.user.userAccount,
								'_method': 'PUT'
							},
							name: "multipartFile",
							success:res2 => {
								console.log(res2)
								if(res2.statusCode === 200) {
									const data = JSON.parse(res2.data)
									if(data.code === 2000) {
										this.$set(this.userInfo.user, 'faceImage', data.data)
										uni.setStorageSync('userInfo', this.userInfo)
										console.log(this.userInfo)
									}else {
										uni.showToast({
											title: '服务器睡着了~',
											icon: 'none'
										})
									}
								}else {
									uni.showToast({
										title: '服务器睡着了~',
										icon: 'none'
									})
								}
								
							},
							fail: err2 => {
								if(err2.uploadFile != 'ok') {
									uni.showToast({
										title: '服务器睡着了~',
										icon: 'none'
									})
								}
							}
						})
					},
					fail: err1 => {
						console.log(err1)
					}
				})
			},
			//预览图片、保存图片
			previewHeadImg() {
				uni.previewImage({
					urls: [`${imgBaseUrl}${this.userInfo.user.faceImage}`],
					longPressActions: {
						itemList: ['保存到相册', '收藏'],
						success: res => {
							console.log(res.tapIndex)
							switch (res.tapIndex) {
								case 0:
									uni.saveImageToPhotosAlbum({
										filePath: `${imgBaseUrl}${this.userInfo.user.faceImage}`,
										success: res2 => {
											uni.showToast({
												title: '已保存到系统相册',
												icon: 'none'
											})
										},
										fail: err2 => {
											uni.showToast({
												title: '保存失败，请稍后重试',
												icon: 'none'
											})
										}
									})
									break;
								case 1:
									const obj = {
										account: this.userInfo.user.userAccount,
										collectContent: `${imgBaseUrl}${this.userInfo.user.faceImage}`,
										collectType: '图片'
									}
									addMyCollectRequest(obj).then(res => {
										if(res.status === 200) {
											if(res.data.code === 2000) {
												uni.showToast({
													title: '成功收藏',
													icon: 'none'
												})
											}else {
												uni.showToast({
													title: '程序走丢了，请稍后重试',
													icon: 'none'
												})
											}
										}else {
											uni.showToast({
												title: '程序走丢了，请稍后重试',
												icon: 'none'
											})
										}
										console.log(res)
									}).catch(err => {
										uni.showToast({
											title: '程序走丢了，请稍后重试',
											icon: 'none'
										})
									})
									break;
							}
						}
					}
				})
			},
			
			//跳转到ChangeName
			toChangeName() {
				uni.navigateTo({
					url: '/components/content/personalinfo/changeinfo/ChangeName'
				})
			},
			//跳转到Card
			toCard() {
				uni.navigateTo({
					url: "/components/content/personalinfo/changeinfo/Card"
				})
			},
			//跳转到ChangeMoreInfo
			toChangeMoreInfo() {
				uni.navigateTo({
					url: '/components/content/personalinfo/changeinfo/ChangeMoreInfo'
				})
			},
			//跳转到ChangeAddress1
			toChangeAddress1() {
				uni.navigateTo({
					url: '/components/content/personalinfo/changeinfo/ChangeAddress1'
				})
			}
		},
		created() {
			this.imgUrl = imgBaseUrl
		}
		
	}
</script>

<style lang="scss">
	.personalinfo {
		background-color: #F7F7F7;
		font-size: 36rpx;
		height: 100vh;
		.headImgList {
			.headImgItem {
				.headImg {
					text-align: right;
					.center-img {
						width:  100rpx;
						height: 100rpx;
						border-radius: 10rpx;
					}
				}
			}
		}
		
		.defaultlist {
			display: flex;
			align-items: center;
			padding: 30rpx;
			background-color: #FFFFFF;
			border-bottom: 1rpx solid rgba(144, 144, 144, .1);
			
			.defaultlist-left {
				width: auto;
			}
			.defaultlist-center {
				flex: 1;
				display: flex;
				flex-direction: row-reverse;
				align-items: center;
				color: #666666;
				
				.right-input {
					text-align: right;
				}
			}
			.defaultlist-right {
				width: auto;
				margin-left: 12rpx;
				image {
					display: flex;
					align-items: center;
					width: 30rpx;
					height: 30rpx;
				}
			}
			.font-co {
				color: $uni-text-color-grey;
			}
		}
	}
	
	
</style>
