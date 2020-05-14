<template>
	<view class="dynamic">
		<dynamic-con ref="dynamiccon"></dynamic-con>
	</view>
</template>

<script>
	import DynamicCon from './dynamicCpns/DynamicCon'
	
	

	
	export default {
		components: {
			DynamicCon
		},
		data() {
			return {
			}
		},
		methods: {
			//清除所有正在操作的动作,即还原为原始状态
			hideAll() {
				if(this.$refs.dynamiccon.isShowPraise) {
					this.$refs.dynamiccon.isShowPraise = false
				}
				if(this.$refs.dynamiccon.hasComment) {
					this.$refs.dynamiccon.commentContent = ''
					this.$refs.dynamiccon.hasComment = false
				}
				if(this.$refs.dynamiccon.currentReplyindex !== -1) {
					this.$refs.dynamiccon.currentReplyindex = -1
				}
				return
			}
		},
		
		//监听页面滚动
		onPageScroll(e) {
			this.hideAll()
		},
		//滚动到底部
		onReachBottom() {
			console.log('滚动到底部，朋友动态第一页已展示完毕，开始请求第二页数据')
		},
		//导航栏右边发表按钮
		onNavigationBarButtonTap(options) {
			if(options.index === 0) {
				uni.navigateTo({
					url: "/components/content/publish/Publish",
					success: res => {
						this.hideAll()
					}
				})
			}
		}
	}
</script>

<style>
	.dynamic {
		background-color: #FFFFFF;
	}
</style>
