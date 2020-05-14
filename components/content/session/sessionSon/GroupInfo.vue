<template>
	<view class="group-info">
		<!-- 头部 -->
		<view class="group-info-head">
			<view class="group-info-head-img">
				<image src="/static/image/test/test.jpg" mode=""></image>
			</view>
			<view class="group-info-head-center">
				<view class="group-name">
					 {{ currentGroup.groupName }}
				</view>
				<view class="group-number">
					{{ currentGroup.tid }} 于 {{ currentGroup.createTime }} 创建
				</view>
			</view>
			<view class="group-info-head-right">
				<text class="my-iconfont right-icon">&#xe683;</text>
			</view>
		</view>
		
		<!-- 名片 -->
		<default-list @click.native="toDefModify('myGroupCard', null)" textRight="true">
			<view slot="def-list-left">
				我的群名片
			</view>
			<view slot="def-list-center">
				{{ currentGroup.myGroupName }}
			</view>
		</default-list>
		
		<!-- 群成员 -->
		<default-list @tap="toGroupMembers" textRight="true">
			<view slot="def-list-left">
				群成员
			</view>
			<view slot="def-list-center">
				共{{ groupMemberList[currentGroup.tid].length }}人
			</view>
		</default-list>
		
		<view class="group-members">
			<view v-for="(item, index) in groupMemberList[currentGroup.tid]" :key="index" class="group-members-item">
				<view class="group-members-item-img" :class="{'group-members-item-img-after': index === 0}">
					<image src="/static/image/test/test.jpg" mode=""></image>
				</view>
				<view class="group-members-item-name">
					{{ item.groupNickname || '' }}
				</view>
			</view>
			
			<!-- <view @tap="toAddGroupMember" class="group-members-item">
				<view class="group-members-item-img">
					<text class="my-iconfont">&#xe606;</text>
				</view>
				<view class="group-members-item-name">
					邀请好友
				</view>
			</view> -->
		</view>
		
		<default-list :myRight="false" textRight="true" marTop="true">
			<view slot="def-list-left">
				创建者
			</view>
			<view slot="def-list-center">
				{{ currentGroup.creator || '默认好友' }}
			</view>
		</default-list>
		
		<!-- 群创建者可修改群名称 -->
		<default-list @click.native="toDefModify('myGroupCard', null)" textRight="true">
			<view slot="def-list-left">
				群名称
			</view>
			<view v-if="currentGroup.groupName" slot="def-list-center">
				{{ currentGroup.groupName }}
			</view>
		</default-list>
		
		
		<default-list @click.native="toDefModify('myGroupCard', null)" textRight="true">
			<view slot="def-list-left">
				群描述
			</view>
			<view slot="def-list-center">
				{{ currentGroup.groupDescription || '暂无' }}
			</view>
		</default-list>
		
		
		<view @click.native="toDefModify('myGroupCard', null)" class="notice-item" hover-class="tap-hover-color">
			<view class="notice-item-left">
				<view class="notice-name">
					群公告
				</view>
				<view class="notice-content">
					{{ currentGroup.announcement || '暂无' }}
				</view>
			</view>
			<text class="notice-item-right my-iconfont">&#xe683;</text>
		</view>
		
		<default-list @click.native="toHistoryMsg()" textRight="true">
			<view slot="def-list-left">
				聊天记录
			</view>
		</default-list>
		
		<default-list @tap="handleRemind" :noBorderBtm="true" textRight="true">
			<view slot="def-list-left">
				消息提醒
			</view>
			<view slot="def-list-center">
				{{ currentGroup.msgNotification === 2? '提醒所有消息':'不提醒任何消息'}}
			</view>
		</default-list>
		
		
		
		<view class="group-info-btm">
			<view class="clean-chat-record" hover-class="tap-hover-color">
				清空聊天记录
			</view>
			<view v-if="isGroupAdmin === 3" @tap="handleAdmin" class="sign-out" hover-class="tap-hover-color">
				管理群
			</view>
			<view v-else @tap="signOutGroup" class="sign-out" hover-class="tap-hover-color">
				退出该群
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	import { mapState, mapGetters } from 'vuex'
	import { calcTimeHeader }from '@/utils/utils.js'
	import { quitGroupRequest, modifyMsgRemindRequest } from '@/network/session/session.js'
	
	export default {
		components: {
			DefaultList
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['userInfo', 'currentGroup', 'groupMemberList', 'groupMemberMap']),
			...mapGetters(['isGroupAdmin'])
		},
		methods: {
			//修改消息提醒类型
			modifyMsgRemind(type=Number) {
				const obj = {
					tid: this.currentGroup.tid,
					accid: this.userInfo.user.userAccount,
					ope: type
				}
				modifyMsgRemindRequest(obj).then(res => {
					this.$toast.showRes(res)
					if(res.data.code === 2000) {
						
					}
				}).catch(err => {
					this.$toast.showErr(err)
				})
			},
			//跳转到DefModify
			toDefModify(type, value) {
				if(this.isGroupAdmin === 3) {
					const modifyObj = {
						type: type,
						value: value
					}
					uni.navigateTo({
						url: `/components/content/defmodify/DefModify?modifyObj=${modifyObj}`
					})
				}
			},
			
			//跳转到GroupMembers
			toGroupMembers() {
				uni.navigateTo({
					url: `/components/content/session/sessionSon/GroupMembers`
				})
			},
			//跳转到HistoryMsg
			toHistoryMsg() {
				uni.navigateTo({
					url: '/components/content/session/content/HistoryMsg'
				})
			},
			
			//跳转到AddGroupMember,只有群主及管理员才有权限
			toAddGroupMember(type) {
				uni.navigateTo({
					url: `/components/content/session/sessionSon/addGroupMember?type=${type}`
				})
			},
			handleAdmin() {
				uni.showActionSheet({
					itemList: ['添加群成员', '移除群成员', '添加群管理员', '移除群管理员', '解散该群'],
					success: res => {
						console.log(res)
						switch (res.tapIndex) {
							case 0: {
								console.log('添加群成员')
								this.toAddGroupMember('addGroupMember')
								break
							}
							case 1: {
								console.log('移除群成员')
								this.toAddGroupMember('removeGroupMember')
								break
							}
							case 2: {
								console.log('添加群管理员')
								this.toAddGroupMember('addGroupManager')
								break
							}
								
							case 3: {
								console.log('移除群管理员')
								this.toAddGroupMember('removeGroupManager')
								break
							}
							case 4: {
								this.disbandGroup(11)
							}
							//#ifdef APP-PLUS
							case 5: {
								console.log('取消')
								break
							}
							//#endif
						}
					}
				})
			},
			//设置消息提醒
			handleRemind() {
				uni.showActionSheet({
					itemList: ['提醒所有消息', '不提醒任何消息', '取消'],
					success: res => {
						console.log(res)
						if(res.tapIndex){
							switch (res.tapIndex) {
								case 0:
									console.log('提醒所有消息')
									this.modifyMsgRemind(2)
									break;
								case 1:
									console.log('不提醒任何消息')
									this.modifyMsgRemind(1)
									break;
								//#ifdef APP-PLUS
								case 2:
									console.log('取消')
									break;
								//#endif
							}
						}
					}
				})
			},
			quitGroup(obj) {
				uni.showLoading({ mask: true })
				quitGroupRequest(obj).then(res => {
					this.$toast.showRes(res)
					uni.hideLoading()
					if(res.data.code === 2000) {
						uni.showToast({
							title: '已退出该群',
							icon: 'none',
							success: res => {
								setTimeout(() => {
									uni.navigateBack({ delta: 2 })
								}, 1500)
							}
						})
					}
				}).catch(err => {
					this.$toast.showErr(err)
					uni.hideLoading()
				})
			},
			//退出该群
			signOutGroup() {
				uni.showModal({
					title: '提示',
					content: '确定退出该群?',
					success: res => {
						if(res.confirm) {
							const obj = {
								tid: this.currentGroup.tid,
								accid: this.userInfo.user.userAccount
							}
							this.quitGroup(obj)
						}
					}
				})
			},
			
			//解散该群
			disbandGroup(obj) {
				uni.showModal({
					title: '提示',
					content: '确定解散该群?',
					success: res => {
						if(res.confirm) {
							uni.showLoading({ mask: true, title: '正在解散群' })
							
							setTimeout(() => {
								uni.hideLoading()
							}, 2000)
						}
					}
				})
			}
			
		},
		
		mounted() {
			console.log('groupInfo加载数据:', this.currentGroup, this.groupMemberList)
		}
	}
