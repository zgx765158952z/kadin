<template>
	<view class="profilebtm">
		<view class="list1 list">
			<view class="item1" hover-class="tap-hover-color">
				<view class="item1-img">&#xe601;</view>
				<view class="item1-title1">
					SSH工具
				</view>
			</view>
			<view class="item1" hover-class="tap-hover-color">
				<view class="item1-img">&#xe60f;</view>
				<view class="item1-title1">
					文件管理
				</view>
			</view>
			<view class="item1" hover-class="tap-hover-color">
				<view class="item1-img">&#xe600;</view>
				<view class="item1-title1">
					虚拟MFA
				</view>
			</view>
		</view>
		<view class="list1">
			<view class="item1" hover-class="tap-hover-color">
				<view class="item1-img">&#xe8a8;</view>
				<view class="item1-title2">
					云服务器ECS
				</view>
			</view>
			<view class="item1" hover-class="tap-hover-color">
				<view class="item1-img">&#xe8b2;</view>
				<view class="item1-title2">
					云数据库RDS
				</view>
			</view>
			<view class="item1" hover-class="tap-hover-color">
				<view class="item1-img">&#xe8b1;</view>
				<view class="item1-title2">
					对象存储OSS
				</view>
			</view>
			<view class="item1" hover-class="tap-hover-color">
				<view class="item1-img">&#xe8b3;</view>
				<view class="item1-title2">
					负载均衡
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		components: {
		},
	}
</script>

<style lang="scss">
		
	.profilebtm {
		margin-top: 30rpx;
		.list {
			margin-bottom: 26rpx;
		}
		.list1 {
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			text-align: center;
			.item1 {
				flex: 1;
				padding: 16rpx 0;
				.item1-img {
					font-family: 'iconfont';
					font-size: 50rpx;
					color: #00C1D1;
				}
				.item1-title1 {
					font-size: $uni-font-size-lg;
					color: #333333;
				}
				.item1-title2 {
					font-size: 24rpx;
					color: #777777;
				}
			}
			.item1:active {
				background-color: #eee;
			}
		}
	}
</style>
