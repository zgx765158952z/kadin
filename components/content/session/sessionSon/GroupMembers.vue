<template>
	<view class="group-members">
		<view class="group-members-list">
			<view v-for="(item, index) in 20" :key="index" class="group-members-item">
				<image src="/static/image/test/test.jpg" mode="aspectFill"></image>
				<text class="group-members-name">
					默认好友
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.group-members {
		.group-members-list {
			display: flex;
			flex-flow: row wrap;
			padding: 15rpx;
			box-sizing: border-box;
			.group-members-item {
				width: 20%;
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				justify-content: center;
				padding: 15rpx 0;
				box-sizing: border-box;
				image {
					width: 110rpx;
					height: 110rpx;
					border-radius: 20rpx;
				}
				.group-members-name {
					width: 100%;
					text-align: center;
					font-size: $uni-font-size-base;
					color: #989898;
					padding: 0 10rpx;
					box-sizing: border-box;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
		}
	}
</style>
