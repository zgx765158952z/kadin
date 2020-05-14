<template>
	<view class="indecon">
		<!-- <view class="indecon-list">
			<view class="indecon-item indecon-item1">
				<text class="indecon-item-img1 my-iconfont">&#xe60a;</text>
				<view class="indecon-item-info">
					<view class="indecon-item-info-top">
						<view class="indecon-item-info-top-title">
							消息中心
						</view>
					</view>
				</view>
			</view>
		</view> -->

		<view class="indecon-list" @tap="tapList">
		
			<view @tap="toSession" @longpress="handlerLongtap" :class="{'index-list-active': pickerUserIndex === index}"
			 v-for="(item, index) in MconvertRawMessageListToRenderChatList" :key="index" :data-account="item.account" :data-session="item.session" :data-index="index" class="indecon-item">
				<view class="indecon-item-img">
					<image :src="imgUrl + getFriendInfoByAcccount('p2p', item.account, 'friendFaceImage')" mode="aspectFill"></image>
					<view v-if="item.unread > 0" class="indecon-item-img-unread">{{ item.unread }}</view>
				</view>
				<view class="indecon-item-info">
					<view class="indecon-item-info-top">
						<view v-if="item.chatType === 'p2p'" class="indecon-item-info-top-title">
							{{ getFriendInfoByAcccount('p2p', item.account, 'friendRemarkName') }}
						</view>
						<view v-if="item.chatType === 'advanced'" class="indecon-item-info-top-title">
							{{ item.nick }}
						</view>
						<view class="indecon-item-info-top-time">
							{{ item.displayTime }}
						</view>
					</view>
					<view class="indecon-item-info-bottom">
						<view class="indecon-item-info-bottom-msg">
							{{ item.lastestMsg }}
						</view>
						<text v-if="false" class="my-iconfont msg-icon">&#xe626;</text>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="indecon-list" @tap="tapList">

			<view @tap="toSession" @longpress="handlerLongtap" :class="{'index-list-active': pickerUserIndex === index}"
			 v-for="(item, index) in rawMessageList" :key="index" :data-account="message.account" :data-session="message.session" :data-index="index" class="indecon-item">
				<view class="indecon-item-img">
					<image :src="imgUrl + getFriendInfoByAcccount(item.scene, item.target, 'friendFaceImage')" mode="aspectFill"></image>
					<view v-if="item.unread>0" class="indecon-item-img-unread">{{ item.unread }}</view>
				</view>
				<view class="indecon-item-info">
					<view class="indecon-item-info-top">
						<view v-if="item.scene === 'p2p'" class="indecon-item-info-top-title">
							{{ getFriendInfoByAcccount(item.scene, item.target, 'friendRemarkName') }}
						</view>
						<view v-if="item.scene === 'team'" class="indecon-item-info-top-title">
							{{ item.attach.team.name }}
						</view>
						<view class="indecon-item-info-top-time">
							{{ item.time }}
						</view>
					</view>
					<view class="indecon-item-info-bottom">
						<view class="indecon-item-info-bottom-msg">
							{{ item.text }}
						</view>
						<text v-if="false" class="my-iconfont msg-icon">&#xe626;</text>
					</view>
				</view>
			</view>
		</view> -->

		<view @longpress="handlerLongtap">22222</view>

		<view class="def-popup">
			<view @tap="hidePop" @touchmove.stop.prevent="moveHandle" v-if="showPop" class="def-popup-mask">
				<view class="def-popup-list" :class="showPopList? 'effect-in' : 'effect-hide'" :style="popStyle">
					<view @tap="choosePop(index)" v-for="(item, index) in popList" :key="index" class="def-popup-item" hover-class="tap-hover-color">
						{{ item }}
					</view>
				</view>
			</view>
		</view>
		

	</view>
</template>

