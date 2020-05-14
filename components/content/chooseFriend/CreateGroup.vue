<template>
	<view class="creategroup">
		<view class="def-modify-input">
			<textarea focus auto-height value="" placeholder="群名称" />
		</view>
		<view class="def-long-input">
			<textarea maxlength="150" value="" placeholder="进群邀请信息" />
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.creategroup {
		.def-modify-input {
			position: relative;
			margin: 0 30rpx;
			margin-bottom: 1rpx;
			padding-top: 30rpx;
			box-sizing: border-box;
			textarea {
				color: $uni-text-color;
				font-size: 36rpx;
				padding: 15rpx;
			}
			&::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				height: 1rpx;
				width: 100%;
				background-color: rgba(255, 0, 255, 1);
			}
		}
	}
</style>
