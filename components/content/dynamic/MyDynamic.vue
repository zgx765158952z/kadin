<template>
	<view class="my-dynamic">
		<block v-if="personDynamicList.length > 0">
			<block v-for="(item, index) in personDynamicList" :key="index" :data-index="index">
				<view class="dyc-list" :class="'dyc-list'+index">
					<view @tap="toFriendInfo(item.account)" class="dyc-list-head-img">
						<image :src="imgUrl + item.faceImage" mode="aspectFill"></image>
					</view>
					<view class="dyc-list-con">
						<view @tap="toFriendInfo(item.account)" class="dyc-list-name cliFontColor">
							{{ item.name }}
						</view>
						<view class="dyc-list-text">
							<text selectable="true">
								{{ item.content }}
							</text>
						</view>
						<!-- <view v-if="false" class="dyc-list-img1">
							<image src="/static/image/test/test.jpg" mode="widthFix"></image>
							
						</view> -->
						
						<!-- <view v-if="true" class="dyc-list-img2">
							<view @tap="toPreviewImg" class="dyc-list-img2-son">
								<image src="/static/image/test/test.jpg" mode="widthFix"></image>
							</view>
							<view @tap="toPreviewImg" class="dyc-list-img2-son">
								<image src="/static/image/test/test.jpg" mode="widthFix"></image>
							</view>
							<view @tap="toPreviewImg" class="dyc-list-img2-son">
								<image src="/static/image/test/test.jpg" mode="widthFix"></image>
							</view>
							<view @tap="toPreviewImg" class="dyc-list-img2-son">
								<image src="/static/image/test/test.jpg" mode="widthFix"></image>
							</view>
							<view @tap="toPreviewImg" class="dyc-list-img2-son">
								<image src="/static/image/test/test.jpg" mode="widthFix"></image>
							</view>
						</view> -->
						
						<view class="dyc-local-list">
							<view class="left-time-local">
								<text class="left-time">{{ item.time | getFormatTime }}</text>
								<text class="left-local">{{ item.location }}</text>
							</view>
							<view @tap.stop="handlerPraise(index)" class="right-praise" :class="'dynamic-right-praise'+index">
								<image class="right-praise-img" :class="'right-praise-img'+index" :data-index="index" src="/static/image/global/ellipsis.png"></image>
							</view>
						</view>
						
						<view class="praise-comment">
							
							<block v-if="item.likePerson.length > 0">
								<view class="praise-list" :class="{'praise-list-borderbtm': item.comment.length > 0}">
									<view class="praise-list-leftImg">
										<text class="my-iconfont praise-list-loveImg">&#xe617;</text>
									</view>
									<text v-for="(item2, index2) in item.likePerson" :key="index2">
										<text v-for="(value, key, ind1) in item2" @tap.stop="toFriendInfo(key)" :key="ind1" class="praise-list-name">
											<text class="praise-name">{{ value }}</text>
											<text class="praise-list-comma" v-if="(item.likePerson.length-1) === index2"></text>
											<text class="praise-list-comma" v-else>,</text>
										</text>
									</text>
									
									<!-- <text class="praise-list-name">
										<text class="praise-name">淘宝</text>
										<text class="praise-list-comma"></text>
									</text> -->
								</view>
							</block>
							
							
							<block v-if="item.comment.length > 0">
								<view class="comment-list">
									<view v-for="(item3, index3) in item.comment" :key="index3" @tap.stop="showComment(index,index3)" class="comment-list-item">
										<text @tap.stop="toFriendInfo(item3.user)" class="comment-list-item-name">{{ item3.userNickname }}</text><block  v-if="item3.commentFatherId !== 0"><text>回复</text><text @tap.stop="toFriendInfo(item3.toUser)" class="comment-list-item-name" v-if="item3.friendName">{{ item3.friendName }}</text></block>
										<text class="comment-list-item-text"><text class="colon">:</text><text :selectable="true">{{ item3.commentContent }}</text></text>
									</view>
								</view>
							</block>
							
						</view>
						
						
					</view>
				</view>
			</block>
		</block>
		
		
		
		<view v-else class="dynamic-loading">
			<view class="dynamic-loading-title">无动态</view>
		</view>
		
		<block v-if="isShowPraise">
			<view @tap.stop="hidePraiseCommentMask" class="praise-and-comment-mask">
				<view class="praise-and-comment" :style="popStyle">
					<view class="praise-item" @tap.stop="toPraise" hover-class="tap-hover-color5">
						<text class="my-iconfont praise-item-icon">&#xe617;</text>
						<text v-if="!hasPraise" class="praise-item-text">赞</text>
						<text v-else class="praise-item-text">取消</text>
					</view>
					<view @tap.stop="toComment" class="comment-item" hover-class="tap-hover-color5">
						<text class="my-iconfont comment-item-icon">&#xe60b;</text>
						<text class="comment-item-text">评论</text>
					</view>
				</view>
			</view>
		</block>
		
		
		<view v-if="hasComment" class="comment-frame">
			<textarea v-model="commentContent" :fixed="true" @focus="handleFocus" :focus="true" auto-height :placeholder="commentPlaceholder" />
			<view @tap.stop="handleSmilingFace" class="my-iconfont comment-frame-icon">&#xe611;</view>
			<view @tap.stop="publishComment" :class="{'hasCommentContent': commentContent.length > 0}" class="comment-frame-btm">发送</view>
		</view>
		
		
	</view>
