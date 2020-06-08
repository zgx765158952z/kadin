<template>
	<view class="def-slide" v-if="showMask">
		<!-- 遮罩层 -->
		<view v-if="showMask" @tap.stop="hide" class="def-slide-mask"></view>
		
		<!-- 弹出层 -->
		<view class="def-slide-popup" :class="showPopup?'translationLeft':'translationRight' ">
			<slot name="def-slide-popup"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showMask: false, //显示遮罩层
				showPopup: false, //显示弹出层
			}
		},
		methods: {
			//显示
			show() {
				this.showMask = true
				this.showPopup = true
			},
			//隐藏
			hide() {
				this.showPopup = false
				setTimeout(() => {
					this.showMask = false
				}, 800)
			}
			
		}
	}
</script>

<style lang="scss">
	// @keyframes showTranslationLeft {
	// 	0% {
	// 		transform: translateX(100%);
	// 	}
		
	// 	100% {
	// 		transform: translateX(0%);
	// 	}
	// }
	
	// @keyframes hideTranslationLeft {
	// 	0% {
	// 		transform: translateX(0);
	// 	}
	// 	100% {
	// 		transform: translateX(100%);
	// 	}
	// }
	
	// .translationLeft {
	// 	//动画名字
	// 	-webkit-animation-name: showTranslationLeft;
	// 	//持续时间
	// 	-webkit-animation-duration: 1s;
	// 	//动画次数
	// 	-webkit-animation-iteration-count: 1;
	// 	//动画延迟时间
	// 	-webkit-animation-delay: 0s;
	// }
	
	// .translationRight {
	// 	//动画名字
	// 	-webkit-animation-name: hideTranslationLeft;
	// 	//持续时间
	// 	-webkit-animation-duration: 1s;
	// 	//动画次数
	// 	-webkit-animation-iteration-count: 1;
	// 	//动画延迟时间
	// 	-webkit-animation-delay: -.25s;
	// }
	
	.def-slide {
		position: fixed;
		z-index: 999;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		.def-slide-mask {
			width: 100%;
			height: 100%;
		}
	}
</style>
