<template>
	<view class="dynamiccon">
		<view @tap="toMyDynamic" class="dynamiccon-top" hover-class="tap-hover-color">
			<text class="dynamiccon-top-left">我的动态</text>
			<view class="dynamiccon-top-right">
				<text class="dynamiccon-top-right-text">&#xe683;</text>
			</view>
		</view>
		<view class="dynamiccon-new">
			<view @tap="toInteraction" class="new-dynamic">
				<image src="../../../../static/image/test/test.jpg" mode="aspectFill"></image>
				<view class="new-dynamic-count">
					8条新消息
				</view>
			</view>
		</view>
		<view v-if="friendDynamicList.length > 0">
			<view v-for="(item, index) in friendDynamicList" :key="index" :data-index="index" class="dyc-list" :class="'dyc-list'+index">
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
						<image src="/static/image/test/test.jpg" mode="aspectFill"></image>
						
					</view> -->
					<view v-if="item.images" class="dyc-list-img2">
						<view @tap="toPreviewImg(item.images, imgIndex)" v-for="(imgItem, imgIndex) in item.images" :key="imgIndex" class="dyc-list-img2-son">
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
						</view>
					</view>
					
					<view class="praise-comment">
						<!-- 点赞列表，需判断列表第一个对象是否为空 -->
						<view v-if="item.likePerson.length > 0 && JSON.stringify(item.likePerson[0]) !== '{}'" class="praise-list" :class="{'praise-list-borderbtm': item.comment.length > 0}">
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
								<text @tap.stop="toFriendInfo(item3.user)" class="comment-list-item-name">{{ item3.userNickname }}</text><block  v-if="item3.commentFatherId !== 0"><text>回复</text><text @tap.stop="toFriendInfo(item3.toUser)" class="comment-list-item-name" v-if="item3.friendName">{{ item3.friendName }}</text></block>
								<text class="comment-list-item-text"><text class="colon">:</text><text :selectable="true">{{ item3.commentContent }}</text></text>
							</view>
						</view>
						
					</view>
					
					
				</view>
			</view>
		</view>
		
		<view v-else class="dynamic-loading">
			<view class="dynamic-loading-title">无动态</view>
		</view>
		
		<!-- 赞与评论按钮组 -->
		<view v-if="isShowPraise" @tap.stop="hidePraiseCommentMask" class="praise-and-comment-mask">
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
		</view>
		
		
		
		<!-- 评论输入框 -->
		<view v-if="hasComment" class="comment-frame">
			<textarea v-model="commentContent" :fixed="true" @focus="handleFocus" :focus="true" auto-height :placeholder="commentPlaceholder" />
			<view @tap.stop="handleSmilingFace" class="my-iconfont comment-frame-icon">&#xe611;</view>
			<view @tap.stop="publishComment" :class="{'hasCommentContent': commentContent.length > 0}" class="comment-frame-btm">发送</view>
		</view>
		
		
	</view>
</template>

