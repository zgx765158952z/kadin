<template>
	<view class="dynamic">
		<!-- #ifdef MP-WEIXIN -->
		<button type="default" @tap="toPulish" size="mini">发布新动态</button>
		<!-- #endif -->
		<dynamic-con :imgUrl="imgUrl" ref="dynamiccon"></dynamic-con>
	</view>
</template>

<script>
	import DynamicCon from './dynamicCpns/DynamicCon'
	
	import { imgBaseUrl } from '@/common/helper.js'
	import { mapState, mapActions } from 'vuex'

	
	export default {
		components: {
			DynamicCon
		},
		data() {
			return {
				pageNum: 0, //当前获取动态页数
				executing: false, //是否处于正在获取动态
				imgUrl: ''
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			...mapActions(['getNewestDynamic']),
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
			},
			//获取朋友动态，默认单次20个数据
			getNewestDynamicList(pageNum, pageSize=6) {
				this.executing = true
				let newObj = {
					account: this.userInfo.user.userAccount,
					pageNum,
					pageSize
				}
				if(this.getNewestDynamic(newObj)) {
					this.pageNum += 1//页数加一
					this.executing = false
					console.log('pageNum:', this.pageNum)
				}
				
			},
			
			toPulish() {
				uni.navigateTo({
					url: "/components/content/publish/Publish"
				})
			}
		},
		
		//监听页面滚动
		onPageScroll(e) {
			this.hideAll()
		},
		//滚动到底部
		onReachBottom() {
			if(!this.executing) {
				console.log('滚动到底部，朋友动态第一页已展示完毕，开始请求第二页数据')
				this.getNewestDynamicList(this.pageNum)
			}
		},
		//导航栏右边发表按钮
		onNavigationBarButtonTap(options) {
			if(options.index === 0) {
				this.toPulish()
			}
		},
		onLoad() {
			console.log('dynamic-onLoad')
			uni.startPullDownRefresh() //开始下拉刷新
			this.imgUrl = imgBaseUrl
			this.$nextTick(() => {
				this.getNewestDynamicList(this.pageNum)
			})
		},
		onShow() {
			uni.hideTabBarRedDot({
				index: 1
			})
		},
		onHide() {
			this.hideAll()
		},
		onPullDownRefresh() {
			console.log('下拉刷新')
			setTimeout(function () {
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		}
	}
</script>

<style>
	.dynamic {
		background-color: #FFFFFF;
	}
</style>
