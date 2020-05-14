<template>
	<view class="add-groupmember">
		<scroll-view class="scrollList" :scroll-into-view="currentLetter" scroll-y :style="scrollStyle">
			<view v-for="(item1, index1) in list" :key="index1" id="top">
				<view v-if="item1.list.length>0" class="choose-list" :id="item1.letters">
					<view class="choose-letter">
						{{ item1.letters }}
					</view>
					<view class="choose-item" @tap="chooseItem(item2)" v-for="(item2, index2) in item1.list" :key="index2">
						<block v-if="chooseFriendType === 'addGroupMember'">
							<view class="choose-item-icon">
								<view v-if="groupMemberMap[currentGroup.tid][item2.friendAccount]" class="my-iconfont icon-not-check">&#xe612;</view>
								<view v-else-if="item2.checked" class="my-iconfont">&#xe612;</view>
							</view>
							<view class="choose-item-img">
								<image :src="item2.friendFaceImage ? imgUrl + item2.friendFaceImage: '/static/image/global/boyHeadImg.png' " mode="aspectFill"></image>
							</view>
							<view class="choose-item-name">
								{{ item2.groupNickname }}
							</view>
						</block>
						
						<block v-if="chooseFriendType === 'addGroupManager' && item2.groupIdentity !== 2 && item2.groupIdentity !== 3">
							<view class="choose-item-icon">
								<view v-if="item2.checked" class="my-iconfont">&#xe612;</view>
							</view>
							<view class="choose-item-img">
								<image :src="item2.friendFaceImage ? imgUrl + item2.friendFaceImage: '/static/image/global/boyHeadImg.png' " mode="aspectFill"></image>
							</view>
							<view class="choose-item-name">
								{{ item2.groupNickname }}
							</view>
						</block>
						
						<block v-if="chooseFriendType === 'removeGroupManager' && item2.groupIdentity === 2">
							<view class="choose-item-icon">
								<view v-if="item2.checked" class="my-iconfont">&#xe612;</view>
							</view>
							<view class="choose-item-img">
								<image :src="item2.friendFaceImage ? imgUrl + item2.friendFaceImage: '/static/image/global/boyHeadImg.png' " mode="aspectFill"></image>
							</view>
							<view class="choose-item-name">
								{{ item2.groupNickname }}
							</view>
						</block>
						
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 底部已选择列表、搜索框 -->
		<scroll-view class="scroll-select-list" scroll-x>
			<view class="select-list">
				<block v-for="(item1, index1) in list" :key='index1'>
					<block v-if="item1.list.length>0">
						<block v-for="(item2, index2) in item1.list" :key="index2">
							<view @tap="delSelectItem(index1, index2)" v-if="item2.checked" class="select-item" :id="'select-item'+index1">
								<image :src="item2.friendFaceImage ? imgUrl + item2.friendFaceImage:'/static/image/global/boyHeadImg.png' " mode="aspectFill"></image>
							</view>
						</block>
					</block>
				</block>
				<!-- <view class="select-item" id="last-input">
					<input @input="handleInput" type="text" value="" placeholder="搜索好友" />
				</view> -->
				<!-- #ifdef MP-WEIXIN -->
				<button @tap="submitChoose" type="default">完成</button>
				<!-- #endif -->
			</view>
		</scroll-view>
		
		<view class="letters-index-list">
			<view @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="touchMove" @touchend.stop.prevent="touchEnd" @touchcancel.stop.prevent="touchCancel" class="letters-index-item">
				<text class="my-iconfont">&#xe80e;</text>
			</view>
			<view @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="touchMove" @touchend.stop.prevent="touchEnd" @touchcancel.stop.prevent="touchCancel" class="letters-index-item" v-for="(item, index) in lettersList" :key="index">
				{{ item }}
			</view>
		</view>
		<view v-if="indexAlert" class="mid-letter">
			{{ currentLetter }}
		</view>
	</view>
</template>

