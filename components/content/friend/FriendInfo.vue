<template>
	<view class="friendinfo">
		<block v-if="isMe">
			<view class="friendinfo-top">
				<view class="top-left" @tap="previewFriendHeadImg">
					<image :src=" imgUrl + userInfo.user.faceImage" mode="aspectFill"></image>
				</view>
				
				<view class="top-right">
					<view v-if="userInfo.user.nickname" class="memo-name">
						{{ userInfo.user.nickname }}
					</view>
					<view class="user-number little-font">
						卡丁号：{{ userInfo.user.userAccount }}
					</view>
					<block v-if="userInfo.user.region">
						<view class="localtion little-font">
							地区：{{ userInfo.user.region }}
						</view>
					</block>
				</view>
			</view>
			
			<view class="myborderlist">
				<default-list @click.native="toMyDynamic('myself')" :noBorderBtm="true">
					<view slot="def-list-left">
						我的动态
					</view>
				</default-list>
			</view>
			
			
			
			<view class="list3" hover-class="tap-hover-color">
				<view class="send-msg">
					发消息
				</view>
			</view>
		</block>
		
		<block v-else>
			<block v-if="friendCard[friendAccount]">
				<view class="friendinfo-top">
					<view class="top-left" @tap="previewFriendHeadImg">
						<image :src=" imgUrl + friendCard[friendAccount].friendFaceImage" mode="aspectFill"></image>
					</view>
					
					<view class="top-right">
						<block v-if="friendCard[friendAccount].friendRemarkName">
							<view class="memo-name">
								{{ friendCard[friendAccount].friendRemarkName }}
							</view>
						</block>
						<block v-if="friendCard[friendAccount].friendNickname">
							<view class="nickname little-font">
								昵称：{{ friendCard[friendAccount].friendNickname }}
							</view>
						</block>
						<view class="user-number little-font">
							卡丁号：{{ friendCard[friendAccount].friendAccount }}
						</view>
						<block v-if="friendCard[friendAccount].friendRegion">
							<view class="localtion little-font">
								地区：{{ friendCard[friendAccount].friendRegion }}
							</view>
						</block>
					</view>
				</view>
				
				
				<view class="myborderlist">
					<default-list @click.native="toChangeRemark" :noBorderBtm="true" class="myborderlist">
						<view slot="def-list-left">
							设置备注和标签
						</view>
						<view v-if="false" slot="def-list-center" class="def-list-center">
							群组1
						</view>
					</default-list>
					<default-list :noBorderBtm="true">
						<view slot="def-list-left">
							朋友权限
						</view>
						<view slot="def-list-center" class="def-list-center">
						</view>
					</default-list>
					
				</view>
				
				<view class="myborderlist">
					<default-list @click.native="toMyDynamic('other')">
						<view slot="def-list-left">
							朋友动态
						</view>
					</default-list>
					<default-list :noBorderBtm="true">
						<view slot="def-list-left">
							更多信息
						</view>
					</default-list>
				</view>
				
				
				
				<view @tap="toSession" class="list3 list3-border" hover-class="tap-hover-color">
					<view class="img">
						<text class="my-iconfont send-msg-img">&#xe60a;</text>
					</view>
					<view class="send-msg">
						发消息
					</view>
				</view>
				
				<view class="list4" hover-class="tap-hover-color">
					<view class="img">
						<text class="my-iconfont send-voice-img">&#xe62e;</text>
					</view>
					<view class="send-voice">
						语音通话
					</view>
				</view>
			</block>
		</block>
		
		<!-- #ifdef APP-PLUS -->
		<button type="default" size="mini">菜单</button>
		<!-- #endif -->
	</view>
</template>

