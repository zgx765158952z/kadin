<template>
	<view class="group-info">
		<!-- 头部 -->
		<view class="group-info-head">
			<view class="group-info-head-img">
				<image src="/static/image/test/test.jpg" mode=""></image>
			</view>
			<view class="group-info-head-center">
				<view class="group-name">
					讨论组名字
				</view>
				<view class="group-number">
					276664546999 于2020-02-14创建
				</view>
			</view>
			<view class="group-info-head-right">
				<text class="my-iconfont right-icon">&#xe683;</text>
			</view>
		</view>
		
		<!-- 名片 -->
		<default-list @tap.native="toDefModify('myGroupCard', null)" textRight="true">
			<view slot="def-list-left">
				我的群名片
			</view>
			<view slot="def-list-center">
				点击设置
			</view>
		</default-list>
		
		<!-- 群成员 -->
		<default-list @tap="toGroupMembers" textRight="true">
			<view slot="def-list-left">
				群成员
			</view>
			<view slot="def-list-center">
				共199人
			</view>
		</default-list>
		
		<view class="group-members">
			<view v-for="(item, index) in 4" :key="index" class="group-members-item">
				<view class="group-members-item-img" :class="{'group-members-item-img-after': index === 0}">
					<image src="/static/image/test/test.jpg" mode=""></image>
				</view>
				<view class="group-members-item-name">
					默认好友-赵六
				</view>
			</view>
			
			<view @tap="toChooseFriend" class="group-members-item">
				<view class="group-members-item-img">
					<text class="my-iconfont">&#xe606;</text>
				</view>
				<view class="group-members-item-name">
					邀请好友
				</view>
			</view>
		</view>
		
		<default-list :myRight="false" textRight="true" marTop="true">
			<view slot="def-list-left">
				创建者
			</view>
			<view slot="def-list-center">
				好友1
			</view>
		</default-list>
		
		<!-- 群创建者可修改群名称 -->
		<default-list @tap.native="toDefModify('myGroupCard', null)" textRight="true">
			<view slot="def-list-left">
				群名称
			</view>
			<view slot="def-list-center">
				讨论组名字
			</view>
		</default-list>
		
		
		<default-list @tap.native="toDefModify('myGroupCard', null)" textRight="true">
			<view slot="def-list-left">
				群介绍
			</view>
			<view slot="def-list-center">
				暂无
			</view>
		</default-list>
		
		
		<view @tap.native="toDefModify('myGroupCard', null)" class="notice-item" hover-class="tap-hover-color">
			<view class="notice-item-left">
				<view class="notice-name">
					群公告
				</view>
				<view class="notice-content">
					一个组件包括开始标签和结束标签，标签上可以写属性，并对属性赋值。内容则写在两个标签之内。一个组件包括开始标签和结束标签，标签上可以写属性，并对属性赋值。内容则写在两个标签之内。
				</view>
			</view>
			<text class="notice-item-right my-iconfont">&#xe683;</text>
		</view>
		
		<default-list @tap.native="toDefModify('myGroupCard', null)" textRight="true">
			<view slot="def-list-left">
				聊天记录
			</view>
		</default-list>
		
		<default-list @tap="handleRemind" noBorderBtm="true" textRight="true">
			<view slot="def-list-left">
				消息提醒
			</view>
			<view slot="def-list-center">
				提醒所有消息
			</view>
		</default-list>
		
		
		
		<view class="group-info-btm">
			<view class="clean-chat-record" hover-class="tap-hover-color">
				清空聊天记录
			</view>
			<view @tap="signOutGroup" class="sign-out" hover-class="tap-hover-color">
				退出该群
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	
	export default {
		components: {
			DefaultList
		},
		data() {
			return {
				
			}
		},
		methods: {
			//跳转到DefModify
			toDefModify(type, value) {
				const modifyObj = {
					type: type,
					value: value
				}
				uni.navigateTo({
					url: `/components/content/defmodify/DefModify?modifyObj=${modifyObj}`
				})
			},
			
			//跳转到GroupMembers
			toGroupMembers() {
				uni.navigateTo({
					url: `/components/content/session/sessionSon/GroupMembers`
				})
			},
			
			//跳转到ChooseFriend
			toChooseFriend() {
				uni.navigateTo({
					url: `/components/content/chooseFriend/ChooseFriend`
				})
			},
			//设置消息提醒
			handleRemind() {
				uni.showActionSheet({
					itemList: ['提醒所有消息', '只接收不提醒', '不提醒任何消息', '取消'],
					success: res => {
						console.log(res)
						if(res.tapIndex){
							switch (res.tapIndex) {
								case 0:
									console.log('提醒所有消息')
									break;
								case 1:
									console.log('只接收不提醒')
									break;
								case 2:
									console.log('不提醒任何消息')
									break;
								case 3:
									console.log('取消')
									break;
							}
						}
					}
				})
			},
			
			//退出该群
			signOutGroup() {
				uni.showModal({
					title: '提示',
					content: '确定退出该群?',
					success: res => {
						if(res.confirm) {
							uni.showToast({
								title: '已退出该群',
								icon: 'none',
								mask: true,
								success: res => {
									setTimeout(() => {
										uni.navigateBack({
											delta: 2
										})
									}, 1000)
								}
							})
						}
					}
				})
			}
			
			
			
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
