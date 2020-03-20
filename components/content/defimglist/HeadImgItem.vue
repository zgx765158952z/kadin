<template>
	<view class="head-img-item">
		
		<view @click="test" hover-class="tap-hover-color" class="item">
			<view class="start-img">
				<slot name="start-img"></slot>
			</view>
			<view class="end-info" :class="{'noBorder': noBorderBtm}">
				<view class="left">
					<view class="title">
						<slot name="title"></slot>
					</view>
					<view class="msg">
						<!-- <text>我是马化腾，申请为你的好友,可以吗</text> -->
						<slot name="msg"></slot>
					</view>
				</view>
				
				<view class="right">
					<slot name="right">
					</slot>
				</view>
			</view>
		</view>
		
		
		
		 
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			noBorderBtm: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		methods: {
			test() {
				
			}
		}
		
	}
</script>

<style lang="scss">
	.head-img-item {
		.item {
			display: flex;
			.start-img {
				display: flex;
				align-items: center;
				width: auto;
				margin-right: 27rpx;
				padding-left: 27rpx;
				image {
					width: 92rpx;
					height: 92rpx;
					border-radius: 10rpx;
				}
			}
			
			.end-info {
				display: flex;
				align-items: center;
				flex: 1;
				overflow: hidden;
				padding: 18rpx 0;
				border-bottom: 1rpx solid rgba(100, 100, 100, .1);
				.left {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
					.title {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 36upx;
						color: #181818;
					}
					
					.msg {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: $uni-font-size-base;
						color: #B2B2B2;
					}
				}
				
				
				.right {
					width: auto;
					min-width: 118rpx;
					margin: 0 27rpx;
					text-align: center;
					font-size: 36rpx;
					color: #B2B2B2;
				}
			}
				
			.noBorder {
				border-bottom: none;
			}
				
				
			
		}
		
		
	}
</style>
