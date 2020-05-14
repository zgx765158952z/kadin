<template>
	<view class="loadingicon">
		<view>
			<view class="bounce1 bounce" :style="bounceStyle"></view>
			<view class="bounce2 bounce" :style="bounceStyle"></view>
			<view class="bounce3 bounce" :style="bounceStyle"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bounceStyle: {
				type: String,
				default() {
					return ''
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@keyframes loading-icon {
		0%, 80%, 100% {
			transform: scale(0.0);
		}
		40% {
			transform: scale(1.0);
		}
	}
	@-webkit-keyframes loading-icon {
		0%, 80%, 100% {
			-webkit-transform: scale(0.0);
		}
		100% {
			-webkit-transform: scale(1.0);
		}
	}
	.loadingicon {
		display: flex;
		justify-content: center;
		align-item: center;
		&>view {
			display: flex;
			flex-flow: row nowrap;
			.bounce {
				display: inherit;
				width: 30rpx;
				height: 30rpx;
				background-color: #67CF22;
				border-radius: 100%;
				margin: 0 2rpx;
				box-sizing: border-box;
				-webkit-animation: loading-icon 1.4s infinite ease-in-out;
				animation: loading-icon 1.4s infinite ease-in-out;
			}
			.bounce1 {
				animation-delay: -0.32s;
				-webkit-animation-delay: -0.32s; 
			}
			
			.bounce2 {
				animation-delay: -0.16s;
				-webkit-animation-delay: -0.16s; 
			}
		}
		
		
	}
</style>
