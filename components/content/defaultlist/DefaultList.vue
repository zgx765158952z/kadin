<template>
	<view class="defaultlist" :class="{'defaultlist-martop': marTop}">
		<view hover-class="tap-hover-color">
			<view class="def-list" :class="{'def-list-no-border': noBorderBtm}">
				<view class="def-list-left">
					<slot name="def-list-left"></slot>
				</view>
				<view class="def-list-center" :class="{'alignRight': textRight}">
					<slot name="def-list-center">
					</slot>
					<slot name="def-list-content" v-if="hasContent">
					</slot>
				</view>
				<view class="def-list-right">
					<text v-if="myRight" class="my-iconfont" >&#xe683;</text>
					<slot v-else name="def-list-right"></slot>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			myRight: { //是否自定义右边图标
				type: Boolean,
				default: true
			},
			noBorderBtm: { //是否有下边框
				type: Boolean,
				default: false
			},
			marTop: { //是否有上边距
				type: Boolean,
				default: false
			},
			textRight: { //中间文本是否右对齐
				type: Boolean,
				default: false
			},
			hasContent: { //是否显示内容
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.defaultlist {
		background-color: #FFFFFF;
		
		.def-list {
			display: flex;
			align-items: center;
			flex-flow: row nowrap;
			
			padding: 30rpx 30rpx 30rpx 0;
			box-sizing: border-box;
			margin-left: 30rpx;
			font-size: $uni-font-size-lg;
			border-bottom: 1rpx solid rgba(100, 100, 100, .1);
			.def-list-left {
				width: auto;
			}
			.def-list-center {
				flex: 1;
				margin: 0 10rpx 0 30rpx;
				color: #989898;
			}
			.alignRight {
				text-align: right;
			}
			
			.def-list-right {
				// display: flex;
				// justify-content: center;
				// align-items: center;
				// margin-left: 6rpx;
				width: auto;
				.my-iconfont {
					font-size: $uni-font-size-lg;
					color: #989898;
					font-weight: 900;
				}
			}
			
		}
		.def-list-no-border {
			border: none!important;
		}
		
	}
	
	.defaultlist-martop {
		margin-top: 30rpx;
	}
</style>
