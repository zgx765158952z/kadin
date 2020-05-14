<template>
	<view class="session" @tap="hideAll">
		<!-- <view v-else class="session-loading">
			<loading-icon></loading-icon>
		</view> -->
		<view id="session-content" :style="btmStyle1">
			<block v-for="(item, index) in SconvertRawMessageListToRenderMessageArr" :key="index">
				<view v-if="item.sendOrReceive === 'receive'" class="msg-list">
					<view class="msg-list-time">
						<text v-if="item.displayTimeHeader" class="time-text">{{ item.displayTimeHeader }}</text>
						<text v-if="item.type === 'notification'" class="withdraw-text">{{ item.text }}</text>
					</view>
					<view class="msg-item">
						<view v-if="item.type==='text'" class="friend-item">
							<image @tap="toGroupInfo" class="friend-item-img msg-item-img" :src="imgUrl + getFriendInfoByAcccount(chatType==='p2p'?'p2p':'team', chatTo, 'friendFaceImage', chatType==='team'?groupInfo.groupMember:null)"
							 mode="aspectFill"></image>

							<view class="friend-item-msg item-msg">

								<view v-if="chatType === 'p2p'" hover-class="tap-hover-color" class="friend-name">
									{{ getFriendInfoByAcccount(chatType==='p2p'?'p2p':'team', chatTo, 'friendRemarkName', chatType==='team'?groupInfo.groupMember:null) }}
								</view>
								<view class="friend-msg msg">
									<!-- 语音消息 -->
									<!-- <view @tap="listenVoice" class="msg-voice">
										<view class="msg-voice-icon"  :class="{'msg-voice-icon-ing': isListening}">
											<view class="curve first-voice"></view>
											<view class="curve second-voice"></view>
											<view class="curve third-voice"></view>
										</view>
										
										<view class="msg-voice-count">
											5''
										</view>
									</view> -->
									<!-- 默认消息 -->
									<!-- 默认消息 -->

									<text selectable>
										{{ item.text }}
									</text>
									<!-- 小尖角 -->
									<view class="friend-horn"></view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view v-if="item.sendOrReceive === 'send'" class="msg-list">
					<view class="msg-list-time">
						<text v-if="item.displayTimeHeader" class="time-text">{{ item.displayTimeHeader }}</text>
						<text v-if="item.type === 'notification'" class="withdraw-text">{{ item.text }}</text>
					</view>
					<view class="msg-item">
						<view v-if="item.type==='text'" class="my-item">
							<view class="my-item-msg item-msg">
								<view class="my-msg msg">
									<text selectable>
										{{ item.text }}
									</text>
									<view class="my-horn"></view>
									<view @tap="handleTips" v-if="msgTips" class="my-msg-tips my-iconfont" hover-class="tap-hover-color">&#xe60e;</view>

								</view>
							</view>
							<image class="my-item-img msg-item-img" src="/static/image/global/boyHeadImg.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</block>

		</view>

		<view class="session-btm">
			<!-- 输入框 -->
			<view class="session-first">
				<view @tap.stop="doSpeak" v-if="showKeyboard" hover-class="tap-hover-color" class="my-iconfont voice-icon">&#xe62e;</view>
				<view @tap.stop="doInput" v-if="!showKeyboard" class="my-iconfont keyboard-icon">&#xe7db;</view>
				<textarea v-if="showKeyboard" v-model="msgContent" :fixed="true" @tap.stop="updateFocus" @input="handleInput"
				 @focus="handleFocus" cursor-spacing="10" auto-height />
				<view @touchstart.stop.prevent="showSpeaking" @touchmove.stop.prevent="moveHandle" :class="isSpeak?'speaking-class': ''" @touchend="hideSpeaking" v-if="!showKeyboard" class="voice-title">
					{{ speakingTitle }}
				</view>
				<view class="my-iconfont smiling-icon">&#xe611;</view>
				<view v-if="msgContent === ''" @tap.stop="handleTool" class="my-iconfont add-icon">&#xe691;</view>
				<view @tap="sendMsg" v-else class="send-btn">发送</view>
			</view>
			
			
			<!-- 工具栏 -->
			<view v-if="showTool" class="session-tool def-top-border">
				<view @tap.stop="tapTool" data-type="图片" class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon0">
						<text class="my-iconfont">&#xe60d;</text>
					</view>
					<view class="tool-item-title">图片</view>
				</view>
				<view @tap.stop="tapTool" data-type="拍摄" class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon1">
						<text class="my-iconfont">&#xe66c;</text>
					</view>
					<view class="tool-item-title">拍摄</view>
				</view>
				<view @tap.stop="tapTool" data-type="位置" class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon2">
						<text class="my-iconfont">&#xe688;</text>
					</view>
					<view class="tool-item-title">位置</view>
				</view>
				<view @tap.stop="tapTool" data-type="语音通话" class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon3">
						<text class="my-iconfont">&#xe62e;</text>
					</view>
					<view class="tool-item-title">语音通话</view>
				</view>
				<view @tap.stop="tapTool" data-type="视频通话" class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon4">
						<text class="my-iconfont">&#xe66b;</text>
					</view>
					<view class="tool-item-title">视频通话</view>
				</view>
				<view @tap.stop="tapTool" data-type="文件" class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon5">
						<text class="my-iconfont">&#xe60f;</text>
					</view>
					<view class="tool-item-title">文件</view>
				</view>
				<view @tap.stop="tapTool" data-type="红包" class="tool-item">
					<view hover-class="tap-hover-color" class="tool-item-icon tool-item-icon6">
						<text class="my-iconfont">&#xe614;</text>
					</view>
					<view class="tool-item-title">红包</view>
				</view>
			</view>
			
			
		</view>
		
		<def-mask ref="speakMask">
			<view slot="popup-list" class="speaking-list" :class="{'speaking-list-bgc': showCancel}">
				<!-- <view class="popup-item">
					<view class="speaking-item">
						<view class="speaking-item-time">
							00:12
						</view>
						<view class="speaking-select">
							上滑取消或转文字
						</view>
						
					</view>
				</view> -->
				<view class="speaking-item">
					<view class="speaking-item-time">
						{{ calcSpeakCount }}
					</view>
					<view class="speaking-select">
						上滑取消或转文字
					</view>
					
				</view>
				
				<view v-if="showCancel" class="cancel-and-translate">
					<view @touchmove="handleCancel" class="cancel-item" :class="{'cancel-item-active': cancelActive}">
						<view>
							<view class="cancel-item-icon my-iconfont">&#xe657;</view>
							<view class="cancel-item-title">
								取消
							</view>
						</view>
					</view>
					
					<view @touchstart="handleTranslate" class="translate-item" :class="{'translate-item-active': translateActive}">
						<view>
							<view class="translate-item-icon my-iconfont">&#xe652;</view>
							<view class="translate-item-title">
								转文字
							</view>
						</view>
					</view>
					
				</view>
				
				
			</view>
		</def-mask>
		
		
		
	</view>
