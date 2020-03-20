<template>
	<view class="card">
		<view class="card-middle">
			<view class="card-top">
				<view class="card-top-img">
					<image v-if="userInfo.user.faceImage" :src=" imgUrl + userInfo.user.faceImage" mode="aspectFill"></image>
					<image v-else-if="userInfo.user.userSex" src="/static/image/global/boyHeadImg.png" mode="aspectFill"></image>
					<image v-else src="/static/image/global/girlHeadImg.png" mode="aspectFill"></image>
				</view>
				<view class="card-top-info">
					<view class="name-and-gender">
						<view class="info-name">
							{{ userInfo.user.nickname || '' }}
						</view>
						<view class="info-gender">
							<image v-if="userInfo.user.userSex" src="/static/image/global/man.png"></image>
							<image v-else src="/static/image/global/women.png"></image>
						</view>
					</view>
					<view class="info-region">
						{{ userInfo.user.region || '' }}
					</view>
				</view>
			</view>
			
			<view class="card-bottom">
				<image v-if="userInfo.user.qrcode" :src=" imgUrl + userInfo.user.qrcode " mode="widthFix"></image>
			</view>
			
			<view class="card-bottom-text">
				扫一扫上面的二维码图案，加我好友
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { imgBaseUrl } from '@/common/helper.js'
	
	export default {
		data() {
			return {
				imgUrl: ''
			}
		},
		methods: {
		},
		computed: {
			...mapState(['userInfo'])
		},
		created() {
			this.imgUrl = imgBaseUrl
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				uni.showActionSheet({
					itemList: ['保存到手机', '扫描二维码'],
					success(e) {
						console.log(e)
						switch(e.tapIndex) {
							case 0:
								console.log('保存到手机');
								break;
							case 1:
								console.log('扫描二维码');
								break;
							default:
								break;
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.card {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: #F7F7F7;
		.card-middle {
			width: 90%;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			.card-top {
				display: flex;
				align-items: center;
				margin: 32rpx;
				.card-top-img {
					width: auto;
					image {
						display: flex;
						align-items: center;
						width: 130rpx;
						height: 130rpx;
						border-radius: 10rpx;
					}
				}
				
				.card-top-info {
					flex: 1;
					margin-left: 24rpx;
					.name-and-gender {
						display: flex;
						flex-flow: row nowrap;
						.info-name {
							font-size: 36rpx;
							font-weight: bold;
						}
						.info-gender {
							display: flex;
							align-items: center;
							margin-left: 16rpx;
							image {
								width: 30rpx;
								height: 30rpx;
							}
						}
					}
					.info-region {
						font-size: $uni-font-size-base;
						color: $uni-text-color-grey;
					}
				}
			}
			
			.card-bottom {
				margin: 70rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 80%;
				}
			}
			.card-bottom-text {
				text-align: center;
				margin-bottom: 30rpx;
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
			}
		}
	}
</style>
