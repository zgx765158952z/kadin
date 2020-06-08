<template>
	<view class="reminded set-bgc" @touchstart="handleStart" @touchend="handleEnd">
		<!-- #ifdef MP-WEIXIN -->
		<button @tap="toRemind('new', null)">添加定时任务</button>
		<!-- #endif -->
		<view class="reminded-list">
			<!-- 未保存的事件 -->
			<view v-if="draftRemindList.length > 0" class="nosave-reminded">
				<view class="def-type-title">草稿</view>
				<view @tap="toRemind('edit', item)" class="reminded-item" v-for="(item, index) in draftRemindList" :key='index'>
					<view class="reminded-item-center">
						<view class="reminded-item-center-title nosavereminded-title">
							{{ item.remindTitle }}
						</view>
						<view class="reminded-item-center-time">
							{{ item.remindTime }}
						</view>
					</view>
					<view @tap.stop="handleCheck('draft',index)" class="reminded-item-right center-box" :class="{'my-iconfont iconchecked': item.checked}"></view>
				</view>
			</view>
			
			<!-- 未完成和已完成的事件 -->
			<view v-if="remindList.length>0" class="will-reminded">
				<view class="def-type-title">未完成/已完成</view>
				<view v-for="(item, index) in remindList" :key='index'>
					<view class="reminded-item def-top-border">
						<view @tap.stop="changeExpanded(item)" class="reminded-item-left-icon my-iconfont">{{ item.expanded ? '&#xe6b2;' : '&#xe683;' }}</view>
						<view @tap="toRemind('modify', index)" class="reminded-item-center">
							<view class="reminded-item-center-title" :class="{'completedreminded-title': item.remindStatus === 1, 'obsoletereminded-title': item.remindStatus === 2}">
								{{ item.remindTitle }}
							</view>
							<view class="reminded-item-center-time">
								{{ item.remindTime | calcTime }}
							</view>
						</view>
						<view @tap.stop="handleCheck('default', item)" class="reminded-item-right center-box" :class="{'my-iconfont iconchecked': item.checked}"></view>
					</view>
					<view :class="item.expanded?'expandDown':'zoomUp' ">
						<view class="reminded-item reminded-item-son" v-for="(item1, index1) in 3" :key="index1">
							<view class="reminded-item-center">
								<view class="reminded-item-center-title" :class="{'completedreminded-title': item.remindStatus === 1, 'obsoletereminded-title': item.remindStatus === 2}">
									子任务{{ index1+1 }}
								</view>
								<view class="reminded-item-center-time">
									{{ 1589792700000 | calcTime }}
								</view>
							</view>
							<view @tap.stop="handleCheck('default', item)" class="reminded-item-right center-box" :class="{'my-iconfont iconchecked': item.checked}"></view>
						</view>
					</view>
				</view>
			</view>
			<view @tap="queryRemind" class="def-type-title moreRemindTitle">{{ hasMoreRemind ? '点击加载更多':'没有更多数据' }}</view>
		</view>
		<def-slide ref="defSlide">
			<view slot="def-slide-popup" class="remined-catecory def-center-box">
				<view @tap.stop="hideCategory" class="remined-catecory-left my-iconfont">&#xe683;</view>
				<view class="remined-catecory-right def-center-box">
					<view @click.stop="handleCategory(index)" v-for="(item, index) in categoryList" :key='index'>
						<view class="remined-catecory-right-icon def-center-box my-iconfont">&#xe80c;</view>
						<view class="remined-catecory-right-title">{{ item }}</view>
					</view>
				</view>
			</view>
		</def-slide>
		
		
		
		<view class="reminded-btm">
			<view @tap.stop="handleDelRemind" class="reminded-btm-first">
				删除
			</view>
			<view class="reminded-btm-second">已选{{ electionCount }}项</view>
			<view @tap.stop="allElection" class="reminded-btm-third center-box" :class="{'my-iconfont iconchecked': calcIsAllElection}"></view>
		</view>
		<!--  -->
		<!-- <view @tap="toRemind('new', null)" class="reminded-menu">
			<text class="iconaddremind my-iconfont"></text>
		</view> -->
		
		
	</view>