<script>
	import {
		listPopShadeMixin
	} from '@/common/utils.js'
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	import {
		imgBaseUrl
	} from "@/common/helper.js"

	import {
		calcTimeHeader
	} from '@/utils/utils.js'

	let app = getApp()
	export default {
		name: 'IndexContent',
		data() {
			return {
				chatList: [], //会话列表
				userList: [],
				imgUrl: '',
				targetInfo: {}
			}
		},
		computed: {
			...mapState(['friendList', 'rawMessageList', 'friendCard', 'groupList', 'unreadInfo']),
			...mapGetters(['getFriendInfoByAcccount', 'MconvertRawMessageListToRenderChatList']),
			
			/**
			 * 将原生消息转化为最近会话列表渲染数据
			 */
			o_convertRawMessageListToRenderChatList() {
				let chatList = []
				let sessions = Object.keys(this.rawMessageList)
				let index = 0
				sessions.map(session => { //遍历原始消息列表的键sessionId
					let account = session.indexOf('team-') === 0 ? session.slice(5, session.length) : session.slice(4, session.length)
					let isP2p = session.indexOf('p2p-') === 0
					let chatType = isP2p ? 'p2p' : (this.groupList[account] && this.groupList[account].type)
					let sessionCard = (isP2p ? this.friendCard[account] : this.groupList[account]) || {}
					let unixtimeList = Object.keys(this.rawMessageList[session]) //遍历原始消息对应sessionId的属性的键(即时间戳)
					if (!unixtimeList) {
						return
					}
					let maxTime = Math.max(...unixtimeList) //返回时间戳数组中最大即最新的时间戳,时间戳对应的属性就是对应该消息
					if (maxTime) { //处理单条消息,后作为首页的会话列表展示
						let msg = this.rawMessageList[session][maxTime + ''] || {} //取到最新消息
						let msgType = this.judgeMessageType(msg)
						let lastestMsg = msgType
						let status = isP2p ? (sessionCard.status || '离线') : '' //名片信息
						let nick = isP2p ? (sessionCard.nick || '非好友') : sessionCard.name
						// let avatar =  isP2p ? (sessionCard.avatar || app.globalData.PAGE_CONFIG.defaultUserLogo) : (sessionCard.avatar || app.globalData.PAGE_CONFIG.defaultUserLogo)
						chatList.push({
							chatType,
							session,
							account,
							status,
							nick, //名字
							// avatar, //头像
							lastestMsg: lastestMsg || msg.text,
							type: msgType || msg.type,
							timestamp: msg.time,
							unread: this.unreadInfo[session] || 0,
							displayTime: msg.time ? calcTimeHeader(msg.time) : ''
						})
					}
				})
				// 排序
				chatList.sort((a, b) => {
					return b.timestamp - a.timestamp
				})
				console.log('chatList:', chatList, this.rawMessageList)
				
				return chatList
			}
		}, 
		watch: {
			MconvertRawMessageListToRenderChatList: {
				deep:true, //深度监听设置为 true
				handler(newV){
					console.log('MconvertRawMessageListToRenderChatList：',newV)
				}
			},
			rawMessageList: {
				handler(newV,oldV){
					console.log('监听rawMessageList', newV, oldV)
					if(newV !== oldV) {
						this.convertRawMessageListToRenderChatList()
					}
				},
				deep:true //深度监听设置为 true
			},
			unreadInfo: {
				deep:true, //深度监听设置为 true
				handler(newV){
					console.log('watch中：',newV)
				}
			}
		},
		mixins: [listPopShadeMixin],
		methods: {
			...mapActions(['imAction']),
			...mapMutations(['setCurrentChatTo', 'setCurrentGroup']),
			/**
			 * 将原生消息转化为最近会话列表渲染数据
			 */
			convertRawMessageListToRenderChatList(rawMsgList=null) {
				
				let chatList = []
				let sessions = Object.keys(this.rawMessageList)
				let index = 0
				sessions.map(session => { //遍历原始消息列表的键sessionId
					let account = session.indexOf('team-') === 0 ? session.slice(5, session.length) : session.slice(4, session.length)
					let isP2p = session.indexOf('p2p-') === 0
					let chatType = isP2p ? 'p2p' : (this.groupList[account] && this.groupList[account].type)
					let sessionCard = (isP2p ? this.friendCard[account] : this.groupList[account]) || {}
					let unixtimeList = Object.keys(this.rawMessageList[session]) //遍历原始消息对应sessionId的属性的键(即时间戳)
					if (!unixtimeList) {
						return
					}
					let maxTime = Math.max(...unixtimeList) //返回时间戳数组中最大即最新的时间戳,时间戳对应的属性就是对应该消息
					if (maxTime) { //处理单条消息,后作为首页的会话列表展示
						let msg = this.rawMessageList[session][maxTime + ''] || {} //取到最新消息
						let msgType = this.judgeMessageType(msg)
						let lastestMsg = msgType
						let status = isP2p ? (sessionCard.status || '离线') : '' //名片信息
						let nick = isP2p ? (sessionCard.nick || '非好友') : sessionCard.name
						// let avatar =  isP2p ? (sessionCard.avatar || app.globalData.PAGE_CONFIG.defaultUserLogo) : (sessionCard.avatar || app.globalData.PAGE_CONFIG.defaultUserLogo)
						chatList.push({
							chatType,
							session,
							account,
							status,
							nick, //名字
							// avatar, //头像
							lastestMsg: lastestMsg || msg.text,
							type: msgType || msg.type,
							timestamp: msg.time,
							unread: this.unreadInfo[session] || 0,
							displayTime: msg.time ? calcTimeHeader(msg.time) : ''
						})
					}
				})
				// 排序
				chatList.sort((a, b) => {
					return b.timestamp - a.timestamp
				})
				console.log('chatList:', chatList, this.rawMessageList)
				
				this.chatList = chatList
				
			},
			
			/**
			 * 判断消息类型，返回提示
			 */
			judgeMessageType(rawMsg) {
				rawMsg = rawMsg || {}
				let msgType = ''
				if (rawMsg.type === 'image') {
					msgType = '[图片]'
				} else if (rawMsg.type === 'geo') {
					msgType = '[位置]'
				} else if (rawMsg.type === 'audio') {
					msgType = '[语音]'
				} else if (rawMsg.type === 'video') {
					msgType = '[视频]'
				} else if (rawMsg.type === 'custom') {
					msgType = rawMsg.pushContent || '[自定义消息]'
				} else if (rawMsg.type === 'tip') {
					msgType = '[提醒消息]'
				} else if (rawMsg.type === 'deleteMsg') { //可能是他人撤回消息
					msgType = '[提醒消息]'
				} else if (rawMsg.type === 'file') {
					msgType = '[文件消息]'
				} else if (rawMsg.type === '白板消息') {
					msgType = '[白板消息]'
				} else if (rawMsg.type === '阅后即焚') {
					msgType = '[阅后即焚]'
				} else if (rawMsg.type === 'robot') {
					msgType = '[机器人消息]'
				} else if (rawMsg.type === 'notification') {
					msgType = '[通知消息]'
				}
				return msgType
			},

			//点击菜单的下标index
			choosePop(index) {
				return index
			},
			
			
			
			//跳转到session
			toSession(e) {
				let account = e.currentTarget.dataset.account
				let session = e.currentTarget.dataset.session
				console.log('account和session:', account, session)
				// 更新会话对象
				this.setCurrentChatTo(session)
				let typeAndAccount = session.split('-') //分割team-2356565
				let chatType = ''
				if (typeAndAccount[0] === 'team') {
				  console.log('team跳转')
				  let card = this.groupList[typeAndAccount[1]] || {}
				  chatType = card.type || 'team'
				  this.setCurrentGroup(account)
				} else {
				  console.log('p2p跳转')
				  chatType = 'p2p'
				}
				uni.setStorageSync('toSessionObj', {
					chatType,
					chatTo: account
				})
				//跳转
				uni.navigateTo({
					url: '/components/content/session/Session',
					success: res => {
						// 告知服务器，标记会话已读
						app.globalData.nim.resetSessionUnread(session)
					}
				})
				
			}

		},
		beforeCreate() {
			this.imgUrl = imgBaseUrl
			console.log('beforeCreate', this.imgUrl)
			
		},
		mounted() {
			console.log('mounted')
			uni.$once('syncComplete', () => {
				this.$nextTick(() => {
					this.$forceUpdate()
				})
				this.$forceUpdate()
			})
			
		}
		
	}
