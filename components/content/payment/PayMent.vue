<template>
	<view class="payment">
		<view class="peyment-list1">
			<view class="peyment-list1-item" hover-class="tap-hover-color">
				<view class="peyment-list1-item-img">
					<text class="my-iconfont list1-image">&#xe623;</text>
				</view>
				<view class="peyment-list1-item-title">
					收付款
				</view>
			</view>
			<view class="peyment-list1-item" hover-class="tap-hover-color">
				<view class="peyment-list1-item-img">
					<text class="my-iconfont list1-image">&#xe61f;</text>
				</view>
				<view class="peyment-list1-item-title">
					钱包
				</view>
			</view>
		</view>
		
		<view class="peyment-list2">
			<view class="peyment-list2-item item1" hover-class="tap-hover-color">
				<view class="peyment-list2-item-img">
					<text class="my-iconfont list2-image list2-image1">&#xe60c;</text>
				</view>
				<view class="peyment-list2-item-title">
					支付宝
				</view>
			</view>
			<view class="peyment-list2-item item2" hover-class="tap-hover-color">
				<view class="peyment-list2-item-img">
					<text class="my-iconfont list2-image list2-image2">&#xe73b;</text>
				</view>
				<view class="peyment-list2-item-title">
					微信
				</view>
			</view>
			<view class="peyment-list2-item item3" hover-class="tap-hover-color">
				<view class="peyment-list2-item-img">
					<text class="my-iconfont list2-image list2-image3">&#xe63b;</text>
				</view>
				<view class="peyment-list2-item-title">
					银行卡
				</view>
			</view>
			<view class="peyment-list2-item item4" hover-class="tap-hover-color">
				<view class="peyment-list2-item-img">
					<text class="my-iconfont list2-image list2-image4">&#xe632;</text>
				</view>
				<view class="peyment-list2-item-title">
					闪付
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		components: {
		}
	}
</script>

<style lang="scss">
	.payment {
		height: 100vh;
		background-color: #F8F8F8;
		margin: 0 8rpx;
		.peyment-list1 {
			display: flex;
			background-color: #00cc99;
			.peyment-list1-item {
				text-align: center;
				flex: 1;
				padding: 80rpx 0;
				.peyment-list1-item-img {
					.list1-image {
						font-size: 70rpx;
						color: #FFFFFF;
					}
				}
				.peyment-list1-item-title {
					font-size: $uni-font-size-lg;
					color: #FFFFFF;
				}
			}
		}
		
		.peyment-list2 {
			display: flex;
			flex-flow: row wrap;
			justify-content: center;
			background-color: #FFFFFF;
			margin: 10rpx 0;
			.peyment-list2-item {
				text-align: center;
				padding: 36rpx 0;
				width: 49.2%;
				border: 1rpx solid rgba(100, 100, 100, .1);
				.peyment-list2-item-img {
					.list2-image {
						font-size: 70rpx;
					}
					.list2-image1 {
						color: #06B4FD;
					}
					.list2-image2 {
						color: #50B674;
					}
					.list2-image3 {
						color: #F2CB51;
					}
					.list2-image4 {
						color: #333333;
					}
				}
				.peyment-list2-item-title {
					font-size: $uni-font-size-base;
					color: #666666;
				}
			}
		}
	}
</style>
