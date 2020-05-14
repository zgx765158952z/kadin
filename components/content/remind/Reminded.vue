<template>
	<view class="reminded set-bgc">
		<!-- #ifdef MP-WEIXIN -->
		<button @tap="toRemind('new', null)">添加定时任务</button>
		<!-- #endif -->
		<view class="reminded-list">
			<!-- 未保存的事件 -->
			<view v-if="draftRemindList.length > 0" class="nosave-reminded">
				<view class="def-type-title">草稿</view>
				<view @tap="toRemind('edit', index)" class="reminded-item" v-for="(item, index) in draftRemindList" :key='index'>
					<view @tap.stop="handleCheck('draft',index)" class="reminded-item-left center-box" :class="{'my-iconfont iconchecked': item.checked}"></view>
					<view class="reminded-item-center">
						<view class="reminded-item-center-title nosavereminded-title">
							{{ item.remindTitle }}
						</view>
						<view class="reminded-item-center-time">
							{{ item.remindTime | calcTime }}
						</view>
					</view>
				</view>
			</view>
			
			<!-- 未完成和已完成的事件 -->
			<view v-if="remindList.length>0" class="will-reminded">
				<view class="def-type-title">未完成/已完成</view>
				<view @tap="toRemind('modify', index)" class="reminded-item" v-for="(item, index) in remindList" :key='index'>
					<view @tap.stop="handleCheck('default', index)" class="reminded-item-left center-box" :class="{'my-iconfont iconchecked': item.checked}"></view>
					<view class="reminded-item-center">
						<view class="reminded-item-center-title" :class="{'completedreminded-title': item.remindStatus === 1, 'obsoletereminded-title': item.remindStatus === 2}">
							{{ item.remindTitle }}
						</view>
						<view class="reminded-item-center-time">
							{{ Number(item.remindTime) | calcTime }}
						</view>
					</view>
				</view>
			</view>
			<view @tap="queryRemind" class="def-type-title moreRemindTitle">{{ hasMoreRemind ? '点击加载更多':'没有更多数据' }}</view>
		</view>
		<view class="reminded-btm">
			<view @tap.stop="allElection" class="reminded-btm-first center-box" :class="{'my-iconfont iconchecked': calcIsAllElection}"></view>
			<view class="reminded-btm-second">已选{{ electionCount }}项</view>
			<view @tap.stop="handleDelRemind" class="reminded-btm-third">
				删除
			</view>
		</view>
		<!--  -->
		<view @tap="toRemind('new', null)" class="reminded-menu">
			<!-- <text class="iconaddremind my-iconfont"></text> -->
		</view>
		
		
	</view>
</template>

<script>
	import { calcTimeHeader } from '@/utils/utils.js'
	import { queryRemindRequest, delRemindRequest } from '@/network/remind.js'
	import { mapState } from 'vuex'
	import { formatToTimeStamp, deepClone } from '@/common/index.js'
	export default {
		data() {
			return {
				draftRemindList: [], //未保存草稿
				remindList: [], //事项提醒列表数据
				pageNum: 0,
				isAllElection: false, //是否全选
				electionCount: 0, //已选数量
				hasMoreRemind: true, //是否还有数据
				queryMoreRemindTitle: '点击加载更多', 
			}
		},
		computed: {
			...mapState(['userInfo']),
			calcIsAllElection() { 
				return this.electionCount === (this.remindList.length + this.draftRemindList.length) 
			}
		},
		filters: {
			calcTime(time) {
				return calcTimeHeader(time)
			}
		},
		methods: {
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
					this.remindList.forEach(item => {
						item.checked = false
					})
					this.draftRemindList.forEach(item => {
						item.checked = false
						this.electionCount = 0
					})
				}else {
					this.remindList.forEach(item => {
						item.checked = true
						let list = Object.assign([], this.remindList)
					})
					this.draftRemindList.forEach(item => {
						item.checked = true
						let list = Object.assign([], this.remindList)
						this.electionCount = this.draftRemindList.length + this.remindList.length
					})
				}
				this.isAllElection = !this.isAllElection
				
			},
			handleCheck(type, index) { //单选
				console.log(index)
				let list = []
				if(type === 'draft') {
					list = this.draftRemindList
				}else {
					list = this.remindList
				}
				this.$nextTick(() => {
					if(list[index].checked) {
						list[index].checked = false
						this.electionCount -= 1
					}else {
						list[index].checked = true
						this.electionCount += 1
					}
					this.$forceUpdate()
				})
			},
			
			appendData(data) { //追加数据
				// data.list.forEach(item => {
				// 	item.checked = false
				// })
				
				let list = deepClone(data.list)
				list.forEach(item => {
					// item.remindPerson = JSON.parse(item.remindPerson)
					item.remindTime = formatToTimeStamp(item.remindTime)
				})
				this.remindList.push(...list)
				
				console.log('追加后', this.remindList)
				if(!data.hasNextPage) {
					console.log('下一页没有数据了')
					this.hasMoreRemind = false
				}
				
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
	//弹性盒子
	// .will-reminded {
	// 	display: flex;
	// 	flex-flow: column-reverse nowrap;
	// }
	.reminded-item {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
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
		min-height: 100vh;
		.reminded-list {
			padding-bottom: 100rpx;
			.reminded-item {
				padding: 30rpx;
				background-color: #fff;
				
				.reminded-item-left {
					margin: 0 30rpx;
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
			.moreRemindTitle {
				text-align: center;
				
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
				margin: 0 30rpx;
			}
			.reminded-btm-second {
				flex: 1;
				font-size: 30rpx;
			}
			.reminded-btm-third {
				font-size: 30rpx;
				color: #DD524D;
			}
		}
		
		//右下角菜单
		.reminded-menu {
			position: fixed;
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
