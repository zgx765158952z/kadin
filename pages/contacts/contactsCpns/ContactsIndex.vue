<template>
	<view class="contactsindex">
		<!-- <view @tap="backTop" :style="indexBgc" class="first-img">
			<image src="/static/image/global/top.png"></image>
		</view>
		<block v-for="(item, index) in letters" :key="index">
			<view class="letters-index">
				{{ item }}
			</view>
		</block> -->
		
		<view class="letters-index-item">
			<text class="my-iconfont">&#xe80e;</text>
		</view>
		<view class="letters-index-item" v-for="(item, index) in letters" :key="index">
			{{ item }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				letters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#']
			}
		},
		methods: {
			//返回顶部
			backTop() {
				this.tapIndex(-2)
			},
			tapIndex(index) {
				uni.$emit('tapIndex', {index: index})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contactsindex {
		// position: fixed;
		// right: 15rpx;
		// top: 20rpx;
		// z-index: 10000;
		// display: flex;
		// flex-flow: column nowrap;
		// font-size: $uni-font-size-sm;
		// text-align: center;
		// .first-img {
		// 	image {
		// 		width: 20rpx;
		// 		height: 25rpx;
		// 	}
		// }
		// .letters-index, .first-img {
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	margin: 1rpx 0;
		// 	padding: 2rpx;
		// 	border-radius: 100%;
		// 	width: 35rpx;
		// 	height: 30rpx;
		// }
		// .letters-index:active {
		// 	background-color: #4CD964;
		// }
		// .first-img:active {
		// 	background-color: #4CD964;
		// }
		
		
	}
	
	.contactsindex {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
	}
	
	// 右侧索引列表
	.contactsindex {
		position: fixed;
		right: 5rpx;
		top: 30rpx;
		width: 50rpx;
		font-size: 26rpx;
		color: #666;
		z-index: 199;
		.letters-index-item {
			text-align: center;
			border-radius: 12rpx;
		}
	}
	
	
</style>