</template>

<script>
	import { formatTimeStamp } from "@/common/index.js"
	import { mapState, mapActions } from 'vuex'
	import { imgBaseUrl } from '@/common/helper.js'
	import { doCommentRequest, doDynamicLikeRequest } from '@/network/dynamic.js'
		
	
	
	export default {
		data() {
			return {
				imgUrl: '',
				//控制点赞与评论按钮组的显示
				
				//当前页面url
				currentPageUrl: '',
				isShowPraise: false,
				//控制赞与取消
				hasPraise: false,
				//当前选中列表下标
				currentIndex: -1,
				//弹窗定位样式
				popStyle: "",
				//评论框的显示与隐藏
				hasComment: false,
				//输入框内容
				commentContent: '',
				//输入框表情的显示
				showSmilingFace: false,
				//当前回复评论的index
				currentReplyindex: -1,
				//评论提示内容
				commentPlaceholder: '评论',
				
				//评论框定位样式
				commentStyle: '',
				//键盘高度
				keyboardHeight: 253
			}
		},
		computed: {
			...mapState(['userInfo', 'personDynamicList'])
		},
		methods: {
			...mapActions(['doGetMyDynamicRequest', 'doGetPersonDynamicRequest']),
			
			//点赞与评论按钮组的显示、隐藏
			handlerPraise(index) {
				
				this.queryMeHasPraise(index)
				console.time("time")
				//获取当前节点信息
				const query = uni.createSelectorQuery().in(this)
				query.select(`.right-praise-img${index}`).boundingClientRect(data => {
					console.log("得到布局位置信息:", data);
					
					//获取当前触摸的节点 距离顶部的高度
					const topHeight = data.top
					
					//弹窗样式
					this.popStyle = `top: ${topHeight-9}px; right:45px`
					this.$nextTick(() => {
						setTimeout(() => {
							this.isShowPraise = !this.isShowPraise
							this.currentIndex = index
							console.timeEnd("time")
						}, 10);
					});
				}).exec()
				
			},
			//点击评论按钮
			toComment() {
				this.$nextTick(() => {
					
					//评论模式
					this.currentReplyindex = -1
					this.commentContent = ''
					this.commentPlaceholder = "评论"
					//隐藏点赞评论选择菜单
					this.hidePraiseCommentMask()
					//显示评论框
					this.hasComment = true
				})
				
			},
			//显示评论框（回复模式）
			showComment(index, index3) {
				//不可以回复自己，回复他人才弹出评论框
				if(this.personDynamicList[index].comment[index3].user !== this.userInfo.user.userAccount) {
					this.commentContent = ''
					this.commentPlaceholder = `回复${this.personDynamicList[index].comment[index3].userNickname}:`
					this.hasComment = true
					this.currentIndex = index
					this.currentReplyindex = index3
				}
				
				
			},
			
			
			//隐藏点赞和评论
			hidePraiseCommentMask() {
				this.$nextTick(() => {
					this.isShowPraise = false
					console.log('hidePraiseCommentMask')
				})
			},
			
			
			//点赞 或 取消点赞
			toPraise() {
				
				const newObj = this.personDynamicList[this.currentIndex]
				const obj = {
					account: newObj.account,
					likeAccount: this.userInfo.user.userAccount,
					friendCircleDynamicId: newObj.id
				}
				doDynamicLikeRequest(obj).then(res => {
					console.log(res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							this.$nextTick(() => {
								
								//判断当前是否为已点赞状态
								if(this.hasPraise) {
									//判断自己点赞的数据在哪，找到下标，并删除（取消点赞）
									const i = this.queryMeHasPraise(this.currentIndex)
									this.personDynamicList[this.currentIndex].likePerson.splice(i, 1)
									
								}else {
									let appendObj = {}
									appendObj[this.userInfo.user.userAccount] = this.userInfo.user.nickname
									this.personDynamicList[this.currentIndex].likePerson.push(appendObj)
								}
								this.hasPraise = !this.hasPraise
							})
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
				setTimeout(() => {
					this.hidePraiseCommentMask()
				}, 500)
			},
			
			//改变自己对该动态点赞的状态,并返回已点赞likePerson列表的下标
			queryMeHasPraise(index) {
				const obj = this.personDynamicList[index]
				if(obj.likePerson.length > 0) {
					const account = this.userInfo.user.userAccount
					for(let i=0; i<obj.likePerson.length; i++) {
						for(let key in obj.likePerson[i]) {
							if(key === account) {
								this.hasPraise = true
								return i
							}
						}
					}
				}else {
					this.hasPraise = false
					return false
				}
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
			
			/* 发表评论：分评论模式和回复模式 */
			/*index为评论回复列表索引 未传即代表是第一次评论*/
			/* index不为空即是回复模式 */
			doComment(index=null) {
				const newObj = this.personDynamicList[this.currentIndex]
				const obj = {
					user: this.userInfo.user.userAccount,
					toUser: index !== null ? newObj.comment[index].user: newObj.account,
					commentContent: this.commentContent,
					friendCircleId: newObj.id,
					fatherId: index !== null ? newObj.comment[index].commentId: 0
				}
				doCommentRequest(obj).then(res => {
					console.log(res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							this.$nextTick(() => {
								this.hasComment = false
								//更新评论成功后的数据
								const getData = res.data.data[res.data.data.length-1]
								this.personDynamicList[this.currentIndex].comment.push(getData)
							})
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
					uni.showToast({
						title: '程序走丢了，请稍后重试',
						icon: 'none'
					})
				})
			},
			
			//删除自己的某条动态
			delOneDynamic() {
				uni.showModal({
					title: '提示',
					content: '确定删除吗',
					success: res => {
						if(res.confirm) {
							uni.showToast({
								title: '已删除',
								icon: 'none'
							})
						}
					}
				})
			},
			//跳转到用户个人信息
			toFriendInfo(friendAccount) {
				uni.navigateTo({
					url: `/components/content/friend/FriendInfo?friendAccount=${friendAccount}`
				})
			},
			
			
			
			
			
			
			
			
			
			
			
			
			//评论框聚焦
			handleFocus(e) {
				if(e.detail.height) {
					//获取键盘高度
					this.keyboardHeight = e.detail.height
					console.log(this.keyboardHeight)
				}
			},
			//显示表情
			handleSmilingFace() {
				this.showSmilingFace = true
			}
			
		},
		filters: {
			//格式化时间戳为 9:10
			getFormatTime(timeStamp) {
				return formatTimeStamp(timeStamp, 'yyyy-MM-dd hh:mm')
			},
		},
		onLoad(option) {
			console.log('option:', option)
			let title = "我的动态"
			if(option.account != this.userInfo.user.userAccount) {
				//获取某个朋友的动态列表
				this.doGetPersonDynamicRequest({
					friendAccount: option.account
				})
				title = `${option.friendRemarkName}的动态`
			}else {
				//获取自己的动态列表
				this.doGetMyDynamicRequest({
					account: this.userInfo.user.userAccount
				})
			}
			uni.setNavigationBarTitle({
			    title
			});
			this.imgUrl = imgBaseUrl
			
		},
		//监听页面滚动
		onPageScroll(e) {
			if(this.isShowPraise) {
				this.isShowPraise = false
			}
			if(!this.hasComment) {
				return
			}
			
			
			if(this.currentReplyindex !== -1) {
				console.log('currentReplyindex=-1')
				this.currentReplyindex = -1
			}
			this.commentContent = ''
			this.hasComment = false
		},
	}
</script>

<style lang="scss">
	.my-dynamic {
		.dyc-list {
			display: flex;
			padding: 20rpx 20rpx 50rpx 20rpx;
			border-bottom: 1rpx solid rgba(120, 120, 120, .1);
			.dyc-list-head-img {
				width: auto;
				margin-right: 20rpx;
				image {
					width: 90rpx;
					height: 90rpx;
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
						width: 32%;
						margin: 0 2rpx;
						image {
							width: 100%;
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
						image {
							display: flex;
							align-items: center;
							width: 45rpx;
							height: 45rpx;
							padding: 0 10rpx;
							border-radius: 8rpx;
							background-color: #F7F7F7;
						}
						image:active {
							background-color: #C0C0C0;
						}
					}
				}
				
				.praise-comment {
					background-color: #F7F7F7;
					margin-top: 20rpx;
					.praise-list {
						font-size: 30rpx;
						line-height: 38rpx;
						padding: 10rpx;
						box-sizing: border-box;
						.praise-list-leftImg {
							position: relative;
							display: inline-block;
							.praise-list-loveImg {
								font-size: $uni-font-size-sm;
								font-weight: bold;
								color: #586A93;
							}
						}
						.praise-list-name {
							padding: 0;
							margin: 0;
							color: #586A93;
							font-weight: 800;
							.praise-list-comma {
								margin-right: 5rpx;
							}
							.praise-name:active {
								color:#999999;
							}
						}
					}
					
					.praise-list-borderbtm {
						border-bottom: 1rpx solid rgba(100, 100, 100, .05);
					}
					.comment-list {
						padding: 13rpx;
						box-sizing: border-box;
						.comment-list-item {
							position: relative;
							z-index: 1;
							font-size: 30rpx;
							line-height: 35rpx;
							padding: 5rpx 0;
							
							
							.comment-list-item-name {
								position: relative;
								z-inde: 2;
								color: #586A93;
								font-weight: 800;
							}
							.comment-list-item-text {
								color: #484848;
								.colon {
									margin-right: 10rpx;
								}
							}
							.comment-list-item-name:active {
								color: #000099;
							}
						}
						.comment-list-item:active {
							background-color: #D8D8D8;
						}
					}
					
				}
			}
		}
		.dynamic-loading {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			.dynamic-loading-title {
				font-size: $uni-font-size-lg;
				color: $uni-text-color-disable;
				text-align: center;
				margin-top: 30rpx;
			}
		}
		
		
		//评论输入框
		.comment-frame {
			display: flex;
			align-items: center;
			align-content: center;
			
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
				font-size: 50rpx;
				margin-right: 20rpx;
			}
			.comment-frame-btm {
				width: auto;
				padding: 10rpx 30rpx;
				font-size: $uni-font-size-lg;
				border-radius: 10rpx;
				
				border: 4rpx solid $uni-text-color-disable;
				color: $uni-text-color-disable;
			}
			
			//评论输入框有内容时的样式
			.hasCommentContent {
				background-color: #1aad19;
			}
		}
		
	}
	
	
	
	.praise-and-comment-mask {
		position: fixed;
		z-index: 99;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		
		.praise-and-comment {
			display: flex;
			position: fixed;
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
					font-weight: bold;
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
					font-weight: bold;
				}
				.comment-item-text {
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
