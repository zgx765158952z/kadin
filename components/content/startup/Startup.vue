<template>
	<view class="startup">
		
		<view class="status_bar">
		  <!-- 这里是状态栏 -->
		</view>
		<view class="startup-content">
			<view class="startup-animation">启动页动画展示</view>
		</view>
		
		<view @tap="stopCounter" class="handlerSkip">
			跳过<text v-if="counter > 0">(<text>{{ counter }}</text>)</text>
		</view>
	</view>
</template>

<script>
	
	
	import { mapState } from 'vuex'
	
	
	export default {
		data() {
			return {
				timer: null,
				counter: 5
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		watch: {
			counter(newV, oldV) {
				if(newV === 0) {
					if(this.hasLogin) {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}else {
						uni.reLaunch({
							url: '/components/content/login/login'
						})
					}
				}
			}
		},
		methods: {
			stopCounter() {
				clearInterval(this.timer)
				if(this.hasLogin) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}else {
					uni.reLaunch({
						url: '/components/content/login/login'
					})
				}
			},
			
		},
		onLoad() {
			console.log('startup启动页onLoad')
			
			
			this.timer = setInterval(() => {
				if(this.counter <= 0) {
					clearInterval(this.timer)
				}else {
					this.counter -= 1
				}
				
			}, 1000)
		},
		onUnload() {
			clearInterval(this.timer)
		}
	}
</script>

<style lang="scss">
	.startup {
		min-height: 100vh;
		.startup-content {
			.startup-animation {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		
		.handlerSkip { //跳过
			position: fixed;
			right: 20rpx;
			bottom: 20rpx;
			padding: 6rpx 12rpx;
			box-sizing: border-box;
			background-color: #999;
			color: #fff;
			font-size: $uni-font-size-base;
			border-radius: 10rpx;
			&:active {
				background-color: #666;
			}
		}
	}
</style>
