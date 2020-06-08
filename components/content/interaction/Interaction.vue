<template>
	<view class="interaction">
		<view class="interaction-list">
			
			<view class="interaction-item" v-for="(item, index) in likeAndCommentList" :key="index">
				<view class="interaction-item-headimg">
					<image @tap.stop="toFriendInfo" :src="friendCard[item.fromUser].friendFaceImage" mode="aspectFill"></image>
				</view>
				
				<view class="interaction-item-info def-bottom-border">
					
					<view class="info-left">
						<view class="info-username def-username">
							{{ friendCard[item.fromUser].friendRemarkName }}
						</view>
						<view v-if="item.tag === 2" class="info-comment">
							<text>回复</text>
							<text class="info-comment-reply-toUser def-username">{{ item.toUser }}: </text>
							{{ item.content }}
						</view>
						<view v-if="item.tag === 1" class="info-praise def-username my-iconfont">&#xe617;</view>
						<view class="info-time">
							{{ item.time }}
						</view>
					</view>
					
					<view class="info-right">
						<!-- <image src="../../../static/image/test/test.jpg" mode="aspectFill"></image> -->
						<view class="info-right-content def-center-box">此处显示文字</view>
					</view>
					
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { showRes, showErr } from '@/common/toast.js'
	import { getLikeCommentInfoRequest } from '@/network/dynamic.js'
	import { formatToTimeStamp } from '@/common/index.js'
	import { calcTimeHeader } from '@/utils/utils.js'
	
	export default {
		data() {
			return {
				likeAndCommentList: [], //与我相关的点赞与评论的数据
			}
		},
		computed: {
			...mapState(['userInfo', 'friendCard']),
			//将中国标准时间转化为正常时间
			calcTime() {
				return function(time) {
					return calcTimeHeader(formatToTimeStamp(time))
				}
			}
		},
		methods: {
			toFriendInfo(account) {
				uni.navigateTo({
					url: `/components/content/friend/FriendInfo?friendAccount=${account}`
				})
			},
			//获取与我相关的点赞与评论信息
			getLikeCommentInfo() {
				getLikeCommentInfoRequest(this.userInfo.user.userAccount).then(res => {
					showRes(res)
					if(res.data.code === 2000) {
						this.likeAndCommentList = res.data.data
					}
				}).catch(err => {
					showErr(err)
				})
			}
		},
		onLoad() {
			this.getLikeCommentInfo()
		}
	}
</script>

<style lang="scss" scoped>
	
	//弹性布局
	.interaction-item, .interaction-item-info {
		display: flex;
		flex-flow: row nowrap;
	}
	
	
	.interaction-item-headimg, .info-right {
		image {
			margin-top: 5rpx;
		}
	}
	
	.interaction {
		.interaction-list {
			font-size: $uni-font-size-base;
			background-color: #fff;
			.interaction-item {
				padding: 20rpx 0 0 30rpx;
				box-sizing: border-box;
				&:active {
					background-color: $uni-bg-color-hover;
				}
				.interaction-item-headimg {
					width: auto;
					margin-right: 20rpx;
					image {
						width: 90rpx;
						height: 90rpx;
						border-radius: 10rpx;
						&:active {
							background-color: #666;
						}
					}
				}
				.interaction-item-info {
					flex: 1;
					padding-right: 30rpx;
					box-sizing: border-box;
					.info-left {
						flex: 1;
						padding: 0 20rpx 20rpx 0;
						box-sizing: border-box;
						.info-username {
							
						}
						.info-comment {
							line-height: 36rpx;
							.info-comment-reply {
								.info-comment-reply-toUser {
									
								}
							}
							.info-comment-content {
								
							}
						}
						.info-time {
							font-size: $uni-font-size-sm;
							color: $uni-text-color-placeholder;
						}
					}
					.info-right {
						width: auto;
						image {
							width: 120rpx;
							height: 120rpx;
						}
						.info-right-content {
							width: 120rpx;
							height: 120rpx;
							padding: 8rpx 0;
							box-sizing: border-box;
							font-size: $uni-font-size-sm;
							overflow: hidden;
							color: #666;
							background-color: #EDEDED;
						}
					}
					
				}
			}
		}
	}
</style>
