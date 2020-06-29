<template>
	<view class="dynamiccon">
		<button @tap="toSingleDynamic" type="default" size="mini">单个动态</button>
		<view @tap="toMyDynamic" class="dynamiccon-top" hover-class="tap-hover-color">
			<text class="dynamiccon-top-left">我的动态</text>
			<view class="dynamiccon-top-right">
				<text class="dynamiccon-top-right-text">&#xe683;</text>
			</view>
		</view>
		<view v-if="newCommentCount" class="dynamiccon-new">
			<view @tap="toInteraction" class="new-dynamic">
				<!-- <image src="../../../../static/image/test/test.jpg" mode="aspectFill"></image> -->
				<view class="new-dynamic-count">
					{{ newCommentCount }}条新消息
				</view>
			</view>
		</view>
		<view v-if="friendDynamicList.length > 0">
			<view @tap.stop="hideAll" v-for="(item, index) in friendDynamicList" :key="index" :data-index="index" class="dyc-list" :class="'dyc-list'+index">
				<view class="dyc-list-head-img">
					<image @tap.stop="toFriendInfo(item.account)" :src="imgUrl + item.faceImage" mode="aspectFill"></image>
				</view>
				<view class="dyc-list-con">
					<view @tap.stop="toFriendInfo(item.account)" class="dyc-list-name cliFontColor">
						{{ item.name }}
					</view>
					<view class="dyc-list-text">
						<text selectable="true">
							{{ item.content }}
						</text>
					</view>
					<!-- <view v-if="false" class="dyc-list-img1">
						<image src="/static/image/test/test.jpg" mode="aspectFill"></image>
						
					</view> -->
					<view v-if="item.images && item.images[0]!='null' " class="dyc-list-img2">
						<view @tap.stop="toPreviewImg(item.images, imgIndex)" v-for="(imgItem, imgIndex) in item.images" :key="imgIndex" class="dyc-list-img2-son">
							<image :src="imgUrl + imgItem" mode="aspectFill"></image>
						</view>
					</view>
					
					<!-- 时间与定位 -->
					<view class="dyc-local-list">
						<view class="left-time-local">
							<text class="left-time">{{ item.time | getFormatTime }}</text>
							<text class="left-local">{{ item.location }}</text>
						</view>
						<view @tap.stop="handlerPraise(index)" class="right-praise" :class="'dynamic-right-praise'+index">
							<text class="my-iconfont right-praise-img" :class="'right-praise-img'+index">&#xe625;</text>
							<!-- 赞与评论按钮组 -->
							<view v-if="isShowPraise && currentIndex == index" class="praise-and-comment" :class="{'effect-in': isShowPraise}">
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
					
					<view class="praise-comment">
						<!-- 点赞列表，需判断列表第一个对象是否为空 -->
						<view v-if="item.likePerson != null && item.likePerson.length > 0" class="praise-list" :class="{'praise-list-borderbtm': item.comment.length > 0}">
							<view class="praise-list-leftImg">
								<text class="my-iconfont praise-list-loveImg">&#xe617;</text>
							</view>
							<text v-for="(item2, index2) in item.likePerson" :key="index2">
								<text v-for="(value, key, ind1) in item2" :key="ind1" @tap.stop="toFriendInfo(key)" class="praise-list-name">
									<text class="praise-name">{{ item2[key] }}</text>
									<text class="praise-list-comma" v-if="index2 === item.likePerson.length-1"></text>
									<text class="praise-list-comma" v-else>,</text>
								</text>
							</text>
							
						</view>
						
						<!-- 评论列表 -->
						<view v-if="item.comment.length > 0" class="comment-list">
							<view v-for="(item3, index3) in item.comment" :key="index3" @tap.stop="showComment(index,index3)" class="comment-list-item">
								<text @tap.stop="toFriendInfo(item3.user)" class="comment-list-item-name">{{ item3.userNickname }}</text><block v-if="item3.commentFatherId !== 0"><text class="reply-text">回复</text><text @tap.stop="toFriendInfo(item3.toUser)" class="comment-list-item-name" v-if="item3.friendName">{{ item3.friendName }}</text></block>
								<text class="comment-list-item-text"><text class="colon">:</text><text :selectable="true">{{ item3.commentContent }}</text></text>
							</view>
						</view>
						
					</view>
					
					
				</view>
			</view>
		</view>
		
		
		<!-- 赞与评论按钮组 -->
		<!-- <view v-if="isShowPraise" @tap.stop="hidePraiseCommentMask" class="praise-and-comment-mask">
			<view class="praise-and-comment" :class="isShowPraise?'effect-in':'effect-hide'" :style="popStyle">
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
		</view> -->
		
		
		
		<!-- 评论输入框 -->
		<view v-if="hasComment" class="comment-frame">
			<textarea v-model="commentContent" :fixed="true" adjust-position auto-height :placeholder="commentPlaceholder" />
			<view @tap.stop="handleSmilingFace" class="my-iconfont comment-frame-icon">&#xe611;</view>
			<view @tap.stop="publishComment" :class="{'hasCommentContent': commentContent.length != 0}" class="comment-frame-btm">发送</view>
		</view>
		
		
	</view>
