<template>
	<view class="def-modify">
		<!-- 管理员可编辑 -->
		<view v-if="!chatAdmin" class="def-modify-input">
			<textarea focus auto-height value="" placeholder="我的群名片" />
		</view>
		
		
		
		<!-- 非管理员仅预览 -->
		<block v-if="chatAdmin">
			
			
			
			<view class="def-modify-text">
				
				<view class="def-modify-text-head">
					<image src="/static/image/test/test.jpg" mode="aspectFill"></image>
					<view class="def-modify-text-head-right">
						<view class="modify-name">
							徐培文
						</view>
						<view class="modify-time">
							2020-03-17 15:03
						</view>
					</view>
				</view>
				
				<view class="def-modify-text-content">
					<text selectable>
						在线征婚：
							1、女的
							2、活的
					</text>
				</view>
				
				<view class="def-modify-text-tips">
					只有群主及管理员可以编辑
				</view>
			</view>
			
		</block>
		
	</view>
</template>

<script>
	
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	
	export default {
		components: {
			DefaultList
		},
		data() {
			return {
				chatAdmin: true,
				modifyObj: {}
			}
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				uni.navigateBack()
			}
		},
		created() {
			
		},
		onLoad(option) {
			
			
			console.log(option.modifyObj)
			if(option.modifyObj) {
				switch (option.modifyObj.type) {
					//修改我的群名片
					case 'myGroupCard':
						this.modifyObj = option.modifyObj
						break;
					default:
						break
				}
			}
			
			// #ifdef APP-PLUS
			
			// 修改导航栏标题
			uni.setNavigationBarTitle({
				title: '群公告'
			})
			
			
			/*  	管理员模式   	*/
			
			
			/*     非管理员模式: 去除 导航栏保存按钮      */
			
			
			if(!this.chatAdmin) {
				let webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewButtonStyle(0, {
					width: '0px'
				})
				
			}
			
			
			
			
			// #endif
			
		}
	}
</script>

<style scoped lang="scss">
	.def-modify {
		min-height: 100vh;
		height: 100%;
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
		
		
		
		
		.def-modify-text {
			padding: 30rpx;
			box-sizing: border-box;
			.def-modify-text-head {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				align-content: center;
				padding-bottom: 20rpx;
				box-sizing: border-box;
				image {
					width: 90rpx;
					height: 90rpx;
					border-radius: 12rpx;
				}
				.def-modify-text-head-right {
					flex: 1;
					margin-left: 20rpx;
					.modify-name {
						font-size: $uni-font-size-lg;
					}
					.modify-time {
						font-size: $uni-font-size-base;
						color: #666666;
					}
				}
				
				&::after {
					content: '';
					position: absolute;
					left: 0;
					bottom: -1rpx;
					width: 100%;
					height: 1rpx;
					background-color: rgba(100, 100, 100, .2);
				}
			}
			
			.def-modify-text-content {
				margin: 30rpx 0;
				font-size: $uni-font-size-lg;
				line-height: 40rpx;
			}
			
			.def-modify-text-tips {
				position: fixed;
				bottom: 150rpx;
				left: 0;
				right: 0;
				text-align: center;
				font-size: $uni-font-size-base;
				color: #666;
				&::before, &::after {
					content: "";
					position: absolute;
					top: 50%;
					width: 15%;
					height: 1rpx;
					z-index: 1;
					background-color: rgba(100, 100, 100, .3);
				}
				
				&::before {
					left: 70rpx;
				}
				
				&::after {
					right: 70rpx;
				}
			}
			
		}
	}
</style>
