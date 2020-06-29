<template>
	<view class="dynamic">
		<!-- #ifdef MP-WEIXIN -->
		<button type="default" @tap="toPulish" size="mini">发布新动态</button>
		<!-- #endif -->
		<dynamic-con :imgUrl="imgUrl" ref="dynamiccon"></dynamic-con>
		<view v-if="false" class="dynamicbtm-tips def-center-box">
			正在加载中...
		</view>
	</view>
</template>

<script>
	import DynamicCon from './dynamicCpns/DynamicCon'
	
	import { imgBaseUrl } from '@/common/helper.js'
	import { mapState, mapMutations, mapActions } from 'vuex'

	let globalData = getApp().globalData
	export default {
		components: {
			DynamicCon
		},
		data() {
			return {
				pageNum: 1, //当前获取动态页数
				imgUrl: '',
				hasData: true, //后面是否还有数据
			}
		},
		computed: {
			...mapState(['userInfo', 'newFriendDynamic', 'friendDynamicList']),
			
		},
		watch: {
			
		},
		methods: {
			...mapMutations(['clearFriendDynamicList']),
			...mapActions(['getNewestDynamic']),
			//清除所有正在操作的动作,即还原为原始状态
			hideAction() {
				this.$refs.dynamiccon.hideAll()
			},
			//获取朋友动态，默认单次20个数据
			getNewestDynamicList(pageNum, pageSize=4) {
				let newObj = {
					account: this.userInfo.user.userAccount,
					pageNum,
					pageSize
				}
				if(globalData.moreFriendDynamicList) {
					this.getNewestDynamic(newObj)
					this.pageNum += 1//页数加一
					console.log('pageNum:', this.pageNum)
				}
			},
			
			//清除并重新获取所有动态
			refreshGetData() {
				setTimeout(() => {
					this.clearFriendDynamicList()
				}, 1000)
				this.hasData = true
				globalData.moreFriendDynamicList = true
				this.pageNum = 1
				this.getNewestDynamicList(this.pageNum)
			},
			toPulish() {
				uni.navigateTo({
					url: "/components/content/publish/Publish"
				})
			}
		},
		
		//滚动到底部
		onReachBottom() {
			console.log('滚动到底部，朋友动态第一页已展示完毕，开始请求第二页数据', globalData.moreFriendDynamicList)
			this.getNewestDynamicList(this.pageNum)
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
			
		},
		onShow() {
			uni.hideTabBarRedDot({
				index: 1
			})
		},
		onHide() {
			this.hideAction()
		},
		onPullDownRefresh() {
			console.log('下拉刷新')
			this.refreshGetData()
			setTimeout(() => {
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 10000)
		}
	}
</script>

<style lang="scss" scoped>
	.dynamic {
		background-color: #FFFFFF;
		font-family: "黑体","_sans",Arial; 
		.dynamicbtm-tips {
			margin: 20rpx 0 25rpx 0;
			font-size: 30rpx;
			color: #969896;
		}
	}
</style>