<script>
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	import { getFriendInfo, delFriendRequest } from "@/network/addfriend.js"
	import { imgBaseUrl } from '@/common/helper.js'
	import { mapState, mapMutations, mapActions } from 'vuex'
	import { delFriendList } from '@/common/index.js'
	
	export default {
		components: {
			DefaultList
		},
		data() {
			return {
				friendAccount: '',
				imgUrl: '',
				isMe: false
			}
		},
		computed: {
			...mapState(['userInfo', 'rawMessageList', 'friendCard', 'friendList'])
		},
		methods: {
			...mapMutations(['setFriendCard']),
			...mapActions(['imAction']),
			//跳转到修改备注和标签页
			toChangeRemark() {
				uni.navigateTo({
					url: `/components/content/changefriendinfo/ChangeRemark?friendAccount=${this.friendCard[this.friendAccount].friendAccount}`
				})
			},
			//预览图片、保存图片
			previewFriendHeadImg() {
				const imgPath = this.isMe? `${imgBaseUrl}${this.userInfo.user.faceImage}` :`${imgBaseUrl}${this.friendCard[this.friendAccount].friendFaceImage}`
				uni.previewImage({
					urls: [imgPath],
					longPressActions: {
						itemList: ['保存到相册'],
						success: res => {
							console.log(res.tapIndex)
							if(res.tapIndex === 0) {
								uni.saveImageToPhotosAlbum({
									filePath: imgPath,
									success: res2 => {
										uni.showToast({
											title: '已保存到系统相册'
										})
									},
									fail: err2 => {
										uni.showToast({
											title: '保存失败,请稍后重试',
											icon: 'none'
										})
									}
								})
							}
						}
					}
				})
			},
			
			//获取好友个人信息
			doGetFriendInfo() {
				getFriendInfo(`?myAccount=${this.userInfo.user.userAccount}&friendAccount=${this.friendAccount}`).then(res => {
					console.log(res)
					//初始化朋友名片
					let tempFriendCard = Object.assign({}, this.friendCard)
					tempFriendCard[this.friendAccount] = res.data.data
					this.setFriendCard(tempFriendCard)
					console.log('this.friendCard', this.friendCard)
				}).catch(err => {
					uni.showToast({
						title: '您可能与服务器断开了连接',
						icon: 'none'
					})
					console.log(err)
				})
			},
			delFriend() {
				var _this = this
				const obj = {
					account: _this.userInfo.user.userAccount,
					friendAccount: _this.friendAccount
				}
				delFriendRequest(obj).then(res => {
					const tempCard = Object.assign({}, _this.friendCard)
					delete tempCard[_this.friendAccount]
					_this.setFriendCard(tempCard)
					
					const g = delFriendList(_this.friendList, _this.friendAccount)
					_this.friendList[g.ind1].list.splice(g.ind2, 1)
					console.log('_this.friendCard', _this.friendCard, _this.friendList)
					//还需要删除和这个好友的聊天记录
				})
			},
			
			toMyDynamic(params) {
				let url = '/components/content/dynamic/MyDynamic?account='
				if(params === 'myself') {
					url = url + this.userInfo.user.userAccount
				}else if(params === 'other') {
					url = url + this.friendAccount + `&friendRemarkName=${this.friendCard[this.friendAccount].friendRemarkName}`
				}
				uni.navigateTo({
					url
				})
			},
			toSession() {
				const session = 'p2p-' + this.friendAccount
				this.imAction({
					mode: 'CurrentChatTo_Change',
					session
				})
				uni.setStorageSync('toSessionObj', {
					chatType: 'p2p',
					chatTo: this.friendAccount
				})
				uni.navigateTo({
					url: "/components/content/session/Session"
				})
				
			}
		},
		onLoad(option) {
			this.imgUrl = imgBaseUrl
			uni.$on('changeFriendInfo', () => {
				this.$nextTick(() => {
					this.doGetFriendInfo()
				})
			})
			console.log(option)
			//查看自己资料
			if(option.friendAccount === this.userInfo.user.userAccount) {
				this.isMe = true
			}else {
				//获取朋友资料
				this.friendAccount = option.friendAccount
				this.isMe = false
				console.log('this.friendCard:', this.friendCard)
				if(this.friendCard[option.friendAccount]) {
					console.log('已经有名片了')
				}else {
					console.log('没有该好友名片')
				}
				this.doGetFriendInfo()
				
			}
		},
		
		onUnload() {
			uni.$off('changeFriendInfo', () => {})
		},
		onNavigationBarButtonTap(option) {
			var _this = this
			if(option.index === 0) {
				if(!_this.isMe) {
					uni.showActionSheet({
						itemList: ['设置备注和标签', '把他推荐给朋友', '加入黑名单', '删除'],
						success:res => {
							console.log(res)
							const tapIndex = res.tapIndex
							switch(tapIndex) {
								case 0:
									console.log('设置备注和标签')
									break
								case 1:
									console.log('把他推荐给朋友')
									break
								case 2:
									console.log('加入黑名单')
									break
								case 3:
									uni.showModal({
										title: "提示",
										content: "删除该好友,将同时删除与其的聊天记录",
										confirmText: "删除",
										confirmColor: "#DD524D",
										success: res => {
											if(res.confirm) {
												_this.delFriend()
											}
										}
									})
									break
							}
						},
						fail:err => {
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.friendinfo {
		background-color: #F8F8F8;
		height: 100vh;
		.friendinfo-top {
			display: flex;
			background-color: #FFFFFF;
			padding: 25rpx 0 55rpx 0;
			border-bottom: 1rpx solid rgba(100, 100, 100, .1);
			.top-left {
				padding: 0 30rpx;
				image {
					border-radius: 12rpx;
					width: 120rpx;
					height: 120rpx;
				}
			}
			.top-right {
				flex: 1;
				.memo-name {
					font-size: 40rpx;
					font-weight: bold;
				}
				.little-font {
					margin: 3rpx 0;
					font-size: 30rpx;
					color: #989898;
				}
			}
		}
		.myborderlist {
			margin-bottom: 25rpx;
		}
		
		.list3, .list4 {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 0;
			background-color: #FFFFFF;
			.img {
				margin-right: 15rpx;
				.send-msg-img, .send-voice-img {
					font-size: 50rpx;
					color: #576A92;
				}
			}
			.send-msg, .send-voice {
				font-size: 36rpx;
				color: #576A92;
			}
		}
		.list3-border {
			border-bottom: 1rpx solid rgba(100, 100, 100, .1);
		}
		
		
	}
</style>
