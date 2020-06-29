<template>
	<view class="interaction">
		<view class="interaction-list">
			
			<block v-for="(item, index) in newFriendDynamic" :key="index" >
				<view @tap="toSingleDynamic(item.friendCircleId)" class="interaction-item">
					<view class="interaction-item-headimg">
						<image @tap.stop="toFriendInfo(item.fromUser)" :src=" imgUrl + friendCard[item.fromUser].friendFaceImage" mode="aspectFill"></image>
					</view>
					
					<view class="interaction-item-info def-bottom-border">
						<view class="info-left">
							<view @tap.stop="toFriendInfo(item.fromUser)" class="info-username def-username">
								{{ friendCard[item.fromUser].friendRemarkName }}
							</view>
							<view v-if="item.type === 2" class="info-comment">
								<text>回复</text>
								<text @tap.stop="toFriendInfo(item.toUser)" class="info-comment-reply-toUser def-username">{{ friendCard[item.toUser].friendRemarkName }}: </text>
								{{ item.content }}
							</view>
							<view v-if="item.type === 1" class="info-praise def-username my-iconfont">&#xe617;</view>
							<view class="info-time">
								{{ item.time | calcTime }}
							</view>
						</view>
						
						<view v-if="false" class="info-right">
							<!-- <image src="../../../static/image/test/test.jpg" mode="aspectFill"></image> -->
							<view class="info-right-content def-center-box">{{ item.content }}</view>
						</view>
						
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { formatToTimeStamp } from '@/common/index.js'
	import { calcTimeHeader } from '@/utils/utils.js'
	import { imgBaseUrl } from '@/common/helper.js'
	
	export default {
		data() {
			return {
				imgUrl: '',
				likeAndCommentList: [], //与我相关的点赞与评论的数据
			}
		},
		computed: {
			...mapState(['userInfo', 'friendCard', 'newFriendDynamic']),
			
		},
		filters: {
			calcTime(time) {
				return calcTimeHeader(formatToTimeStamp(time))
			}
		},
		methods: {
			toFriendInfo(account) {
				uni.navigateTo({
					url: `/components/content/friend/FriendInfo?friendAccount=${account}`
				})
			},
			toSingleDynamic(friendCircleId) {
				uni.navigateTo({
					url: '/components/content/dynamic/SingleDynamic?friendCircleId=' + friendCircleId
				})
			}
		},
		onLoad() {
			this.imgUrl = imgBaseUrl
			console.log('friendCard', this.friendCard)
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