</template>

<script>
	import DefMask from '@/components/content/defmask/DefMask.vue'
	import LoadingIcon from '@/components/content/loading-icon/LoadingIcon.vue'
	
	import { formatTimeStamp } from '@/common/index.js'
	import { imgBaseUrl } from '@/common/helper.js'
	import { sendMsgRequest, queryGroupInfoRequest } from '@/network/session/session.js'
	import { mapState, mapGetters, mapMutations } from 'vuex'
	
	import { calcTimeHeader, generateRichTextNode, generateImageNode, generateFingerGuessImageFile, generateBigEmojiImageFile } from '@/utils/utils.js'
	
	let app = getApp()
	export default {
		components: {
			DefMask,
			LoadingIcon
		},
		data() {
			return {
				/* 常规模块 */
				messageArr: [], //[{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},/geo是地理信息/{type: 'geo',geo: {lat,lng,title}}]
				
				//输入栏文字
				msgContent: '',
				
				//屏幕高度
				windowHeight: 0,
				sessionStyle: 'height: 800rpx;',
				
				//无工具栏的底部高度
				btmHeight1: 0,
				
				//有工具栏的底部高度
				btmHeight2: 0,
				
				//无工具栏的底部时content的样式
				btmStyle1: "",
				
				//有工具栏的底部时content的样式
				btmStyle2: "",
				
				scrollTop: Number,
				
				chatTo: '', //聊天对象account
				chatType: "", //聊天类型 advanced 高级群聊 normal 讨论组群聊 p2p 点对点聊天
				//显示键盘
				showKeyboard: true,
				
				//是否聚焦输入框
				isFocus: true,
				
				//显示工具栏
				showTool: false,
				
				//键盘弹起时是否上推页面
				adjust: true,
				
				//显示消息未发送
				msgTips: false,
				
				//听语音消息
				isListening: false,
				
				
				/** 语音输入模块 **/
				
				//语音计时器
				speakTimer: null,
				
				//语音计时
				speakCount: 0,
				
				//说话模式
				isSpeak: false,
				
				speakingTitle: '按住 说话',
				
				//说话时上滑到一定位置显示取消按钮
				showCancel: false,
				
				//触摸到取消按钮时
				cancelActive: false,
				
				//触摸到转文字按钮时
				translateActive: false,
				
				//存储取消与转文字按钮节点坐标信息
				cancelInfo: {
					'left1': 0,
					'right1': 0,
					'left2': 0,
					'right2': 0,
					'top': 0,
					'bottom': 0
				},
				imgUrl: '', //图片服务器地址
				
				groupInfo: {}, //群组信息
				
				firstGetMsgs: true, //是第一次获取历史记录吗？
				
				hasHistoryMsg: true, //云端是否还有历史记录
				pageCount: 1 ,//聊天记录页数
				
				//下拉刷新
				refresherEnabled: true, //是否开启下拉刷新
				freshing: false, //正在刷新中
				
			}
		},
		
		
		computed: {
			/**
			 * 原始消息列表转化为适用于渲染的消息列表
			 * {unixtime1: {flow,from,fromNick,idServer,scene,sessionId,text,target,to,time...}, unixtime2: {}}
			 * =>
			 * [{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
			 */
			DconvertRawMessageListToRenderMessageArr() {
			  console.log('this.currentChatTo:', this.currentChatTo)
			  let rawMsgList = this.rawMessageList[this.currentChatTo]
			  let messageArr = []
			  for(let time in rawMsgList) {
			    let rawMsg = rawMsgList[time]
			    let msgType = ''
			    if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 1) {
			      msgType = '猜拳'
			    } else if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 3) {
			      msgType = '贴图表情'
			    } else {
			      msgType = rawMsg.type
			    }
				//返回距离上条消息超过两分钟的时间
			    let displayTimeHeader = this.judgeOverTwoMinute(rawMsg.time, messageArr)
			    let sendOrReceive = rawMsg.flow === 'in' ? 'receive' : 'send'
			    let specifiedObject = {}
			    switch(msgType) {
			      case 'text': {
			        specifiedObject = {
			          nodes: generateRichTextNode(rawMsg.text) //生成富文本节点
			        }
			        break
			      }
			      case 'image': {
			        specifiedObject = {
			          nodes: generateImageNode(rawMsg.file)  //处理图片富文本节点
			        }
			        break
			      }
			      case 'geo': { //地理信息
			        specifiedObject = {
			          geo: rawMsg.geo
			        }
			        break
			      }
			      case 'audio': {
			        specifiedObject = {
			          audio: rawMsg.file
			        }
			        break
			      }
			      case 'video': {
			        specifiedObject = {
			          video: rawMsg.file
			        }
			        break
			      }
			      case '猜拳': {
			        let value = JSON.parse(rawMsg['content']).data.value
			        specifiedObject = {
			          nodes: generateImageNode(generateFingerGuessImageFile(value))
			        }
			        break
			      }
			      case '贴图表情': {
			        let content = JSON.parse(rawMsg['content'])
			        specifiedObject = {
			          nodes: generateImageNode(generateBigEmojiImageFile(content))
			        }
			        break
			      }
			      case 'tip': {
			        specifiedObject = {
			          text: rawMsg.tip,
			          nodes: [{
			            type: 'text',
			            text: rawMsg.tip
			          }]
			        }
			        break
			      }
			      case '白板消息':
			      case '阅后即焚': {
			        specifiedObject = {
			          nodes: [{
			            type: 'text',
			            text: `[${msgType}],请到手机或电脑客户端查看`
			          }]
			        }
			        break
			      }
			      case 'file':
			      case 'robot': {
			        let text = msgType === 'file' ? '文件消息' : '机器人消息'
			        specifiedObject = {
			          nodes: [{
			            type: 'text',
			            text: `[${text}],请到手机或电脑客户端查看`
			          }]
			        }
			        break
			      }
			      case 'custom':
			        specifiedObject = {
			          nodes: [{
			            type: 'text',
			            text: '自定义消息'
			          }]
			        }
			        break;
			      case 'notification':
			        specifiedObject = {
			          // netbill的text为空
			          text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text),
			          nodes: [{
			            type: 'text',
			            text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text)
			          }]
			        }
			        break;
			      default: {
			        break
			      }
			    }
			    messageArr.push(Object.assign({}, {
			      from: rawMsg.from,
			      type: msgType,
			      text: rawMsg.text || '',
			      time,
			      sendOrReceive, //此消息是收到还是发送
			      displayTimeHeader 
			    }, specifiedObject))
			  }
			  console.log('改变了:', messageArr)
			  return messageArr
			},
			
			calcSpeakCount() {
				if(this.speakCount<10) {
					return `0${this.speakCount}`
				}else {
					return this.speakCount
				}
			},
			...mapState(['userInfo', 'friendList', 'currentChatList', 'currentChatTo', 'rawMessageList']),
			...mapGetters(['getFriendInfoByAcccount', 'SconvertRawMessageListToRenderMessageArr'])
		},
		filters: {
			
			formatTime(timeStamp) {
				return formatTimeStamp(timeStamp, 'MM-dd hh:mm')
			}
		},
		watch: {
			//监听工具栏的显示与隐藏，从而重新获取底部高度让content重新定位
			// showTool(newV, oldV) {
			// 	console.log(newV, oldV)
			// 	if(newV !== oldV) {
			// 		this.$nextTick(() => {
			// 			this.getBtmHeight()
			// 		})
			// 	}
			// }
			rawMessageList: {
				deep: true,
				handler(newV, oldV) {
					console.log('新消息与旧消息:', newV, oldV)
					if(newV) {
						this.convertRawMessageListToRenderMessageArr()
					}
				}
			}
		},
		methods: {
			...mapMutations(['setCurrentChatList', 'setCurrentChatTo', 'clearUnread']),
			/**
			 * 原始消息列表转化为适用于渲染的消息列表
			 * {unixtime1: {flow,from,fromNick,idServer,scene,sessionId,text,target,to,time...}, unixtime2: {}}
			 * =>
			 * [{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
			 */
			convertRawMessageListToRenderMessageArr() {
			  let rawMsgList = this.rawMessageList[this.currentChatTo]
			  let messageArr = []
			  for(let time in rawMsgList) {
			    let rawMsg = rawMsgList[time]
			    let msgType = ''
			    if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 1) {
			      msgType = '猜拳'
			    } else if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 3) {
			      msgType = '贴图表情'
			    } else {
			      msgType = rawMsg.type
			    }
				//返回距离上条消息超过两分钟的时间
			    let displayTimeHeader = this.judgeOverTwoMinute(rawMsg.time, messageArr)
			    let sendOrReceive = rawMsg.flow === 'in' ? 'receive' : 'send'
			    let specifiedObject = {}
			    switch(msgType) {
			      case 'text': {
			        specifiedObject = {
			          nodes: generateRichTextNode(rawMsg.text) //生成富文本节点
			        }
			        break
			      }
			      case 'image': {
			        specifiedObject = {
			          nodes: generateImageNode(rawMsg.file)  //处理图片富文本节点
			        }
			        break
			      }
			      case 'geo': { //地理信息
			        specifiedObject = {
			          geo: rawMsg.geo
			        }
			        break
			      }
			      case 'audio': {
			        specifiedObject = {
			          audio: rawMsg.file
			        }
			        break
			      }
			      case 'video': {
			        specifiedObject = {
			          video: rawMsg.file
			        }
			        break
			      }
			      case '猜拳': {
			        let value = JSON.parse(rawMsg['content']).data.value
			        specifiedObject = {
			          nodes: generateImageNode(generateFingerGuessImageFile(value))
			        }
			        break
			      }
			      case '贴图表情': {
			        let content = JSON.parse(rawMsg['content'])
			        specifiedObject = {
			          nodes: generateImageNode(generateBigEmojiImageFile(content))
			        }
			        break
			      }
			      case 'tip': {
			        specifiedObject = {
			          text: rawMsg.tip,
			          nodes: [{
			            type: 'text',
			            text: rawMsg.tip
			          }]
			        }
			        break
			      }
			      case '白板消息':
			      case '阅后即焚': {
			        specifiedObject = {
			          nodes: [{
			            type: 'text',
			            text: `[${msgType}],请到手机或电脑客户端查看`
			          }]
			        }
			        break
			      }
			      case 'file':
			      case 'robot': {
			        let text = msgType === 'file' ? '文件消息' : '机器人消息'
			        specifiedObject = {
			          nodes: [{
			            type: 'text',
			            text: `[${text}],请到手机或电脑客户端查看`
			          }]
			        }
			        break
			      }
			      case 'custom':
			        specifiedObject = {
			          nodes: [{
			            type: 'text',
			            text: '自定义消息'
			          }]
			        }
			        break;
			      case 'notification':
			        specifiedObject = {
			          // netbill的text为空
			          text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text),
			          nodes: [{
			            type: 'text',
			            text: rawMsg.groupNotification || (rawMsg.text.length == 0 ? '通知' : rawMsg.text)
			          }]
			        }
			        break;
			      default: {
			        break
			      }
			    }
			    messageArr.push(Object.assign({}, {
			      from: rawMsg.from,
			      type: msgType,
			      text: rawMsg.text || '',
			      time,
			      sendOrReceive, //此消息是收到还是发送
			      displayTimeHeader 
			    }, specifiedObject))
			  }
			  console.log('改变了:', messageArr)
			  this.messageArr = messageArr
			  setTimeout(() => {
				  this.$nextTick(() => {
				  	this.scrollToBottom()
				  })
			  }, 200)
			  
			},
			
			//滚动到底部
			scrollToBottom() {
				console.log('滚动到底部')
				uni.pageScrollTo({
					scrollTop: 99999
				})
			},
			
			/**
			 * 距离上一条消息是否超过两分钟
			 */
			judgeOverTwoMinute(time, messageArr) {
			  let displayTimeHeader = ''
			  let lastMessage = messageArr[messageArr.length - 1]
			  if (lastMessage) {//拥有上一条消息
			    let delta = time - lastMessage.time
			    if (delta > 2 * 60 * 1000) {//两分钟以上
			      displayTimeHeader = calcTimeHeader(time)
			    }
			  } else {//没有上一条消息
			    displayTimeHeader = calcTimeHeader(time)
			  }
			  return displayTimeHeader
			},
			
			//发送消息
			sendMsg() {
				const obj = {
					fromUser: this.userInfo.user.userAccount,
					ope: this.chatType === 'p2p'? 0 : 1,
					toUser: this.chatTo,
					type: 0,
					msg: this.msgContent
				}
				sendMsgRequest(obj).then(res => {
					console.log(res)
					this.$toast.showRes(res)
					if(res.data.code === 2000) {
						this.msgContent = ''
						this.$nextTick(() => {
							this.$forceUpdate()
						})
					}
				}).catch(err => {
					console.log(err)
					this.$toast.showErr(err)
				})
			},
			onToupper() {
				console.log('到达顶部')
				if(this.freshing) return
				this.freshing = true
				setTimeout(() => {
					this.freshing = false
				}, 3000)
			},
			
			//听语音
			listenVoice() {
				this.isListening = !this.isListening
			},
			
			//点击未发送的消息
			handleTips() {
				uni.showModal({
					title: '提示',
					content: '消息未发送,是否重新发送',
					success: res => {
						if(res.confirm) {
							this.msgTips = false
						}
					}
				})
			},
			//监听按住说话手指移动
			moveHandle(e) {
				if(e.touches[0].clientY < 540) {
					
					console.log(e)
					this.showCancel = true
					
					
				}else {
					this.showCancel = false
				}
				if(this.showCancel) {
					if(this.cancelInfo.right2 === 0) {
						this.$nextTick(() => {
							const query = uni.createSelectorQuery().in(this)
							query.select('.cancel-item').boundingClientRect(data => {
								
								this.cancelInfo.left1 = data.left
								this.cancelInfo.right1 = data.right
								this.cancelInfo.top = data.top
								this.cancelInfo.bottom = data.bottom
								console.log(this.cancelInfo)
							}).exec()
							
							query.select('.translate-item').boundingClientRect(data => {
								
								this.cancelInfo.left2 = data.left
								this.cancelInfo.right2 = data.right
								console.log(this.cancelInfo)
								return
							}).exec()
						})
					}else {
						if(e.touches[0].clientY>this.cancelInfo.top && e.touches[0].clientY<this.cancelInfo.bottom) {
							if(e.touches[0].clientX>this.cancelInfo.left1 && e.touches[0].clientX<this.cancelInfo.right1) {
								this.$nextTick(() => {
									this.cancelActive = true
								})
							}else if(e.touches[0].clientX>this.cancelInfo.left2 && e.touches[0].clientX<this.cancelInfo.right2) {
								this.$nextTick(() => {
									this.translateActive = true
								})
							}else {
								this.$nextTick(() => {
									this.cancelActive = false
									this.translateActive = false
								})
							}
						}else {
							this.$nextTick(() => {
								this.cancelActive = false
								this.translateActive = false
							})
						}
						
					}
				}
				
				
				
				
			},
			//按住说话
			showSpeaking() {
				this.isSpeak = true
				this.speakingTitle = '松开 结束'
				this.$refs.speakMask.isShowMask = true
				this.speakTimer = setInterval(() => {
					this.speakCount += 1
				}, 1000)
				this.speakTimer
			},
			
			//松开结束说话
			hideSpeaking() {
				if(this.cancelActive) {
					console.log('取消语音')
				}else if(this.translateActive) {
					console.log('将语音转成文字')
				}else {
					console.log('发送语音')
				}
				
				this.isSpeak = false
				this.speakingTitle = '按住 说话'
				this.showCancel = false
				this.cancelActive = false
				this.translateActive = false
				clearInterval(this.speakTimer) //清除计时器
				this.speakCount = 0
				this.$refs.speakMask.isShowMask = false
			},
			
			//取消
			handleCancel(e) {
				console.log('取消')
				console.log(e)
			},
			
			//转文字
			handleTranslate(e) {
				console.log('转文字')
				console.log(e)
			},
			
			//改变为说话模式
			doSpeak() {
				this.$nextTick(() => {
					this.showKeyboard = false
					this.showTool = false
					this.isFocus = false
				})
			},
			
			//改变为输入模式
			doInput() {
				this.$nextTick(() => {
					this.showKeyboard = true
					this.isFocus = true
				})
			},
			
			//监听输入
			handleInput(e) {
				console.log(e)
			},
			
			tapTool(e) {
				let type = e.currentTarget.dataset.type
				uni.showToast({
					title: `即将打开${type}`,
					icon: 'none'
				})
			},
			//解决 当工具栏出现时，点击输入框聚焦页面不上推问题
			updateFocus() {
				if(this.showTool) {
					this.showTool = false
				}
				setTimeout(() => {
					this.$nextTick(() => {
						this.isFocus = false
						// this.adjust = false
						setTimeout(() => {
							this.isFocus = true
							// this.adjust = true
						}, 80)
					})
				}, 80)
			},
			
			//聚焦时触发
			handleFocus() {
				// #ifdef APP-PLUS
				const currentWebview = this.$scope.$getAppWebview();
				console.log('currentWebview:', currentWebview)
				// #endif
			},
			
			//触摸页面隐藏键盘和工具栏和表情等
			hideAll() {
				console.log('hideAll')
				if(this.showTool) {
					this.$nextTick(function(){
						setTimeout(() => {
							this.showTool = false
						}, 200)
					})
				}
				if(this.isFocus) {
					this.$nextTick(function(){
						setTimeout(() => {
							this.isFocus = false
						}, 200)
					})
				}
			},
			//工具栏的显示
			handleTool() {
				console.log('handleTool', this.btmStyle1)
				this.showTool = !this.showTool
				//只获取一次底部输入框下面工具栏的高度
				// if(this.btmHeight2 === 0) {
				// 	this.getBtmHeight()
				// }
				console.log('this.showTool', this.showTool)
			},
			
			//获取底部工具栏时的高度,改变content下边距
			getBtmHeight() {
				const query = uni.createSelectorQuery().in(this)
				query.select('.session-btm').boundingClientRect(data => {
					if(this.btmHeight1 === 0) {
						this.btmHeight1 = data.height
						this.btmStyle1 = `padding-bottom: ${data.height}px;`
						console.log('获取无工具栏样式:', this.btmStyle2)
					}else {
						if(this.btmHeight2 === 0) {
							this.btmHeight2 = data.height
							this.btmStyle2 = `padding-bottom: ${data.height}px;`
							console.log('获取有工具栏样式:', this.btmStyle2)
						}
					}
					console.log(data.height)
					
				}).exec()
			},
			
			//获取历史记录：
			getHistoryMsgs() {
				if(this.hasHistoryMsg) { //是否还有历史记录
					let obj = {
						scene: this.chatType === 'p2p'?'p2p':'team',
						limit: 20,
						to: this.chatTo,
						done: this.getHistoryMsgsDone
					}
					app.globalData.nim.getHistoryMsgs(obj)
				}else {
					uni.showToast({
						title: '无更多聊天记录',
						icon: 'none'
					})
				}
				
			},
			getHistoryMsgsDone(error, res) {
				console.log('获取p2p历史消息',  res)
				
				if(res.msgs.length<20) {
					this.hasHistoryMsg = false
				}
				if(this.firstGetMsgs) {
					this.setCurrentChatList(res)
					this.firstGetMsgs = false
					
					//第一次进入会话获取历史记录时滚动到底部
					this.$nextTick(() => {
						this.scrollToBottom()
					})
				}else {
					this.currentChatList.msgs.push(...res.msgs)
				}
				this.$nextTick(() => {
					this.freshing = false
				})
				console.log('更新后历史记录:', this.currentChatList)
			},
			
			//跳转到GroupInfo
			toGroupInfo() {
				uni.navigateTo({
					url: '/components/content/session/sessionSon/GroupInfo'
				})
			},
			
			//跳转到ChatFriendSetting
			toChatFriendSetting() {
				uni.navigateTo({
					url: '/components/content/session/sessionSon/ChatFriendSetting'
				})
			}
		},
		onLoad() {
			//初始化聊天对象
			let toSessionObj = JSON.parse(JSON.stringify(uni.getStorageSync('toSessionObj')))
			console.log('toSessionObj:', toSessionObj)
			this.chatTo = toSessionObj.chatTo
			this.chatType = toSessionObj.chatType
			
			this.getBtmHeight()
			this.imgUrl = imgBaseUrl
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight
				}
			})
			
			if(this.chatType !== 'p2p') {
				queryGroupInfoRequest(this.userInfo.user.userAccount, this.chatTo).then(res => {
					this.$toast.showRes(res)
					if(res.data.code === 2000) {
						this.groupInfo = res.data.data
					}
				}).catch(err => {
					this.$toast.showErr(err)
				})
			}
			
			uni.removeStorage({ key: 'toSessionObj' })
			this.convertRawMessageListToRenderMessageArr() //获取消息列表
			console.log('this.rawMessageList:', this.rawMessageList)
		},
		
		onBackPress() {
			if(this.showTool) {
				this.showTool = false
				return true
				// if(e.from === 'navigateBack') {
				// 	//返回
				// 	return false
				// }
				// if(e.from === 'backbutton') {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '您确定退出当前编辑？',
				// 		success(res) {
				// 			if(res.confirm) {
				// 				uni.navigateBack()
				// 			}else if(res.cancel){
				// 				//表示禁止默认返回
				// 				return true
				// 			}
				// 		},
				// 		fail(err) {
				// 			console.log(err)
				// 			return true
				// 		}
				// 	})
				// }
			}else {
				return false
			}
		},
		onPageScroll(e) {
			console.log(e)
			if(this.isFocus) {
				this.$nextTick(() => {
					this.isFocus = false
				})
			}
			//页面滚动时隐藏键盘和工具栏
			if(this.showTool) {
				this.$nextTick(() => {
					this.showTool = false
				})
			}
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				if(this.chatType === 'p2p') {
					this.toChatFriendSetting()
				}else {
					this.toGroupInfo()
				}
			}
		},
		onHide() {
			clearInterval(this.speakTimer)
		},
		onUnload() {
			//页面卸载时清空当前会话
			this.setCurrentChatList({})
			this.setCurrentChatTo('')
		}
	}
