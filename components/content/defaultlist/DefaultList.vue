<template>
	<view class="defaultlist" :class="marTop ? 'defaultlist-martop':'' ">
		<view hover-class="tap-hover-color">
			<view class="def-list" :class=" noBorderBtm ? 'def-list-no-border': '' ">
				<view class="def-list-left">
					<slot name="def-list-left">
					</slot>
				</view>
				<view class="def-list-center" :class="{'alignRight': textRight}">
					<slot name="def-list-center">
					</slot>
				</view>
				<view class="def-list-right">
					<text v-if="myRight" class="my-iconfont" >&#xe683;</text>
					<slot v-else name="def-list-right"></slot>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			myRight: {
				type: Boolean,
				default: true
			},
			noBorderBtm: {
				type: Boolean,
				default: false
			},
			marTop: {
				type: Boolean,
				default: false
			},
			textRight: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss">
	.defaultlist {
		background-color: #FFFFFF;
		
		.def-list {
			display: flex;
			align-items: center;
			// padding: 30rpx 27rpx 30rpx 0;
			// margin-left: 27rpx;
			
			padding: 30rpx 30rpx 30rpx 0;
			margin-left: 30rpx;
			font-size: $uni-font-size-lg;
			border-bottom: 1rpx solid rgba(100, 100, 100, .1);
			.def-list-left {
				width: auto;
				// color: $uni-text-color;
			}
			.def-list-center {
				flex: 1;
				margin: 0 10rpx 0 30rpx;
				color: #989898;
			}
			.alignRight {
				text-align: right;
			}
			
			.def-list-right {
				// display: flex;
				// justify-content: center;
				// align-items: center;
				// margin-left: 6rpx;
				width: auto;
				.my-iconfont {
					font-size: $uni-font-size-lg;
					color: #989898;
					font-weight: 900;
				}
			}
			
		}
		.def-list-no-border {
			border: none!important;
		}
		
	}
	
	.defaultlist-martop {
		margin-top: 30rpx;
	}
</style>
