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
			
		},
		
		//监听页面滚动
		onPageScroll(e) {
			if(this.$refs.dynamiccon.isShowPraise) {
				this.$refs.dynamiccon.isShowPraise = false
			}
			if(!this.$refs.dynamiccon.hasComment) {
				return
			}
			
			
			if(this.$refs.dynamiccon.currentReplyindex !== -1) {
				console.log('currentReplyindex=-1')
				this.$refs.dynamiccon.currentReplyindex = -1
			}
			this.$refs.dynamiccon.commentContent = ''
			this.$refs.dynamiccon.hasComment = false
		},
		//滚动到底部
		onReachBottom() {
			console.log('滚动到底部，朋友动态第一页已展示完毕，开始请求第二页数据')
		},
		//导航栏右边发表按钮
		onNavigationBarButtonTap(options) {
			if(options.index === 0) {
				uni.navigateTo({
					url: "/components/content/publish/Publish"
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