</script>

<style scoped lang="scss">
	
	//弹性盒子
	.group-info-head, .group-info-head-right {
		display: flex;
		align-items: center;
		align-content: center;
	}
	
	
	//管理员字体图标
	.group-members-item-img-after {
		&::after {
			content: '\e602';
			position: absolute;
			right: 2rpx;
			bottom: 0;
			font-family: 'iconfont';
			font-size: 30rpx;
			color: #1AA034;
			width: 30rpx;
			height: 30rpx;
		}
	}
	
	//群公告
	.notice-item {
		display: flex;
		flex-flow: row nowrap;
		padding: 30rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		background-color: #FFFFFF;
		.notice-item-left {
			flex: 1;
			.notice-name {
				font-size: $uni-font-size-lg;
			}
			.notice-content {
				margin-top: 10rpx;
				font-size: $uni-font-size-base;
				color: #989898;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}
		}
		.notice-item-right {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: 10rpx;
			width: auto;
			font-size: 32rpx;
			color: #989898;
			font-weight: 900;
		}
	}
	
	.group-members {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		align-content: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		.group-members-item {
			margin: 20rpx 0;
			.group-members-item-img {
				display: flex;
				justify-content: center;
				align-items: center;
				align-content: center;
				position: relative;
				
				margin-bottom: 10rpx;
				image {
					width: 90rpx;
					height: 90rpx;
					border-radius: 100%;
				}
				
				.my-iconfont {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #989898;
					font-size: 60rpx;
					width: 90rpx;
					height: 90rpx;
					border-radius: 100%;
					border: 1rpx dashed #989898;
					&:active {
						color: $uni-bg-color-hover;
					}
				}
				
				
				
			}
			
			.group-members-item-name {
				width: 140rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				text-align: center;
				font-size: $uni-font-size-sm;
				color: #989898;
			}
		}
	}
	
	.group-info {
		height: 100%;
		min-height: 100vh;
		background-color: #F6F6F6;
		.group-info-head {
			padding: 40rpx 30rpx 40rpx 40rpx;
			box-sizing: border-box;
			.group-info-head-img {
				display: flex;
				justify-content: center;
				align-items: center;
				width: auto;
				image {
					width: 110rpx;
					height: 110rpx;
					border-radius: 100%;
				}
			}
			.group-info-head-center {
				flex: 1;
				margin-left: 20rpx;
				.group-name {
					font-size: 36rpx;
				}
				.group-number {
					font-size: $uni-font-size-base;
					color: #989898;
				}
			}
			.group-info-head-right {
				width: auto;
				.right-icon {
					font-size: $uni-font-size-lg;
					font-weight: 900;
					color: #989898;
				}
			}
		}
		
		
		//底部
		.group-info-btm {
			margin: 30rpx 0;
			&>view {
				text-align: center;
				color: #FA5251;
				font-size: $uni-font-size-lg;
				font-weight: 900;
				background-color: #FFFFFF;
				padding: 30rpx 0;
				box-sizing: border-box;
			}
			.clean-chat-record {
				position: relative;
				margin-bottom: 1rpx;
				&::after {
					content: '';
					position: absolute;
					bottom: -1rpx;
					left: 0;
					width: 100%;
					height: 1rpx;
					background-color: rgba(100, 100, 100, .1);
				}
			}
		}
	}
</style>
