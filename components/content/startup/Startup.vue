<template>
	<view class="startup">
		<view @tap="stopCounter" class="handlerStart">
			跳过<block v-if="counter > 0">(<text>{{ counter }}</text>)</block>
		</view>
		<view class="startup-animation">启动页动画展示</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				counter: 3
			}
		},
		methods: {
			stopCounter() {
				clearInterval(this.timer)
				uni.reLaunch({
					url: '/components/content/login/login'
				})
			}
		},
		created() {
			this.timer = setInterval(() => {
				if(this.counter <= 0) {
					clearInterval(this.timer)
				}else {
					this.counter -= 1
				}
				
			}, 1000)
		}
	}
</script>

<style lang="scss">
	.startup {
		display: flex;
		align-items: center;
		
		.handlerStart {
			position: fixed;
			right: 10rpx;
			top: 10rpx;
		}
		.startup-animation {
			
		}
	}
</style>