</template>

<script>
	import { calcTimeHeader } from '@/utils/utils.js'
	import { queryRemindRequest, delRemindRequest } from '@/network/remind.js'
	import { mapState } from 'vuex'
	import { formatToTimeStamp, deepClone } from '@/common/index.js'
	import DefSlide from '@/components/content/defslide/DefSlide.vue'
	
	export default {
		components: {
			DefSlide
		},
		data() {
			return {
				draftRemindList: [], //未保存草稿
				remindList: [], //事项提醒列表数据
				pageNum: 0,
				isAllElection: false, //是否全选
				electionCount: 0, //已选数量
				hasMoreRemind: true, //是否还有数据
				queryMoreRemindTitle: '点击加载更多', 
				categoryList: ['个人', '团队', '组织', '公司', '自定义'], //类别列表
				touchStartData: {}, //触摸页面开始的节点信息
				isCategoryMode: false, //开启分类模式
			}
		},
		computed: {
			...mapState(['userInfo']),
			calcIsAllElection() { 
				return this.electionCount && this.electionCount === (this.remindList.length + this.draftRemindList.length) 
			},
			
		},
		filters: {
			calcTime(time){
				return calcTimeHeader(time)
			}
		},
		methods: {
			hideCategory() {
				this.isCategoryMode = false
				this.$refs.defSlide.hide()
			},
			showCategory() {
				this.$refs.defSlide.show()
			},
			handleCategory(index) {
				console.log('点击的index', index)
			},
			handleStart(e) {
				if(this.$refs.defSlide.showMask) {
					this.hideCategory()
				}
				console.log('handleStart')
				if(e.changedTouches[0].clientX > 365) { //在屏幕最右边边缘滑动无效
					return
				}
				this.touchStartData.clientX = e.changedTouches[0].clientX;	 
				this.touchStartData.clientY = e.changedTouches[0].clientY;
			},
			handleEnd(e) {
				const subX = this.touchStartData.clientX - e.changedTouches[0].clientX
				const subY = Math.abs(e.changedTouches[0].clientY - this.touchStartData.clientY)
				if(subY < 50 && subX > 50) {
					
					console.log('左滑', subX, subY)
					this.isCategoryMode = true
					this.showCategory()
				}
			},
			//查询所有定时任务
			queryRemind() {
				if(this.hasMoreRemind) {
					let account = this.userInfo.user.userAccount
					this.pageNum += 1
					queryRemindRequest(account, this.pageNum, 20).then(res => {
						if(res.data.code === 2000) {
							this.appendData(res.data.data)
						}
					})
				}
			},
			
			//删除定时任务
			delRemind(obj) {
				delRemindRequest(obj).then(res => {
					if(res.data.code === 2000) {
						this.queryRemind()
						uni.showToast({
							title: '已删除所选任务',
							icon: 'none'
						})
					}
				})
			},
			
			//点击批量删除
			handleDelRemind(e) {
				uni.showModal({
					title: '提示',
					content: '确定删除所选任务?',
					success: res => {
						if(res.confirm) {
							//删除草稿列表
							this.draftRemindList.forEach((item, index) => {
								if(item.checked) {
									this.draftRemindList.splice(index, 1)
								}
							})
							uni.setStorageSync(`draftRemindList_${this.userInfo.user.userAccount}`, this.draftRemindList)
							//删除提醒列表
							let obj = {
								account: this.userInfo.user.userAccount,
								ids: this.getSelected()
							}
							this.delRemind(obj)
							console.log('删除后:', this.draftRemindList, this.remindList)
						}
					}
				})
				
			},
			getSelected() { //获取已选的id集合
				let idList = []
				this.remindList.map(item => {
					if(item.checked) {
						idList.push(item.id)
					}
				})
				return idList
			},
			//全选、全不选
			allElection() {
				if(this.isAllElection) {
					for(let i=0; i<this.draftRemindList.length; i++) {
						this.draftRemindList[i].checked = false
					}
					for(let i=0; i<this.remindList.length; i++) {
						this.remindList[i].checked = false
					}
					this.electionCount = 0
				}else {
					for(let i=0; i<this.draftRemindList.length; i++) {
						this.draftRemindList[i].checked = true
					}
					for(let i=0; i<this.remindList.length; i++) {
						this.remindList[i].checked = true
					}
					this.electionCount = this.draftRemindList.length + this.remindList.length
				}
				this.isAllElection = !this.isAllElection
			},
			handleCheck(type, item) { //单选
				this.$nextTick(() => {
					if(item.checked) {
						item.checked = false
						this.electionCount -= 1
					}else {
						item.checked = true
						this.electionCount += 1
					}
				})
			},
			
			changeExpanded(item) { //展开或闭合子任务
				console.log('item:', item)
				item.expanded = !item.expanded
			},
			
			appendData(data) { //追加数据
				let list = []
				list = deepClone(data.list)
				for(let i=0; i<list.length; i++) {
					list[i].remindTime = formatToTimeStamp(list[i].remindTime)
					list[i].expanded = false  //默认未展开
				}
				this.$nextTick(() => {
					this.remindList.push(...list)
					console.log('追加后', this.remindList)
					if(!data.hasNextPage) {
						console.log('下一页没有数据了')
						this.hasMoreRemind = false
					}
				})
				
				
				
				
			},
			
			//从存储里获取草稿
			getDraftRemindList() {
				uni.getStorage({
					key: `draftRemindList_${this.userInfo.user.userAccount}`,
					complete: res => {
						console.log('res', res)
						if(res.data) {
							this.draftRemindList = res.data
							this.draftRemindList.forEach(item => {
								item.checked = false
							})
							console.log('草稿:', this.draftRemindList)
						}
					}
				})
			},
			
			toRemind(type, index) {
				console.log('type、index', type, index)
				let url = `/components/content/remind/Remind?type=${type}&index=${index}`
				if(type === 'new') {
					
				}else if(type === 'edit') { //编辑草稿
					uni.setStorageSync('editRemind', this.draftRemindList[index])
				}else { //修改任务
					uni.setStorageSync('modifyRemind', this.remindList[index])
				}
				console.log('url', url)
				uni.navigateTo({
					url
				})
			}
		},
		onLoad() {
			this.queryRemind()
			this.getDraftRemindList()
		},
		onShow() {
			uni.$once('addRemind', (firstData) => {
				 //添加了数据
				 console.log('添加了新数据:', firstData)
				 this.$nextTick(() => {
				 	this.remindList.splice(0, 0, firstData)
				 	console.log('this.remindList:', this.remindList)
				 })
			})
			uni.$once('modifyRemindList', (data) => {
				console.log('修改提醒', data)
				this.remindList.splice(data.index, 1)
				this.remindList.splice(0, 0, data.info)
			})
			uni.$once('updateDraftRemindList', () => {
				this.getDraftRemindList()
			})
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				this.toRemind('new', null)
			}
		}
	}