</template>

<script>
	
	import { calcTimeHeader } from "@/utils/utils.js"
	import { mapState, mapMutations, mapActions } from 'vuex'
	import { doCommentRequest, doDynamicLikeRequest } from '@/network/dynamic.js'
	import { imgBaseUrl } from '@/common/helper.js'
	
	export default {
		props: {
			imgUrl: {
				type: String,
				default() {
					return ''
				}
			}
		},
		data() {
			return {
				//当前页面url
				currentPageUrl: '',
				//控制点赞与评论按钮组的显示
				isShowPraise: false,
				
				//控制赞与取消
				hasPraise: false,
				//当前选中列表下标
				currentIndex: -1,
				
				//评论框的显示与隐藏
				hasComment: false,
				//输入框内容
				commentContent: '',
				//当前回复评论的index
				currentReplyindex: -1,
				//评论提示内容
				commentPlaceholder: '评论',
				//输入框表情的显示
				showSmilingFace: false,
				
				//弹窗定位样式
				popStyle: "",
				
				//评论框定位样式
				commentStyle: '',
			}
		},
		computed: {
			...mapState(['userInfo', 'friendDynamicList', 'newCommentCount']),
			
		},
		watch: {
			hasComment(newV) {
				if(newV) {
					uni.hideTabBar()
				}else {
					uni.showTabBar()
				}
			}
		},
		filters: {
			//格式化时间戳为 9:10
			getFormatTime(timeStamp) {
				return calcTimeHeader(timeStamp)
			}
			
		},
		methods: {
			
			...mapMutations(['clearNewData']),
			//改变自己对该动态点赞的状态,并返回已点赞likePerson列表的下标
			queryMeHasPraise(index) {
				const obj = this.friendDynamicList[index]
				// const likePersonObj = JSON.stringify(obj.likePerson[0])
				if(obj.likePerson) {
					console.log('已点赞')
					const account = this.userInfo.user.userAccount
					for(let i=0; i<obj.likePerson.length; i++) {
						for(let key in obj.likePerson[i]) {
							if(key === account) {
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
				const newObj = this.friendDynamicList[this.currentIndex]
				const obj = {
					user: this.userInfo.user.userAccount,
					toUser: index !== null ? newObj.comment[index].user: newObj.account,
					commentContent: this.commentContent,
					friendCircleId: newObj.id,
					fatherId: index !== null ? newObj.comment[index].commentId: 0
				}
				doCommentRequest(obj).then(res => {
					console.log('评论成功:', res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							this.$nextTick(() => {
								this.hasComment = false
								//更新评论成功后的数据
								const getData = res.data.data[res.data.data.length-1]
								this.friendDynamicList[this.currentIndex].comment.push(getData)
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
			//点赞与评论按钮组的显示、隐藏
			handlerPraise(index) {
				this.queryMeHasPraise(index)
				if(this.isShowPraise) {
					if(index == this.currentIndex) {
						this.isShowPraise = false
					}else {
						this.currentIndex = index
					}
				}else {
					this.isShowPraise = true
					this.currentIndex = index
				}
			},
			//点赞 或 取消点赞
			toPraise() {
				const newObj = this.friendDynamicList[this.currentIndex]
				const obj = {
					account: newObj.account,
					likeAccount: this.userInfo.user.userAccount,
					friendCircleId: newObj.id
				}
				doDynamicLikeRequest(obj).then(res => {
					if(res.status === 200 && res.data.code === 2000) {
						//判断当前是否为已点赞状态
						if(this.hasPraise) {
							//判断自己点赞的数据在哪，找到下标，并删除（取消点赞）
							const i = this.queryMeHasPraise(this.currentIndex)
							this.$nextTick(() => {
								this.friendDynamicList[this.currentIndex].likePerson.splice(i, 1)
							})
						}else {
							let appendObj = {}
							appendObj[this.userInfo.user.userAccount] = this.userInfo.user.nickname
							
							this.$nextTick(() => {
								if(this.friendDynamicList[this.currentIndex].likePerson === null) {
									let addList = []
									addList.push(appendObj)
									this.friendDynamicList[this.currentIndex].likePerson = addList
									
								}else {
									this.friendDynamicList[this.currentIndex].likePerson.push(appendObj)
								}
								
								
								console.log(this.friendDynamicList[this.currentIndex])
							})
							
						}
						
						this.hasPraise = !this.hasPraise
						this.hidePraiseCommentMask()
						console.log('this.friendDynamicList:', this.friendDynamicList[this.currentIndex])
					}
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: '程序走丢了，请稍后重试',
						icon: 'none'
					})
				})
			},
			
			//点击评论按钮
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
			//显示评论框（回复模式）
			showComment(index, index3) {
				//不可以回复自己，回复他人才弹出评论框
				if(this.friendDynamicList[index].comment[index3].user !== this.userInfo.user.userAccount) {
					this.isShowPraise = false
					this.commentContent = ''
					this.commentPlaceholder = `回复${this.friendDynamicList[index].comment[index3].userNickname}:`
					this.hasComment = true
					this.currentIndex = index
					this.currentReplyindex = index3
				}
			},
			
			
			
			//隐藏点赞和评论
			hidePraiseCommentMask() {
				this.isShowPraise = false
				console.log('hidePraiseCommentMask')
			},
			
			//清除所有正在操作的动作,即还原为原始状态
			hideAll() {
				console.log('hideAll')
				if(this.isShowPraise) {
					this.isShowPraise = false
				}
				if(this.hasComment) {
					this.commentContent = ''
					this.hasComment = false
				}
				if(this.currentReplyindex !== -1) {
					this.currentReplyindex = -1
				}
			},
			//跳转到用户个人信息
			toFriendInfo(friendAccount) {
				uni.navigateTo({
					url: `/components/content/friend/FriendInfo?friendAccount=${friendAccount}`
				})
			},
			
			//跳转到评论互动页
			toInteraction() {
				uni.navigateTo({
					url: '/components/content/interaction/Interaction',
					success: res => {
						this.clearNewData('clearnewCommentCount')
					}
				})
			},
			
			//跳转到浏览单个动态
			toSingleDynamic() {
				uni.navigateTo({
					url: '/components/content/dynamic/SingleDynamic?friendCircleId=13'
				})
			},
			
			//预览图片等操作
			toPreviewImg(images, imgIndex) {
				let imgList = Object.assign([], images)
				for(let i=0; i<imgList.length; i++) {
					imgList[i] = this.imgUrl + imgList[i]
				}
				console.log('imgList', imgList)
				let itemList = ['发送给朋友', '保存图片', '收藏']
				//预览图片
				uni.previewImage({
					urls: imgList,
					indicator: 'default',
					current: imgIndex,
					longPressActions: {
						itemList,
						success: data => {
							switch(data.tapIndex) {
								case 0:
									break;
								case 1:
									//保存图片到系统相册
									uni.saveImageToPhotosAlbum({
										filePath: imgList[data.index],
										success(data2) {
											uni.showToast({
												title: '已保存到系统相册'
											})
											return
										},
										fail(err2) {
											console.log(err2)
										}
									})
									break;
								case 2:
									break;
							}
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})
			},
			
			
			
			
			
			//跳转到MyDynamic
			toMyDynamic() {
				uni.navigateTo({
					url: `/components/content/dynamic/MyDynamic?account=${this.userInfo.user.userAccount}`
				})
			},
			
			
			//显示表情
			handleSmilingFace() {
				this.showSmilingFace = true
			}
			
		},
	}
</script>

<style scoped lang="scss">

	.dynamiccon {
		.dynamiccon-top {
			display: flex;
			padding: 20rpx 30rpx;
			border-bottom: 1rpx solid rgba(100, 100, 100, .05);
			.dynamiccon-top-left {
				width: auto;
				font-size: $uni-font-size-lg;
			}
			.dynamiccon-top-right {
				flex: 1;
				text-align: right;
				.dynamiccon-top-right-text {
					font-family: 'iconfont';
					font-size: $uni-font-size-lg;
					color: #707070;
				}
			}
		}
		.dynamiccon-new {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 20rpx 0;
			.new-dynamic {
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;
				padding: 14rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
				background-color: #575757;
				&:active {
					background-color: #333;
				}
				image {
					width: 65rpx;
					height: 65rpx;
					border-radius: 10rpx;
				}
				.new-dynamic-count {
					font-size: 32rpx;
					margin: 0 30rpx;
					text-align: center;
					color: #fff;
				}
			}
		}
		.dyc-list {
			display: flex;
			padding: 15rpx 30rpx 30rpx 30rpx;
			border-bottom: 1rpx solid rgba(100, 100, 100, .05);
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
					font-size: 34rpx;
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
								font-size: $uni-font-size-base;
								font-weight: 700;
								color: #586A93;
							}
						}
						.praise-list-name {
							padding: 0;
							margin: 0;
							color: #586A93;
							font-weight: 700;
							z-index: 1;
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
						padding: 0 13rpx;
						box-sizing: border-box;
						.comment-list-item {
							position: relative;
							z-index: 1;
							font-size: 30rpx;
							line-height: 35rpx;
							padding: 10rpx 0;
							
							.comment-list-item-name {
								position: relative;
								z-inde: 2;
								color: #586A93;
								font-weight: 700;
							}
							.reply-text {
								font-size: $uni-font-size-base;
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
</style>
