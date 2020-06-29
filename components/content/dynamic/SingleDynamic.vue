<template>
	<view class="single-dynamic">
		<view v-if="friendDynamicOne && friendDynamicOne.comment" class="dyc-list">
			<view @tap="toFriendInfo(friendDynamicOne.account)" class="dyc-list-head-img">
				<image :src="imgUrl + friendCard[friendDynamicOne.account].friendFaceImage" mode="aspectFill"></image>
			</view>
			<view class="dyc-list-con">
				<view @tap="toFriendInfo(friendDynamicOne.account)" class="dyc-list-name cliFontColor">
					{{ friendDynamicOne.name }}
				</view>
				<view class="dyc-list-text">
					<text selectable="true">
						{{ friendDynamicOne.content }}
					</text>
				</view>
				<!-- <view v-if="false" class="dyc-list-img1">
					<image src="/static/image/test/test.jpg" mode="aspectFill"></image>
					
				</view> -->
				<view v-if="friendDynamicOne.images && friendDynamicOne.images[0]!='null' " class="dyc-list-img2">
					<view @tap="toPreviewImg(friendDynamicOne.images, imgIndex)" v-for="(imgItem, imgIndex) in friendDynamicOne.images" :key="imgIndex" class="dyc-list-img2-son">
						<image :src="imgUrl + imgItem" mode="aspectFill"></image>
					</view>
				</view>
				
				<!-- 时间与定位 -->
				<view class="dyc-local-list">
					<view class="left-time-local">
						<text class="left-time">{{ friendDynamicOne.time | calcTime }}</text>
						<text class="left-local">{{ friendDynamicOne.location }}</text>
					</view>
					<view @tap.stop="handlerPraise" class="right-praise">
						<text class="my-iconfont right-praise-img">&#xe625;</text>
						<!-- 赞与评论按钮组 -->
						<view v-if="isShowPraise" class="praise-and-comment" :class="{'effect-in': isShowPraise}">
							<view class="praise-item" @tap.stop="toPraise" hover-class="tap-hover-color5">
								<text class="my-iconfont praise-item-icon">&#xe617;</text>
								<text v-if="!hasPraise" class="praise-item-text">赞</text>
								<text v-else class="praise-item-text">取消</text>
							</view>
							<view @tap.stop="toComment" class="comment-item" hover-class="tap-hover-color5">
								<text class="my-iconfont comment-item-icon">&#xe60b;</text>
								<text class="comment-item-text">评论</text>
							</view>
							<view class="praise-and-comment-porn"></view>
						</view>
					</view>
				</view>
				
			</view>
			
			
		</view>
		<view class="praise-comment">
			<!-- 点赞列表 -->
			<view v-if="friendDynamicOne.likePerson && friendDynamicOne.likePerson.length > 0 && JSON.stringify(friendDynamicOne.likePerson[0]) != '{}'" class="praise-list">
				<view class="praise-list-left my-iconfont">&#xe617;</view>
				<view class="praise-list-right">
					<view v-for="(item, index) in friendDynamicOne.likePerson" :key="index" class="praise-item">
						<block v-for="(val, key, ind) in item" :key="ind">
							<image :src="imgUrl + friendCard[key].friendFaceImage"></image>
						</block>
					</view>
				</view>
			</view>
			
			<!-- 评论列表 -->
			<view class="comment-list">
				<view class="comment-list-left my-iconfont">&#xe615;</view>
				<view class="comment-list-right">
					<view v-for="(item, index) in friendDynamicOne.comment" :key="index" class="comment-item">
						<view class="comment-item-left">
							<image :src="imgUrl + friendCard[item.user].friendFaceImage" mode=""></image>
						</view>
						<view class="comment-item-right">
							<view class="comment-item-name-time">
								<view @tap.stop="toFriendInfo(item.user)" class="comment-item-name">
									{{ friendCard[item.user].friendRemarkName }}
								</view>
								<view class="comment-item-time">
									{{ item.commentTime | calcTime }}
								</view>
							</view>
							<view @tap="showComment(index)" class="comment-item-btm">
								<view v-if="item.commentFatherId" class="comment-item-btm-reply">
									回复<text @tap.stop="toFriendInfo(item.toUser)" class="comment-item-btm-reply-toUser">{{ friendCard[item.toUser].friendRemarkName }}</text>:
								</view>
								<text selectable>{{ item.commentContent }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 评论输入框 -->
		<view v-if="hasComment" class="comment-frame">
			<textarea v-model="commentContent" :fixed="true" adjust-position auto-height :placeholder="commentPlaceholder" />
			<view @tap.stop="handleSmilingFace" class="my-iconfont comment-frame-icon">&#xe611;</view>
			<view @tap.stop="publishComment" :class="{'hasCommentContent': commentContent.length != 0}" class="comment-frame-btm">发送</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { browseFriendCircleOneRequest, doCommentRequest, doDynamicLikeRequest } from '@/network/dynamic.js'
	import { imgBaseUrl } from '@/common/helper.js'
	import { calcTimeHeader } from '@/utils/utils.js'
		
	export default {
		name: 'SingleDynamic',
		data() {
			return {
				imgUrl: '',
				friendDynamicOne: {},
				
				currentIndex: -1, //当前动态是哪一条,-1是代表没有
				
				//控制点赞与评论按钮组的显示
				isShowPraise: false,
				
				//控制赞与取消
				hasPraise: false,
				
				//评论框的显示与隐藏
				hasComment: false,
				//输入框内容
				commentContent: '',
				//评论还是回复模式 -1是评论
				currentReplyindex: -1,
				//评论提示内容
				commentPlaceholder: '评论',
				//输入框表情的显示
				showSmilingFace: false,
			}
		},
		computed: {
			...mapState(['friendCard', 'userInfo', 'friendDynamicList']),
		},
		filters: {
			calcTime(time) {
				return calcTimeHeader(time)
			},
		},
		methods: {
			//获取单个动态
			browseFriendCircleOne(obj) {
				browseFriendCircleOneRequest(obj).then(res => {
					if(res.data.code === 2000) {
						this.friendDynamicOne = res.data.data
						this.getIndex()
					}
				})
			},
			
			
			
			
			//点赞与评论按钮组的显示、隐藏
			handlerPraise() {
				this.isShowPraise = !this.isShowPraise
				this.queryMeHasPraise()
			},
			
			//改变自己对该动态点赞的状态,并返回已点赞likePerson列表的下标
			queryMeHasPraise() {
				const likePerson = this.friendDynamicOne.likePerson
				const likePersonObj = JSON.stringify(likePerson[0])
				if(likePerson.length > 0 && likePersonObj != '{}') {
					const account = this.userInfo.user.userAccount
					for(let i=0; i<likePerson.length; i++) {
						for(let key in likePerson[i]) {
							if(key === account) {
								console.log('已点赞')
								this.hasPraise = true
								return i
								break
							}
						}
					}
					console.log('未点赞')
					this.hasPraise = false
					return false
				}else {
					console.log('未点赞')
					this.hasPraise = false
					return false
				}
				
			},
			
			//点赞 或 取消点赞
			toPraise() {
				const obj = {
					account: this.friendDynamicOne.account,
					likeAccount: this.userInfo.user.userAccount,
					friendCircleId: this.friendDynamicOne.id
				}
				doDynamicLikeRequest(obj).then(res => {
					if(res.status === 200) {
						if(res.data.code === 2000) {
							if(this.hasPraise) {
								for(let i=0; i<this.friendDynamicOne.likePerson.length; i++) {
									for(let key in this.friendDynamicOne.likePerson[i]) {
										if(key == this.userInfo.user.userAccount) {
											this.friendDynamicOne.likePerson.splice(i, 1)
											if(this.currentIndex !== -1) {
												this.friendDynamicList[this.currentIndex].likePerson.splice(i, 1)
											}
											break
										}
									}
								}
								
							}else {
								let obj = {}
								obj[`${this.userInfo.user.userAccount}`] = `${this.userInfo.user.nickname}`
								console.log('obj:', obj)
								this.friendDynamicOne.likePerson.push(obj)
								if(this.currentIndex !== -1) {
									this.friendDynamicList[this.currentIndex].likePerson.push(obj)
								}
							}
							
							this.hasPraise = !this.hasPraise
							console.log('friendDynamicOne', this.friendDynamicOne)
							console.log('this.friendDynamicList', this.friendDynamicList)
							this.hidePraiseCommentMask()
							
						}else {
							uni.showToast({
								title: '程序走丢了，请稍后重试',
								icon: 'none'
							})
						}
					}else if(res.status === 404) {
						uni.showToast({
							title: '网络走丢了，请稍后重试',
							icon: 'none'
						})
					}else {
						uni.showToast({
							title: '程序走丢了，请稍后重试',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: '程序走丢了，请稍后重试',
						icon: 'none'
					})
				})
			},
			
			//显示评论框（回复模式）
			showComment(index) {
				//不可以回复自己，回复他人才弹出评论框
				if(this.friendDynamicOne.comment[index].user != this.userInfo.user.userAccount) {
					this.isShowPraise = false
					this.commentContent = ''
					this.commentPlaceholder = `回复${this.friendDynamicOne.comment[index].userNickname}:`
					this.hasComment = true
					this.currentReplyindex = index
				}
			},
			
			toComment() {
				//评论模式
				this.currentReplyindex = -1
				this.commentContent = ''
				this.commentPlaceholder = "评论"
				//隐藏点赞评论选择菜单
				this.hidePraiseCommentMask()
				//显示评论框
				this.hasComment = true
			},
			
			//完成发布评论
			publishComment() {
				if(this.commentContent) {
					if(this.currentReplyindex !== -1) {
						//回复模式
						this.doComment(this.currentReplyindex)
					}else {
						//评论模式
						this.doComment()
					}
				}
			},
			/*
			发表评论：分评论模式和回复模式 
			index为评论回复列表索引 未传即代表是第一次评论
			index不为空即是回复模式
			*/
			doComment(index=null) {
				console.log('index:', index)
				const obj = {
					user: this.userInfo.user.userAccount,
					toUser: index !== null ? this.friendDynamicOne.comment[index].user: this.friendDynamicOne.account,
					commentContent: this.commentContent,
					friendCircleId: this.friendDynamicOne.id,
					fatherId: index !== null ? this.friendDynamicOne.comment[index].commentId: 0
				}
				doCommentRequest(obj).then(res => {
					if(res.status === 200) {
						if(res.data.code === 2000) {
							console.log('评论成功:', res)
							this.$nextTick(() => {
								this.hasComment = false
								//更新评论成功后的数据
								const getData = res.data.data[res.data.data.length-1]
								this.friendDynamicOne.comment.push(getData)
								if(this.currentIndex !== -1) {
									this.friendDynamicList[this.currentIndex].comment.push(getData)
								}
							})
						}
					}
				}).catch(err => {
					uni.showToast({
						title: '程序走丢了，请稍后重试',
						icon: 'none'
					})
				})
			},
			
			//隐藏点赞和评论
			hidePraiseCommentMask() {
				this.isShowPraise = false
				console.log('hidePraiseCommentMask')
			},
			
			//找到当前动态是的哪一条
			getIndex() {
				if(this.friendDynamicList.length == 0) return 
				let tempList = Object.assign([], this.friendDynamicList)
				for(let i=0; i<this.friendDynamicList.length; i++) {
					if(this.friendDynamicList[i].id == this.friendDynamicOne.id) {
						this.currentIndex = i
						break 
					}
				}
			},
			toFriendInfo(friendAccount) {
				uni.navigateTo({
					url: `/components/content/friend/FriendInfo?friendAccount=${friendAccount}`
				})
			}
		},
		onLoad(options) {
			let obj = {
				account: this.userInfo.user.userAccount,
				friendCircleId: options.friendCircleId
			}
			this.browseFriendCircleOne(obj)
			this.imgUrl = imgBaseUrl
			console.log(this.friendCard)
		}
	}
</script>

<style lang="scss" scoped>
	.single-dynamic {
		padding-bottom: 60rpx;
		.dyc-list {
			display: flex;
			padding: 15rpx 30rpx 30rpx 30rpx;
			.dyc-list-head-img {
				width: auto;
				margin: 10rpx 20rpx 0 0;
				image {
					width: 85rpx;
					height: 85rpx;
					border-radius: 12rpx;
				}
			}
			.dyc-list-con {
				flex: 1;
				.dyc-list-name {
					display: inline-block;
					font-weight: 800;
					font-size: $uni-font-size-lg;
					color: #556B95;
				}
				
				.dyc-list-text {
					font-size: 34rpx;
					line-height: 38rpx;
				}
				.dyc-list-img1 {
					margin-top: 20rpx; 
					image {
						width: 100%;
					}
				}
				.dyc-list-img2 {
					display: flex;
					flex-flow: row wrap;
					margin-top: 20rpx;
					.dyc-list-img2-son {
						width: 30%;
						height: 180rpx;
						padding: 4rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				
				.dyc-local-list {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					.left-time-local {
						font-size: 26rpx;
						color: #666666;
						.left-local {
							margin-left: 30rpx;
						}
					}
					.right-praise {
						position: relative;
						
						.right-praise-img {
							font-size: 45rpx;
							color: #888;
							padding: 0 10rpx;
							box-sizing: border-box;
							border-radius: 8rpx;
							background-color: #F7F7F7;
							&:active {
								background-color: #C0C0C0;
							}
						}
						
						
						.tap-hover-color5 {
							background-color: #000000;
							.praise-item-icon {
								font-size: 36rpx !important;
								color: #D4D4D4;
							}
							.comment-item-icon {
								color: #D4D4D4;
							}
						}
						
						.praise-and-comment {
							display: flex;
							position: absolute;
							top: -19rpx;
							left: -340rpx;
							z-index: 101;
							background-color: #2E2E2E;
							color: #FFFFFF;
							font-size: $uni-font-size-base;
							border-radius: 5rpx;
							.praise-item {
								flex: 1;
								display: flex;
								align-items: center;
								white-space: nowrap;
								padding: 20rpx 30rpx;
								.praise-item-icon {
									min-width: 36rpx;
									font-size: $uni-font-size-lg;
									font-weight: 700;
								}
								.praise-item-text {
									min-width: $uni-font-size-base*2;
									margin-left: 10rpx;
								}
							}
							.comment-item {
								flex: 1;
								display: flex;
								align-items: center;
								white-space: nowrap;
								padding: 20rpx 30rpx;
								.comment-item-icon {
									font-size: $uni-font-size-lg;
									font-weight: 700;
								}
								.comment-item-text {
									margin-left: 10rpx;
								}
							}
							.praise-and-comment-porn {
								position: absolute;
								top: 50%;
								right: -8rpx;
								width: 20rpx;
								height: 20rpx;
								margin-top: -10rpx;
								background-color: #2E2E2E;
								z-index: 1;
								transform: rotate(45deg);
							}
						}
					}
				}
				
				
			}
			
			
		}
		.praise-comment {
			margin: 20rpx 30rpx 30rpx 30rpx;
			.praise-list {
				position: relative;
				display: flex;
				border-radius: 8rpx;
				padding: 10rpx 20rpx;
				background-color: #F7F7F7;
				&::after {
					content: '';
					position: absolute;
					bottom: -1rpx;
					left: 0;
					height: 1rpx;
					width: 100%;
					background-color: #fff;
					margin-bottom: 1rpx;
					z-index: 1;
				}
				.praise-list-right {
					flex: 1;
					display: flex;
					flex-flow: row wrap;
					.praise-item {
						width: 62rpx;
						height: 62rpx;
						margin: 5rpx;
						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
				}
			}
			.comment-list {
				display: flex;
				padding: 10rpx 20rpx;
				background-color: #F7F7F7;
				.comment-list-right {
					flex: 1;
					.comment-item {
						display: flex;
						margin: 20rpx 0;
						.comment-item-left {
							width: 62rpx;
							height: 62rpx;
							margin-right: 20rpx;
							image {
								width: 100%;
								height: 100%;
								border-radius: 10rpx;
							}
						}
						.comment-item-right {
							flex: 1;
							.comment-item-name-time {
								display: flex;
								justify-content: space-between;
								margin-right: 20rpx;
								.comment-item-name {
									font-size: $uni-font-size-base;
									color: #556B95;
									font-weight: 800;
								}
								.comment-item-time {
									font-size: $uni-font-size-sm;
									color: #888;
								}
							}
							.comment-item-btm {
								font-size: 30rpx;
								line-height: 30rpx;
								.comment-item-btm-reply {
									display: inline-block;
									margin-right: 8rpx;
									.comment-item-btm-reply-toUser {
										color: #556B95;
										font-weight: 800;
									}
								}
								&:active {
									background-color: #eee;
								}
							}
						}
					}
				}
			}
		}
		
		//评论输入框
		.comment-frame {
			display: flex;
			align-items: center;
			
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #F7F7F7;
			width: 100%;
			z-index: 80;
			textarea {
				flex: 1;
				font-size: $uni-font-size-lg;
				padding: 20rpx;
				background-color: #FFFFFF;
				max-height: 140rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}
			
			.comment-frame-icon {
				width: auto;
				font-size: 60rpx;
				margin-right: 20rpx;
			}
			.comment-frame-btm {
				width: auto;
				padding: 10rpx 30rpx;
				font-size: $uni-font-size-lg;
				border-radius: 10rpx;
				
				border: 1rpx solid $uni-text-color-disable;
				color: $uni-text-color-disable;
			}
			
			//评论输入框有内容时的样式
			.hasCommentContent {
				background-color: #1aad19;
				color: #fff;
			}
		}
		
	}
	
	.praise-list-left, .comment-list-left {
		width: auto;
		font-size: $uni-font-size-base;
		line-height: 80rpx;
		font-weight: bold;
		color: #586A93;
		margin-right: 10rpx;
	}
</style>
