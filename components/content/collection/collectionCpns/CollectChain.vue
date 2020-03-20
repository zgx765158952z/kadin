<template>
	<view class="collect-chain">
		<view class="status_bar">
		  <!-- 这里是状态栏 -->
		</view>
		<view class="webview-nav-bar">
			<view @tap="backPage()" class="webview-nav-bar-left">
				<text class="my-iconfont webview-nav-bar-left-icon">&#xe621;</text>
			</view>
			<view class="webview-nav-bar-center">
				标题
			</view>
			<view @tap="moreMenu()" class="webview-nav-bar-right">
				<text class="my-iconfont webview-nav-bar-right-icon">&#xe625;</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewInfo: null,
				wv: null
			}
		},
		methods: {
			//返回上一页
			backPage() {
				uni.navigateBack()
			},
			//更多菜单
			moreMenu() {
				uni.showActionSheet({
					itemList: ['保存文件', '取消'],
					success: res => {
						switch(res.tapIndex) {
							case 0:
								console.log('已保存')
								break
							case 1:
								console.log('取消')
								break
						}
					}
				})
			}
		},
		onLoad(option) {
			this.webviewInfo = option
			//窗口url
			const url = this.webviewInfo.link
			//窗口名字
			const name = this.webviewInfo.name
			
			
			// #ifdef APP-PLUS
			//创建新窗口
			this.wv = plus.webview.create(url, name, {
				plusrequire: 'none',//禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
				'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
				top: uni.getSystemInfoSync().statusBarHeight+44  ,//放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
				bottom: '0',
				left: '0',
				right: '0',
				//设置web-view组件可双指缩放
				scalable: true
			})
			let currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			currentWebview.append(this.wv)  //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			setTimeout(() => {
				this.wv.show()
				console.log('获取窗口样式：', this.wv.getStyle())
			}, 1000)//如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
			
			// #endif
		}
	}
</script>

<style lang="scss">
	.collect-chain {
		height: 100%;
		width: 100%;
		.webview-nav-bar {
			position: fixed;
			height: 88rpx;
			width: 100%;
			display: flex;
			align-items: center;
			overflow: hidden;
			.webview-nav-bar-left {
				width: auto;
				margin-left: 20rpx;
				.webview-nav-bar-left-icon {
					// font-size: 42rpx;
				}
			}
			.webview-nav-bar-center {
				flex: 1;
				font-size: $uni-font-size-lg;
				text-align: center;
			}
			.webview-nav-bar-right {
				width: auto;
				margin-right: 20rpx;
				.webview-nav-bar-right-icon {
					// font-size: 42rpx;
				}
			}
		}
	}
</style>
