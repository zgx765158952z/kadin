<template>
	<view class="def-popup">
		<view @tap="hidePop" v-if="showPop" class="def-popup-mask">
			<block v-if="popList && showPopList">
				<view class="def-popup-list" :style="popStyle">
					<view v-for="(item, index) in popList" :key="index" class="def-popup-item" hover-class="tap-hover-color">
						{{ item }}
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			//弹窗的显示、隐藏
			showPop: {
				type: Boolean,
				default() {
					return true
				}
			},
			//弹窗显示与隐藏
			showPopList: {
				type: Boolean,
				default() {
					return false
				}
			},
			//弹窗标题列表
			popList: {
				type: Array,
				default() {
					return []
				}
			},
			//弹窗定位样式
			popStyle: {
				type: String,
				default() {
					return ''
				}
			}
		},
		methods: {
			//隐藏遮罩和弹窗
			hidePop() {
				// this.showPop = false
				// this.showPopList = false
			}
		}
	}
</script>

<style lang="scss">
	.def-popup {
		/*遮罩*/
		.def-popup-mask {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 100;
			
			
			/*列表*/
			.def-popup-list {
				position: fixed;
				z-index: 101;
				max-width: 500rpx;
				color: #333;
				text-align: left;
				font-size: $uni-font-size-lg;
				box-sizing: border-box;
				background-color: #FFFFFF;
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.5);
				line-height: 100rpx;
				transtion: tranform 0.15s ease-in-out 0s;
				transform: scale(0, 0);
				.def-popup-item {
					padding: 0 40rpx 0 30rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		
	}
</style>