</script>

<style scoped lang="scss">
	/*弹性盒子*/

	.indecon-item,
	.indecon-item-info-top,
	.indecon-item-info-bottom,
		{
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}

	.indecon-item-img,
	.indecon-item-img-unread {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.indecon {
		.msg-center {
			.my-iconfont {
				font-size: 80rpx;
			}
		}

		.indecon-item1 {
			border-bottom: 1rpx solid rgba(100, 100, 100, .05);

			.indecon-item-img1 {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80rpx;
				height: 80rpx;
				margin-right: 30rpx;
				font-size: 60rpx;
				color: #FFFFFF;
				background-color: #55A532;
				border-radius: 100%;
			}
		}

		.indecon-list {

			.indecon-item {
				position: relative;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				margin-top: 1px;

				.indecon-item-img {
					position: relative;

					image {
						height: 90rpx;
						width: 90rpx;
						border-radius: 8rpx;
						margin-right: 20rpx;
					}

					//未读消息
					.indecon-item-img-unread {
						position: absolute;
						right: 12rpx;
						top: -6rpx;
						z-index: 1;
						min-width: 35rpx;
						min-height: 35rpx;
						padding: 0 5rpx;
						font-size: $uni-font-size-sm;
						box-sizing: border-box;
						border-radius: 50%;
						color: #fff;
						background-color: #DD524D;
					}
				}


				.indecon-item-info {
					flex: 1;

					.indecon-item-info-top-title {
						flex-grow: 4;
						font-size: $uni-font-size-lg;
					}

					.indecon-item-info-top-time {
						text-align: right;
						font-size: 24rpx;
						flex-grow: 1;
						color: #999999;
					}

					.indecon-item-info-bottom {
						color: #999999;
						font-size: 24rpx;

						.indecon-item-info-bottom-msg {
							flex: 1;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							margin-right: 50rpx;
						}

						.msg-icon {
							color: #666666;
							min-width: 30rpx;
							width: 30rpx;
						}
					}


				}

			}

			.indecon-item:active {
				background-color: #F3F3F3 !important;
			}

			.index-list-active {
				background-color: #F3F3F3 !important;
			}


			/* :not反向选择器，除了第一个元素 */
			/* &>view表示： &为上一级元素，即indecon-item>view*/
			&>view:not(:first-child) {
				margin-top: 1rpx;

				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: 1rpx solid rgba(100, 100, 100, .05);
					width: 620upx;
					position: absolute;
					top: -1rpx;
					right: 0;
				}
			}
		}


		



	}
</style>
