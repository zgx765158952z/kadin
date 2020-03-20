<template>
	<view class="publish">
		<view class="publish-textarea">
			<textarea v-model="currentText" focus="true" placeholder="写下你的想法..."/>
		</view>
		<view class="publish-set">
			<head-img-item @tap.native="toLocationInfo">
				<image class="set-img" slot="start-img" src="/static/image/publish/location.png"></image>
				<view slot="title">
					所在位置
				</view>
				<view class="link-right" slot="right">
					<view class="link-right-img">
						<image src="/static/image/global/right.png"></image>
					</view>
				</view>
			</head-img-item>
			<head-img-item>
				<image class="set-img" slot="start-img" src="/static/image/publish/aite.png"></image>
				<view slot="title">
					提醒谁看
				</view>
				<view class="link-right" slot="right">
					<view class="link-right-img">
						<image src="/static/image/global/right.png"></image>
					</view>
				</view>
			</head-img-item>
			<head-img-item>
				<image class="set-img" slot="start-img" src="/static/image/publish/person.png"></image>
				<view slot="title">
					谁可以看
				</view>
				<view class="link-right" slot="right">
					<text>公开</text>
					<view class="link-right-img">
						<image src="/static/image/global/right.png"></image>
					</view>
				</view>
			</head-img-item>
		</view>
	</view>
</template>

<script>
	import HeadImgItem from '@/components/content/defimglist/HeadImgItem.vue'
	
	
	import { doPublishDynamic } from '@/network/dynamic.js'
	
	export default {
		components: {
			HeadImgItem
		},
		data() {
			return {
				txt1: "",
				txt2: "",
				userAccount: '',
				currentText: ''
			}
		},
		methods: {
			//发表动态
			PublishDynamic() {
				if(this.currentText.length > 0) {
					const obj = {
						account: this.userAccount,
						content: this.currentText,
						address: '广州天河'
					}
					doPublishDynamic(obj).then(res => {
						console.log(res)
						if(res.status === 200) {
							if(res.data.code === 2000) {
								uni.$emit('updateDynamicList', {})
								uni.navigateBack()
							}else {
								uni.showToast({
									title: '发表失败',
									icon: 'none'
								})
							}
						}else {
							uni.showToast({
								title: '发表失败',
								icon: 'none'
							})
						}
					}).catch(err => {
						console.log(err)
					})
				}else {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})
				}
				
			},
			toLocationInfo() {
				uni.navigateTo({
					url: "/components/content/myLocation/LocationInfo"
				})
			}
		},
		onNavigationBarButtonTap(options) {
			if(options.index === 0) {
				console.log('option')
				this.PublishDynamic()
			}
		},
		//返回触发modal
		onBackPress(e) {
			if(e.from === 'navigateBack') {
				//返回
				return false
			}
			if(e.from === 'backbutton') {
				if(this.currentText.length > 0) {
					uni.showModal({
						title: '提示',
						content: '您确定退出当前编辑？',
						success(res) {
							if(res.confirm) {
								uni.navigateBack()
							}else if(res.cancel){
								//表示禁止默认返回
								return true
							}
						},
						fail(err) {
							console.log(err)
							return true
						}
					})
				}else {
					return false
				}
			}
			return true
		},
		created() {
			const userInfo = uni.getStorageSync('userInfo')
			this.userAccount = userInfo.user.userAccount
		}
	}
</script>

<style lang="scss">
	.publish {
		.publish-textarea {
			display: flex;
			justify-content: center;
			textarea {
				width: 90%;
				padding: 30rpx;
			}
		}
		
		.publish-set {
			padding: 0 30rpx;
			margin: 0 auto;
			font-size: $uni-font-size-lg;
			border-top: 1rpx solid rgba(100, 100, 100, .1);
			head-img-item {
				.start-img {
					image {
						width: 50rpx;
						height: 50rpx;
					}
				}
				.link-right {
					display: flex;
					justify-content: flex-end;
					.link-right-img {
						display: flex;
						align-items: center;
						image {
							width: 36rpx;
							height: 36rpx;
						}
					}
					
				}
				.end-info {
					padding: 20rpx 0;
					.right {
					}
				}
			}
		}
	}
</style>
