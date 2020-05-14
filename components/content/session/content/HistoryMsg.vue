<template>
	<view class="history-msg">
		<!-- 默认内容 -->
		<view v-if="!isSearch" class="type-list">
			<view class="tips">
				按类型搜索
			</view>
			<view class="type-item">
				<view @tap="searchByType(index)" :class="{'type-item-title-border': ((index+1)%3 !== 0) && ((index+1)!==typeList.length)}" v-for="(item, index) in typeList" :key="index" class="type-item-title">
					{{ item }}
				</view>
			</view>
		</view>
		
		<!-- 所有聊天记录 -->
		<view class="all-historychat">
			
		</view>
		
		<!-- 搜索关键词得到的聊天记录 -->
		<view v-if="isSearch" class="search-historychat">
			<view v-for="(item, index) in 5" :key="index" :class="{'chat-item-border': (index+1) !== 5}" class="chat-item" hover-class="tap-hover-color">
				<view class="chat-item-img">
					<image src="/static/image/test/test.jpg" mode="aspectFill"></image>
				</view>
				<view class="chat-item-info">
					<view class="chat-item-info-title">
						<view class="chat-item-info-title-name">
							名字啊
						</view>
						<view class="chat-item-info-title-time">
							3月22日
						</view>
					</view>
					<view class="chat-item-info-msg">
						通常自定义的遮罩/弹出层，都会做成组件，这样方便复用。
					</view>
				</view>
			</view>
		</view>
		
		<!-- 按类型搜索的显示内容 -->
		<view v-if="isSearch" class="search-type">
			<view class="search-type-list">
				<view class="search-type-list-time">
					这个月
				</view>
				<view v-for="(item, index) in 2" :key="index" class="search-type-item" hover-class="tap-hover-color">
					<view class="search-type-item-top">
						<image src="/static/image/test/test.jpg" mode="aspectFill"></image>
						<view class="info-name">
							名字啊
						</view>
						<view class="info-time">
							2天前
						</view>
					</view>
					<view class="search-type-item-btm">
						<image src="/static/image/test/test.jpg" mode="aspectFill"></image>
						<view class="info-item">
							<view class="info-title">
								页面中的遮罩处于显示状态时，点击返回不希望直接关闭页面，而是隐藏掉遮罩。遮罩隐藏后，继续点击返回再执行默认的逻辑。
							</view>
							<view class="info-msg">
								通常自定义的遮罩/弹出层，都会做成组件，这样方便复用。
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: ['日期', '图片及视频', '文件', '链接', '音乐', '交易'],
				//存储当前页面实例
				webView: null,
				//显示搜索内容
				isSearch: false
			}
		},
		mounted() {
			// #ifdef APP-PLUS
			//获取当前页面实例
			this.webView = this.$mp.page.$getAppWebview()
			// #endif
			
		},
		methods: {
			//按类型搜索
			searchByType(index) {
				//#ifdef APP-PLUS
				this.setSearchStyle(this.typeList[index], true)
				//#endif
				
				this.isSearch = true
			},
			
			// #ifdef APP-PLUS
			//按照类型搜索后的导航栏搜索框的样式
			setSearchStyle(text, disabled) {
				//修改导航栏搜索的内容
				this.webView.setTitleNViewSearchInputText(text)
				//获取导航栏样式
				let searchInput = JSON.parse(JSON.stringify(this.webView.getStyle().titleNView.searchInput))
				//预修改搜索框样式
				searchInput = {
					"disabled": disabled
				}
				//修改当前页面搜索框样式
				this.webView.setStyle({
					titleNView: {
						searchInput: searchInput
					}
				})
			},
			// #endif
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				//搜索模式时：点击取消按钮结束当前搜索
				if(this.isSearch) {
					this.setSearchStyle('', false)
					this.isSearch = false
				}else {
					
				//非搜索模式时：点击取消返回上一页
					uni.navigateBack()
				}
				
			}
		},
		onBackPress(e) {
			if(e.from === 'navigateBack') {
				//返回
				return false
			}
			if(e.from === 'backbutton') {
				if(this.isSearch) {
					this.isSearch = false
					console.log('取消搜索模式')
				}else {
					console.log('不是搜索模式')
					uni.navigateBack()
				}
			}
			return true
			
		}
	}
