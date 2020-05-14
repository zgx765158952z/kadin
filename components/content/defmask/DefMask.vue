<template>
	<view class="def-mask">
		<view @touchstart="tapHideMask" v-if="isShowMask" class="myMask">
			
		</view>
		<slot >
			<!-- 弹出窗口插槽 -->
		</slot>
		<view v-if="isShowMask" class="popup" :class="animationShow?'effect-in':'effect-hide'" :style="fixedStyle">
			<slot name="popup-list">
				
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			fixedStyle: {
				type: String,
				default() {
					return 'position: fixed; top: 16rpx; right: 16rpx; z-index: 100;'
				}
			}
		},
		data() {
			return {
				isShowMask: false,
				animationShow: false
			}
		},
		methods: {
			
			toAddfriend() {
				uni.navigateTo({
					url: '/components/content/addfriend/AddFriend'
				})
			},
			
			
			
			//显示遮罩层
			tapShowMask() {
				this.animationShow = true
				this.isShowMask = true
			},
			
			//隐藏遮罩层
			tapHideMask(e) {
				this.animationShow = false
				setTimeout(() => {
					this.isShowMask = false
				}, 300)
			},
			
			
			
			
		}
	}
</script>

<style scoped lang="scss">
	.def-mask {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: center;
		.myMask {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99;
			height: 100%;
			width: 100%;
			
		}
		
		
		.popup {
			
		}
		
		
		// .edit-list {
		// 	position: fixed;
		// 	top: 10rpx;
		// 	right: 15rpx;
		// 	z-index: 100;
		// 	.edit-list-item {
		// 		display: flex;
		// 		align-items:center;
		// 		padding: 28rpx 35rpx;
		// 		background-color: #444444;
		// 		border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
		// 		.edit-list-item-img {
		// 			height: 50rpx;
		// 			width: 50rpx;
		// 		}
		// 		.edit-list-item-text {
		// 			// padding: 30rpx 30rpx 30rpx 0;
		// 			margin-left: 24rpx;
		// 			font-size: 30rpx;
		// 			color: #FFFFFF;
		// 		}
				
		// 	}
		// 	.edit-list-item:active {
		// 		background-color: #333333;
		// 	}
		// 	.edit-list-item-start {
		// 		border-top-left-radius: 12rpx;
		// 		border-top-right-radius: 12rpx;
		// 	}
		// 	.edit-list-item-last {
		// 		border-bottom-left-radius: 12rpx;
		// 		border-bottom-right-radius: 12rpx;
		// 	}
		// }
		
	}
</style>
