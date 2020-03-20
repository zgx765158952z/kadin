<template>
	<!-- 对聊天好友的设置 -->
	<view class="chat-friend-setting">
		
		
		<default-list class="chat-friend-setting-head">
			<image slot="def-list-left" src="/static/image/test/test.jpg" mode=""></image>
			<text slot="def-list-center">默认好友</text>
		</default-list>
		
		<default-list>
			<view slot="def-list-left">
				分组
			</view>
		</default-list>
		
		<default-list>
			<view slot="def-list-left">
				聊天记录
			</view>
		</default-list>
		
		<default-list @tap.native="changeMsgRemind" :myRight="false" noBorderBtm="true">
			<view slot="def-list-left">
				消息提醒
			</view>
			<view slot="def-list-right">
				<switch :checked="isRemind" style="transform: scaleY(.9);"></switch>
			</view>
		</default-list>
		
		<view class="chat-setting-btm">
			<view class="clean-chat-record" hover-class="tap-hover-color">
				清空聊天记录
			</view>
			<view @tap="delChatFriend" class="del-chat-friend" hover-class="tap-hover-color">
				删除好友
			</view>
		</view>
		
	</view>
</template>

<script>
	import HeadImgItem from '@/components/content/defimglist/HeadImgItem.vue'
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	
	export default {
		components: {
			HeadImgItem,
			DefaultList
		},
		data() {
			return {
				isRemind: true
			}
		},
		methods: {
			//改变消息提醒
			changeMsgRemind() {
				this.isRemind = !this.isRemind
			},
			
			//删除该聊天好友
			delChatFriend() {
				uni.showModal({
					title: '提示',
					content: '确定删除该好友？',
					success: res => {
						console.log(res)
						if(res.confirm) {
							uni.showToast({
								title: '好友已删除',
								icon: 'none',
								success: res => {
									uni.navigateBack()
								}
							})
						}
					},
					fail: err => {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.chat-friend-setting {
		min-height: 100vh;
		height: 100%;
		background-color: #F7F7F7;
		.chat-friend-setting-head {
			image {
				width: 90rpx;
				height: 90rpx;
				border-radius: 100%;
			}
		}
		.chat-setting-btm {
			margin: 30rpx 0;
			background-color: #FFFFFF;
			.clean-chat-record {
				position: relative;
				margin-bottom: 1rpx;
				&::after {
					content: '';
					position: absolute;
					left: 0;
					bottom: -1rpx;
					width: 100%;
					height: 1rpx;
					background-color: rgba(100, 100, 100, .1);
				}
			}
			&>view {
				text-align: center;
				padding: 30rpx 0;
				color: #FA5251;
				font-size: $uni-font-size-lg;
				font-weight: 900;
			}
		}
		
	}
</style>