</script>

<style scoped lang="scss">
	//弹性盒子
	.type-item {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		align-content: center;
	}
	.search-type-item-top {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}
	
	
	
	.history-msg {
		min-height: 100vh;
		height: 100%;
		background-color: #F7F7F7;
		
		.type-list {
			margin: 0 auto;
			padding-top: 80rpx;
			box-sizing: border-box;
			width: 80%;
			font-size: $uni-font-size-lg;
			text-align: center;
			.tips {
				color: $uni-text-color-grey;
			}
			.type-item {
				margin: 20rpx 0;
				.type-item-title {
					width: 33%;
					text-align: center;
					margin: 20rpx 0;
					color: #0077AA;
					&:active {
						color: #969896;
					}
				}
				//右分割线
				.type-item-title-border {
					position: relative;
					&::after {
						content: '';
						position: absolute;
						right: 0;
						top: 0;
						height: 100%;
						width: 1rpx;
						background-color: rgba(100, 100, 100, .2);
					}
				}
			}
		}
		
		
		// 搜索关键词得到的聊天记录
		.search-historychat {
			.chat-item {
				position: relative;
				display: flex;
				background-color: #fff;
				padding: 20rpx 30rpx;
				padding: 20rpx 30rpx 10rpx 30rpx;
				box-sizing: border-box;
				.chat-item-img {
					width: auto;
					margin-right: 20rpx;
					image {
						width: 90rpx;
						height: 90rpx;
						border-radius: 8rpx;
					}
				}
				
				.chat-item-info {
					flex: 1;
					.chat-item-info-title {
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						align-content: center;
						.chat-item-info-title-name {
							flex: 1;
							font-size: $uni-font-size-lg;
						}
						.chat-item-info-title-time {
							width: auto;
							font-size: $uni-font-size-sm;
							color: #B2B2B2;
						}
					}
					.chat-item-info-msg {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						line-clamp: 1;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						
						font-size: $uni-font-size-base;
						color: #B2B2B2;
					}
				}
				
				
				
			}
			
			.chat-item-border {
				&::after {
					content: '';
					position: absolute;
					right: 0;
					bottom: 0;
					left: 140rpx;
					height: 1rpx;
					background-color: rgba(100, 100, 100, .1);
				}
			}
		}
		
		//按类型搜索的内容
		.search-type {
			.search-type-list {
				.search-type-list-time {
					font-size: $uni-font-size-base;
					color: #666;
					margin-left: 20rpx;
				}
				.search-type-item {
					background-color: #fff;
					padding: 30rpx;
					margin-bottom: 10rpx;
					box-sizing: border-box;
					.search-type-item-top {
						image {
							width: 50rpx;
							height: 50rpx;
							border-radius: 8rpx;
						}
						.info-name {
							flex: 1;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-left: 20rpx;
							font-size: 34rpx;
							color: #666;
						}
						.info-time {
							width: auto;
							font-size: 22rpx;
							color: #B2B2B2;
						}
					}
					.search-type-item-btm {
						display: flex;
						margin-top: 30rpx;
						image {
							margin-right: 20rpx;
							width: 90rpx;
							height: 90rpx;
						}
						
						.info-item {
							flex: 1;
							.info-title {
								font-size: 36rpx;
								line-height: 42rpx;
								letter-spacing: 1rpx;
							}
							.info-msg {
								font-size: $uni-font-size-base;
								line-height: 30rpx;
								color: #B2B2B2;
							}
						}
						
					}
				}
			}
		}
	}
</style>