<script>
	//该页面包含添加群成员、添加群管理员
	import { addGroupRequest } from '@/network/session/session.js'
	import { mapState } from 'vuex'
	import { chooseFriendMixin } from '@/common/utils'
	import { formatList } from '@/common/index.js'
	
	export default {
		mixins: [chooseFriendMixin],
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['friendList', 'groupMemberMap', 'groupMemberList', 'currentChatTo', 'currentGroup'])
		},
		methods: {
			//选择该好友
			chooseItem(item) {
				console.log(item)
				if(this.chooseFriendType === 'addGroupManager') {
					if(this.selectedItem === 10) {
						uni.showToast({
							title: '管理员人数过多',
							icon: 'none'
						})
						return
					}
				}else if(this.chooseFriendType === 'addGroupMember') {
					if(this.groupMemberMap[this.currentGroup.tid][item.account]) {
						console.log('该成员已在群里')
						return
					}
				}
				this.$nextTick(() => {
					item.checked = !item.checked
					if(item.checked) {
						this.selectScrollLeft += 50
						this.selectedItem += 1
					}else {
						this.selectedItem -= 1
					}
					// #ifdef APP-PLUS
					this.changeRightTopBtn()
					// #endif
					
				})
				
			},
			
			//完成选择
			submitChoose() {
				uni.showLoading({ mask: true })
				const list = this.getHasChosenAccountList()
				let obj = {}
				switch (this.chooseFriendType){
					case 'addGroupMember': {
						obj = {
							'tid': this.currentGroup.tid,
							'owner': this.currentGroup.creator,
							'msg': this.userInfo.user.nickname + '邀请您加入讨论组',
							'members': list
						}
						addGroupRequest(obj).then(res => {
							this.$toast.showRes(res)
							if(res.data.code === 2000) {
								uni.showToast({
									title: '创建成功',
									icon: 'none',
									success: res => {
										setTimeout(() => {
											uni.navigateBack()
										}, 1500)
									}
								})
								
							}
						}).catch(err => {
							this.$toast.showErr(err)
						})
						break
					}
					case 'addGroupManager': {
						obj = {
							'tid': this.currentGroup.tid,
							'owner': this.currentGroup.creator,
							'members': list
						}
						addManagerRequest(obj).then(res => {
							this.$toast.showRes(res)
							if(res.data.code === 2000) {
								uni.navigateBack()
							}
						}).catch(err => {
							this.$toast.showErr(err)
						})
						break
					}
				}
				console.log('选择好友的作用:', this.chooseFriendType)
				console.log('this.list:', this.list)
				
				setTimeout(() => {
					uni.hideLoading()
				}, 2000)
			},
		},
		
		onLoad(option) {
			this.chooseFriendType = option.type
			//判断需要选择什么功能
			switch (option.type){
				case 'addGroupMember': { //添加群成员
					this.list = JSON.parse(JSON.stringify(this.friendList))
					this.list.forEach(item => {
						item.list.forEach(newList => {
							newList.checked = false
						})
					})
					console.log(this.list)
					console.log('添加群成员')
					break
				}
				case 'addGroupManager': {
					this.list = formatList(this.groupMemberList[this.currentGroup.tid])
					console.log(this.list)
					console.log('添加群管理员')
				}
			}
		}
	}
</script>

<style lang="scss">
	//弹性盒子
	.letters-index-list {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
	}
	
	.choose-item, .select-list {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}
	
	
	.add-groupmember {
		flex-flow: column nowrap;
		min-height: 100vh;
		height: 100%;
		background-color: #F7F7F7;
		.scrollList {
			.choose-list {
				.choose-letter {
					margin: 10rpx 25rpx;
					font-size: $uni-font-size-base;
				}
				.choose-item {
					position: relative;
					padding: 10rpx 30rpx;
					margin-bottom: 1rpx;
					box-sizing: border-box;
					background-color: #fff;
					.choose-item-icon {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 40rpx;
						height: 40rpx;
						margin-right: 30rpx;
						border-radius: 100%;
						border: 1rpx solid rgba(70, 70, 70, .1);
						
						.my-iconfont {
							width: 100%;
							height: 100%;
							border-radius: 100%;
							font-size: 40rpx;
							
							color: #fff;
							background-color: #50B674;
							// background-color: $uni-text-color-disable;
						}
						.icon-not-check {
							background-color: $uni-text-color-disable;
						}
					}
					.choose-item-img {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-right: 30rpx;
						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 8rpx;
						}
					}
					.choose-item-name {
						font-size: $uni-font-size-lg;
					}
					&:active {
						background-color: #F6F6F6;
					}
					
					// &::after {
					// 	content: '';
					// 	position: absolute;
					// 	left: 210rpx;
					// 	bottom: -1rpx;
					// 	width: 100%;
					// 	height: 1rpx;
					// 	background-color: rgba(100, 100, 100, .1);
					// }
					
				}
			}
		}
		
		
	}
	
	
	//底部展示已选择
	.scroll-select-list {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 120rpx;
		width: 100%;
		background-color: #fff;
		box-shadow: 0 -2rpx 2rpx rgba(100, 100, 100, .2);
		.select-list {
			height: 100%;
			z-index: 10;
			padding: 20rpx;
			box-sizing: border-box;
			
			.select-item {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 10rpx;
				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 8rpx;
				}
				
				input {
					min-width: 300rpx;
					font-size: $uni-font-size-lg;
				}
				
				
			}
		}
		
		
	}
	
	
	// 右侧索引列表
	.letters-index-list {
		position: fixed;
		right: 5rpx;
		top: 30rpx;
		width: 50rpx;
		height: 85%;
		font-size: 26rpx;
		color: #666;
		z-index: 199;
		.letters-index-item {
			text-align: center;
			border-radius: 12rpx;
			&:active {
				background-color: red;
			}
		}
	}
	
	
	// 居中显示触摸的字母
	.mid-letter {
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -80rpx;
		margin-left: -80rpx;
		width: 160rpx;
		height: 160rpx;
		color: #fff;
		font-size: 70rpx;
		text-align: center;
		line-height: 160rpx;
		border-radius: 12rpx;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}
</style>
