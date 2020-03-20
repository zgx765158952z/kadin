<template>
	<view class="location-list">
		<head-img-item class="location-select-item">
			<view class="location-select-item-title" slot="title">
				不显示位置
			</view>
			<view class="location-item-btn" slot="right">&#xe642;</view>
		</head-img-item>
		
		<head-img-item>
			<view slot="title">
				鸿利商务中心
			</view>
			<text slot="msg">
				广东省广州市天河区中山大道中243号鸿利商务中心405
			</text>
			<!-- <view class="location-item-btn" slot="right">&#xe642;</view> -->
		</head-img-item>
		
		<head-img-item>
			<view slot="title">
				天河广场
			</view>
			<text slot="msg">
				广东省广州市天河区中山大道中243号鸿利商务中心405
			</text>
			<!-- <view class="location-item-btn" slot="right">&#xe642;</view> -->
		</head-img-item>
		
		<head-img-item>
			<view slot="title">
				东景花园
			</view>
			<text slot="msg">
				广东省广州市天河区中山大道中243号鸿利商务中心405
			</text>
			<!-- <view class="location-item-btn" slot="right">&#xe642;</view> -->
		</head-img-item>
	</view>
</template>

<script>
	import HeadImgItem from '@/components/content/defimglist/HeadImgItem.vue'
	export default {
		components: {
			HeadImgItem
		},
		methods: {
			// #ifdef APP-PLUS
			getCurrentLocation(){
			}
			// #endif
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.getCurrentLocation()
			// #endif
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				uni.navigateTo({
					url: "/components/content/myLocation/SearchLocation"
				})
			}
		}
	}
</script>

<style lang="scss">
	.location-list {
		height: 100vh;
		background-color: #F7F7F7;
		.location-select-item {
			.location-select-item-title {
				color: #007AFF;
			}
		}
		.head-img-item {
			.start-img {
				display: none!important;
			}
			.end-info {
				padding: 27rpx 0 27rpx 27rpx !important;
				
				.right {
					min-width: 0!important;
				}
			}
		}
		
		.location-item-btn {
			font-family: 'iconfont';
			text-align: right;
			font-size: 40rpx;
			color: #1AAB1B;
		}
	}
</style>