<script>
	
	import { calcTimeHeader } from "@/utils/utils.js"
	import { mapState, mapActions } from 'vuex'
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
			...mapState(['userInfo', 'friendDynamicList']),
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
			
			//改变自己对该动态点赞的状态,并返回已点赞likePerson列表的下标
			queryMeHasPraise(index) {
				const obj = this.friendDynamicList[index]
				const likePersonObj = JSON.stringify(obj.likePerson[0])
				if(obj.likePerson.length > 0 && likePersonObj !== '{}') {
					console.log('已点赞')
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
			
			/* 发表评论：分评论模式和回复模式 */
			/*index为评论回复列表索引 未传即代表是第一次评论*/
			/* index不为空即是回复模式 */
			doComment(index=null) {
				const newObj = this.friendDynamicList[this.currentIndex]
				const obj = {
					user: this.userInfo.user.userAccount,
					toUser: index ? newObj.comment[index].user: newObj.account,
					commentContent: this.commentContent,
					friendCircleId: newObj.id,
					fatherId: index ? newObj.comment[index].commentId: 0
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
				console.time("time")
				//获取当前节点信息
				const query = uni.createSelectorQuery().in(this)
				query.select(`.right-praise-img${index}`).boundingClientRect(data => {
					console.log("得到布局位置信息:", data);
					
					//获取当前触摸的节点 距离顶部的高度
					const topHeight = data.top
					
					//弹窗样式
					this.popStyle = `top: ${topHeight-9}px; right:50px`
					this.$nextTick(() => {
						setTimeout(() => {
							this.isShowPraise = !this.isShowPraise
							this.currentIndex = index
							console.timeEnd("time")
						}, 10);
					});
				}).exec()
				
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
					console.log(res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							//判断当前是否为已点赞状态
							if(this.hasPraise) {
								//判断自己点赞的数据在哪，找到下标，并删除（取消点赞）
								const i = this.queryMeHasPraise(this.currentIndex)
								this.$nextTick(() => {
									this.friendDynamicList[this.currentIndex].likePerson.splice(i, 1)
									this.hasPraise = !this.hasPraise
								})
							}else {
								let appendObj = {}
								appendObj[this.userInfo.user.userAccount] = this.userInfo.user.nickname
								const likePerson1 = this.friendDynamicList[this.currentIndex].likePerson[0]
								
								this.$nextTick(() => {
									if(JSON.stringify(likePerson1) === '{}') {
										this.friendDynamicList[this.currentIndex].likePerson.splice(0, 1)
									}
									
									this.friendDynamicList[this.currentIndex].likePerson.push(appendObj)
									
									this.hasPraise = !this.hasPraise
									console.log(this.friendDynamicList[this.currentIndex])
								})
								
							}
							
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
			
			//点击评论按钮
			toComment() {
				console.time('toComment速度：')
				//评论以上的列表的总高度
				let beforeHeightAll = 0
				//获取选择评论的列表布局信息
				const query = uni.createSelectorQuery().in(this)
				//当前评论列表的index
				let index = this.currentIndex
				
				//获取评论列表上面的节点信息
				query.select('.dynamiccon-top').boundingClientRect(function(){
					
				}).exec(list => {
				})
				
				//获取所点击评论以上的评论列表的节点信息
				for (let i=0;i<index;i++)
				{ 
					query.select(`.dyc-list${i}`).boundingClientRect(function(){
						
					}).exec(list => {
					})
				}
				
				query.select(`.dyc-list${index}`).boundingClientRect(data => {
					console.log('后面的信息：',data)
					
				}).exec(list => {
					for(let i=0; i<list.length; i++)
					{
						beforeHeightAll += list[i].height
					}
					//选定评论列表的高度
					let lastHeight = list[index].height
					//选定评论列表的top
					let lastTop = list[index].top
					let lastScrollTop = beforeHeightAll-lastHeight-lastTop
					
					this.$nextTick(() => {
						
						//评论模式
						this.currentReplyindex = -1
						this.commentContent = ''
						this.commentPlaceholder = "评论"
						//隐藏点赞评论选择菜单
						this.hidePraiseCommentMask()
						//显示评论框
						this.hasComment = true
						console.timeEnd('toComment速度：')
						// uni.pageScrollTo({
						// 	scrollTop: lastScrollTop
						// })
						this.commentStyle = `top: ${lastTop+lastHeight}px; bottom: unset; `
						console.log(this.commentStyle)
					})
					
					
				})
			},
			//显示评论框（回复模式）
			showComment(index, index3) {
				//不可以回复自己，回复他人才弹出评论框
				if(this.friendDynamicList[index].comment[index3].user !== this.userInfo.user.userAccount) {
					this.commentContent = ''
					this.commentPlaceholder = `回复${this.friendDynamicList[index].comment[index3].userNickname}:`
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
			
			
			
			//跳转到用户个人信息
			toFriendInfo(friendAccount) {
				uni.navigateTo({
					url: `/components/content/friend/FriendInfo?friendAccount=${friendAccount}`
				})
			},
			
			//跳转到评论互动页
			toInteraction() {
				uni.navigateTo({
					url: '/components/content/interaction/Interaction'
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
			
			
			//评论框聚焦
			handleFocus(e) {
				if(e.detail.height) {
					//获取键盘高度
					this.keyboardHeight = e.detail.height
				}
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
								font-weight: bold;
								color: #586A93;
							}
						}
						.praise-list-name {
							padding: 0;
							margin: 0;
							color: #586A93;
							font-weight: 800;
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
						padding: 0 13rpx 13rpx 13rpx;
						box-sizing: border-box;
						.comment-list-item {
							position: relative;
							z-index: 1;
							font-size: 30rpx;
							line-height: 35rpx;
							padding-top: 10rpx;
							
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
			top: 35%;
			left: 43%;
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
