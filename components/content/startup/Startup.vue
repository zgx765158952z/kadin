<template>
	<view class="startup">
		
		<view class="status_bar">
		  <!-- 这里是状态栏 -->
		</view>
		<view class="startup-content">
			<view @tap="stopCounter" class="handlerStart">
				跳过<block v-if="counter > 0">(<text>{{ counter }}</text>)</block>
			</view>
		</view>
		<view class="startup-animation">启动页动画展示</view>
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
		.startup-content {
			display: flex;
			align-items: center;
			position: relative;
			.handlerStart {
				position: absolute;
				right: 10rpx;
				top: 0;
			}
			.startup-animation {
				
			}
		}
	}
</style>
