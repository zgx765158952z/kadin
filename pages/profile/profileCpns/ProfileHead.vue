<template>
	<view class="profilehead set-bgc">
		<view class="status_bar">
		  <!-- 这里是状态栏 -->
		</view>
		
		<view class="profilehead-list" hover-class="tap-hover-color">
			<block v-if="hasLogin">
				
			</block>
			<view class="profilehead-list-left">
				<block v-if="userInfo.user.faceImage">
					<image class="profilehead-img" :src=" imgUrl + userInfo.user.faceImage" mode="aspectFill"></image>
				</block>
				<block v-else>
					<block v-if="userInfo.user.userSex">
						<image class="profilehead-img" src="/static/image/global/boyHeadImg.png"></image>
					</block>
					<block v-else-if="!userInfo.user.userSex">
						<image class="profilehead-img" src="/static/image/global/girlHeadImg.png"></image>
					</block>
				</block>
			</view>
			<view class="profilehead-list-info">
				<block v-if="nickname">
					<view class="profilehead-list-info-top">{{ nickname }}</view>
				</block>
				
				<view class="profilehead-list-info-btm">
					<block v-if="userAccount">
						<text class="profilehead-list-info-btm-first">卡丁号: {{ userAccount }}</text>
					</block>
					<text class="profilehead-list-info-btm-end">&#xe683;</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { imgBaseUrl } from '@/common/helper.js'
	
	export default {
		components: {
		},
		data() {
			return {
				imgUrl: ''
			}
		},
		computed: {
			...mapState(['userInfo', 'hasLogin'])
		},
		props: ['userAccount', 'nickname'],
		created() {
			this.imgUrl = imgBaseUrl
		}
	}
</script>

<style lang="scss">
	.profilehead {
		.profilehead-list {
			display: flex;
			align-items: center;
			padding: 60rpx 20rpx 60rpx 40rpx;
			background-color: #FFFFFF;
			.profilehead-list-left {
				display: flex;
				align-items: center;
				margin-right: 20rpx;
				.profilehead-img {
					border-radius: 12rpx;
					width: 115rpx;
					height: 115rpx;
				}
			}
			.profilehead-list-info {
				flex: 1;
				.profilehead-list-info-top {
					font-size: 38rpx;
					font-weight: bold;
				}
				.profilehead-list-info-btm {
					display: flex;
					align-items: center;
					margin-top: 14rpx;
					.profilehead-list-info-btm-first {
						flex: 1;
						font-size: 28rpx;
						color: #B2B2B2;
					}
					.profilehead-list-info-btm-end {
						width: auto;
						font-family: 'iconfont';
						font-size: 30rpx;
						color: #ACACAC;
					}
				}
			}
		}
		
		
		head-img-item {
			padding: 30rpx 20rpx;
			.end-info {
				border: 0 !important;
			}
			.profilehead-img {
				width: 115rpx !important;
				height: 115rpx !important;
			}
			.profilehead-top-name {
				font-size: 38rpx;
				font-weight: bold;
			}
			
			.profilehead-btm-account {
				font-size: 28rpx;
				margin-top: 14rpx;
			}
			
			.profilehead-right {
				font-family: 'iconfont';
				font-size: 30rpx;
			}
			.right {
				text-align: right !important;
			}
		}
	}
</style>