</script>

<style lang="scss">
	
	
	.cancel-item-active {
		background-color: #FA5251 !important;
		color: #FFFFFF !important;
	}
	
	.translate-item-active {
		background-color: #07C160 !important;
		color: #FFFFFF !important;
	}
	
	
	.speaking-list {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 101;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		
		.speaking-item {
			padding: 30rpx;
			background-color: #383838;
			color: #FFFFFF;
			border-radius: 20rpx;
			width: 40%;
			margin: 50rpx auto;
			margin-bottom: 250rpx;
			.speaking-item-time {
				text-align: center;
				padding: 50rpx 40rpx;
				font-size: 60rpx;
			}
			.speaking-select {
				font-size: $uni-font-size-base;
				text-align: center;
			}
			
		}
		
		
		
		// 取消和转文字
		.cancel-and-translate {
			position: absolute;
			bottom: 300rpx;
			left: 0;
			z-index: 299;
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			.cancel-item, .translate-item {
				display:flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				width: 180rpx;
				height: 180rpx;
				background-color: #FFFFFF;
				color: $uni-text-color;
				border-radius: 100%;
				.cancel-item-icon, .translate-item-icon {
					text-align: center;
					font-size: 40rpx;
				}
				.cancel-item-title, .translate-item-title {
					font-size: $uni-font-size-base;
				}
			}
			
			.cancel-item {
			}
			.translate-item {
				
			}
		}
		
	}
	
	.speaking-list-bgc {
		background-color: #383838;
	}
	
	
	//弹性盒子
	.friend-item {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
	}
	.my-item {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
	}
	
	.session-first {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}
	
	.session-tool {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		.tool-item {
			width: 20%;
		}
	}
	
	//让聊天列表从下往上排列
	#session-content {
		display: flex;
		flex-flow: column nowrap;
		width: 100%;
		padding-bottom: 120rpx;
	}
	
	//听语音的关键帧
	@keyframes voiceMove {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	
	@-webkit-keyframes voiceMove {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	
	
	.session {
		min-height: 100vh;
		background-color: #F7F7F7;
		// 正在加载
		// .session-loading {
		// 	position: fixed;
		// 	top: 35%;
		// 	left: 40%;
		// }
		.msg-list {
			padding: 10rpx 30rpx;
			font-size: $uni-font-size-lg;
			box-sizing: border-box;
			
			.msg-list-time {
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				align-items: center;
				text-align: center;
				.time-text, .withdraw-text {
					margin: 5rpx 0;
					padding: 3rpx 15rpx;
					border-radius: 24rpx;
					background-color: rgba(192, 192, 192, .5);
					color: #FFFFFF;
					font-size: $uni-font-size-base;
				}
				.time-text {
					font-weight: 900;
				}
			}
			.msg-item {
				
				.my-item, .friend-item {
					.msg-item-img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 8rpx;
					}
					.friend-item-msg {
						margin-left: 30rpx;
					}
					.my-item-msg {
						margin-right: 30rpx;
					}
					.item-msg {
						max-width: 70%;
						.friend-name {
							display: inline-block;
							margin: 5rpx 0 5rpx 8rpx;
							font-size: $uni-font-size-sm;
						}
						
						.msg {
							position: relative;
							color: $uni-text-color;
							padding: 14rpx 22rpx;
							box-sizing: border-box;
							border-radius: 26rpx;
							z-inde: 1;
							// 语音消息
							.msg-voice {
								display: flex;
								flex-flow: row nowrap;
								justify-content: space-between;
								align-items: center;
								align-content: center;
								width: 200rpx;
								.msg-voice-icon {
									position: relative;
									margin-left: 30rpx;
									width: 40rpx;
									height: 40rpx;
									transform: rotate(-45deg);
									overflow: hidden;
									
									//弧形语音
									.curve {
										position: absolute;
										border: 6rpx solid #333;
										border-radius: 50%;
									}
									.first-voice {
										top: -7rpx;
										left: -7rpx;
										width: 6rpx;
										height: 6rpx;
										background-color: #333;
									}
									
									.second-voice {
										top: -18rpx;
										left: -18rpx;
										width: 24rpx;
										height: 24rpx;
									}
									
									.third-voice {
										top: -28rpx;
										left: -28rpx;
										width: 44rpx;
										height: 44rpx;
									}
								}
								
								//听语音时的动画
								.msg-voice-icon-ing {
									.second-voice, .third-voice {
										animation: voiceMove 1s infinite ease-in-out;
									}
								}
								
							}
							
							
							
							
							//朋友发消息的气泡小尖角
							.friend-horn {
								position: absolute;
								display: inline-block;
								left: -12rpx;
								top: 20rpx;
								width: 30rpx;
								height: 30rpx;
								background-color: #FFFFFF;
								//顺时针旋转45度
								transform: rotate(45deg);
							}
							
							//自己发消息的气泡小尖角
							.my-horn {
								position: absolute;
								display: inline-block;
								right: -12rpx;
								top: 20rpx;
								width: 30rpx;
								height: 30rpx;
								background-color: #4CD964;
								//顺时针旋转45度
								transform: rotate(45deg);
							}
							
							//自己的消息是否发出去
							.my-msg-tips {
								position: absolute;
								display: flex;
								justify-content: center;
								align-items: center;
								width: 50rpx;
								height: 50rpx;
								left: -60rpx;
								top: 50%;
								margin-top: -25rpx;
								font-size: 40rpx;
								color: #BD2C00;
							}
						}
						
						
						
						.friend-msg {
							background-color: #FFFFFF;
							// 消息是否发送
						}
						.my-msg {
							background-color: #4CD964;
						}
						
					}
				}
			}
		}
		
		
		
	}
	
	
	//底部输入框与工具
	.session-btm {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 85;
		background-color: #FFFFFF;
		box-shadow: 0 0 5rpx #07C160;
		.session-first {
			margin: 20rpx 10rpx;
			textarea, .voice-title {
				flex: 1;
				display: flex;
				padding: 15rpx 30rpx;
				margin: 0 10rpx;
				font-size: $uni-font-size-lg;
				border: 1rpx solid rgba(100, 100, 100, .1);
				border-radius: 36rpx;
				max-height: 150rpx;
			}
			.voice-title {
				justify-content: center;
			}
			
			
			.voice-icon, .smiling-icon, .add-icon, .keyboard-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 10rpx;
				border-radius: 100%;
			}
			.voice-icon {
				font-size: 50rpx;
				color: #FFFFFF;
				width: 70rpx;
				height: 70rpx;
				background-color: #007AFF;
			}
			.smiling-icon, .add-icon, .keyboard-icon {
				font-size: 70rpx;
				width: 70rpx;
				height: 70rpx;
				color: $uni-text-color-disable;
				
				&:active {
					background-color: #eee;
				}
			}
			.speaking-class {
				background-color: $uni-text-color-disable;
			}
			
			.send-btn {
				background-color: #1aad19;
				color: #fff;
				font-size: $uni-font-size-lg;
				padding: 12rpx 14rpx;
				box-sizing: border-box;
				border-radius: 8rpx;
				margin: 0 10rpx;
			}
			
		}
		
		
		.session-tool {
			padding: 30rpx 0;
			box-sizing: border-box;
			.tool-item {
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				justify-content: center;
				margin: 20rpx 18rpx;
				.tool-item-icon {
					padding: 23rpx 25rpx;
					box-sizing: border-box;
					border-radius: 20rpx;
					.my-iconfont {
						color: #FFFFFF;
						font-size: 60rpx;
					}
				}
				.tool-item-title {
					font-size: $uni-font-size-base;
					color: $uni-text-color;
					text-align: center;
					margin-top: 10rpx;
				}
				.tool-item-icon0 {
					background-color: #0F77FA;
				}
				.tool-item-icon1 {
					background-color: #0DC702;
				}
				
				.tool-item-icon2 {
					background-color: #24D9B0;
				}
				.tool-item-icon3 {
					background-color: #259DF4;
				}
				.tool-item-icon4 {
					background-color: #3A95FE;
				}
				.tool-item-icon5 {
					background-color: #24D9B0;
				}
				
				.tool-item-icon6 {
					background-color: #FE5A59;
				}
			}
		}
	}
</style>