</script>

<style lang="scss">
	@keyframes showTranslationLeft {
		
		0% {
			transform: translateX(100%);
			// right: -200rpx;
		}
		100% {
			transform: translateX(0);
			// right: 0;
		}
	}
	
	@keyframes hideTranslationLeft {
		0% {
			transform: translateX(0);
			right: 0;
		}
		100% {
			transform: translateX(100%);
			right: -200rpx;
		}
	}
	.translationLeft {
		//动画名字
		-webkit-animation-name: showTranslationLeft;
		//持续时间
		-webkit-animation-duration: 1s;
		//动画次数
		-webkit-animation-iteration-count: 1;
		//动画延迟时间
		-webkit-animation-delay: 0s;
		
		position: fixed;
		right: 0;
		top: 20%;
		z-index: 99;
	}
	
	.translationRight {
		//动画名字
		-webkit-animation-name: hideTranslationLeft;
		//持续时间
		-webkit-animation-duration: 1s;
		//动画次数
		-webkit-animation-iteration-count: 1;
		//动画延迟时间
		-webkit-animation-delay: 0s;
		
		position: fixed;
		right: -200rpx;
		top: 20%;
		z-index: 99;
	}
	
	//弹性盒子
	.reminded-item {
		display: flex;
		flex-flow: row nowrap;
	}
	.reminded-btm {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}
	
	
	.center-box {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		border: 1rpx solid rgba(100, 100, 100, .1);
	}
	
	.index-list-active {
		background-color: #F3F3F3 !important;
	}
	
	.iconchecked {
		font-size: 30rpx;
		color: #fff;
		background-color: #4CD964;
	}
	.reminded {
		position: relative;
		min-height: 100vh;
		.reminded-list {
			margin-bottom: 100rpx;
			background-color: #fff;
			.reminded-item {
				position: relative;
				padding: 30rpx;
				
				.reminded-item-right {
					margin: 0 30rpx;
					align-self: center;
				}
				.reminded-item-left-icon {
					font-size: 25rpx;
					margin: 10rpx 12rpx 0 0;
					width: 25rpx;
				}
				.reminded-item-left-icon-active {
					color: #007AFF;
					-webkit-transform: rotate(90deg);
				}
				.reminded-item-center {
					flex: 1;
					.reminded-item-center-title {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						font-size: 30rpx;
					}
					.nosavereminded-title {
						color: #007AFF;
					}
					//已完成的标题颜色
					.completedreminded-title {
						color: #999999;
					}
					//未完成的标题颜色
					.willreminded-title {
						
					}
					//已过时的标题颜色
					.obsoletereminded-title {
						color: #BD2C00;
					}
					.reminded-item-center-time {
						font-size: 22rpx;
						color: #999999;
					}
				}
				&:active {
					background-color: #F3F3F3;
				}
			}
			.reminded-item-son {
				padding: 30rpx 30rpx 30rpx 100rpx !important;
			}
			.moreRemindTitle {
				text-align: center;
				
			}
		}
		.remined-catecory {
			flex-flow: row nowrap;
			padding: 30rpx 5rpx;
			border-top-left-radius: 12rpx;
			border-bottom-left-radius: 12rpx;
			background-color: rgba(150, 150, 150, .2);
			.remined-catecory-left {
				
			}
			
			.remined-catecory-right {
				flex-flow: column nowrap;
				&>view {
					margin: 10rpx 0;
					&:active {
						background-color: #eee;
					}
					.remined-catecory-right-icon {
						font-size: 50rpx;
						color: #FFD320;
					}
					.remined-catecory-right-title {
						font-size: 32rpx;
					}
				}
				
			}
		}
		
		.reminded-btm {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100rpx;
			padding: 30rpx;
			box-sizing: border-box;
			box-shadow: 0 -3rpx 3rpx $uni-text-color-disable;
			background-color: #f3f3f3;
			z-index: 1;
			.reminded-btm-first {
				font-size: 30rpx;
				color: #DD524D;
			}
			.reminded-btm-second {
				flex: 1;
				text-align: right;
				font-size: 30rpx;
			}
			.reminded-btm-third {
				margin: 0 30rpx;
			}
		}
		
		//右下角菜单
		.reminded-menu {
			position: fixed;
			z-index: 1;
			right: -50rpx;
			bottom: -50rpx;
			width: 0;
			height: 0;
			border: 50rpx solid transparent;
			border-left-color: #F0AD4E;
			transform: rotate(45deg);
			.iconaddremind {
				position: absolute;
				font-size: 30rpx;
				left: -45rpx;
				top: 50%;
				margin-top: -15rpx;
				color: #fff;
				transform: rotate(45deg);
			}
		}
		.reminded-menu:active {
			border-left-color: #969896;
		}
	}
</style>
