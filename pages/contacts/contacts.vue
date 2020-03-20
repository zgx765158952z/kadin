<template>
	<view class="contacts set-bgc">
		<contacts-con></contacts-con>
		<def-mask class="index-def-mask" ref="contactsMask"></def-mask>
	</view>
</template>

<script>
	import ContactsCon from './contactsCpns/ContactsCon'
	import ContactsIndex from './contactsCpns/ContactsIndex'
	import DefMask from "@/components/content/defmask/DefMask.vue"
	
	
	import { queryFriendRequest } from '@/network/addfriend.js'
	import { pinyin_dict_notone } from '@/js_sdk/pinyins/pinyin_dict_notone'
	import { mapState } from 'vuex'
	
	
	export default {
		components:{
			ContactsCon,
			ContactsIndex,
			DefMask
		},
		data() {
			return {
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			//点击组件index
			touchStart(e) {
				console.log(e)
			},
			
			touchMove(e) {
				console.log(e)
			},
			
			touchEnd() {
				console.log('touchEnd')
			},
			
			touchCancel() {
				console.log('touchCancel')
			},
			
			// #ifdef APP-PLUS
			testMe() {
				//获取cid
				console.log(plus.push.getClientInfo())
			},
			
			//监听并获取推送消息
			getPushEvent() {
				//获取cid
				console.log(plus.push.getClientInfo())
				
				return
				//收到透传消息  
				//只有APP在线时，才会触发receive事件，透传消息不会触发系统消息,需要创建本地消息  
				plus.push.addEventListener("receive", function(msg) {  
					console.log("(receive):" + JSON.stringify(msg));  
					// if (app.isIOS()) { //如果是IOS  
					// 	var payload = msg.payload;  
					// 	//【APP离线】收到消息，但没有提醒（发生在一次收到多个离线消息时，只有一个有提醒，但其他的没有提醒）  
					// 	//【APP在线】收到消息，不会触发系统消息,需要创建本地消息，但不能重复创建。必须加msg.type验证去除死循环                
					// 	if (msg.aps == null && msg.type == "receive") {   
					// 		var messageTitle = payload.messageTitle;  
					// 		var messageContent = payload.messageContent;  
					// 		//创建本地消息,发送的本地消息也会被receive方法接收到，但没有type属性，且aps是null  
					// 		plus.push.createMessage(messageContent, JSON.stringify(payload), {title: messageTitle});  
					// 	}  
					// }
					
				    var payload = JSON.parse(msg.payload);
					console.log(payload)
				    plus.push.createMessage('提醒内容', {title:"提醒标题", content:"内容"}, false);
					
					// if (app.isAndroid()) { //如果是Android，当APP在线时，收到透传消息不会进入系统消息，需要发送本地提醒。  
					// 	var payload = JSON.parse(msg.payload);  
					// 	var messageTitle = payload.messageTitle;  
					// 	var messageContent = payload.messageContent;  
					// 	plus.push.createMessage(messageContent, msg.payload, {title: messageTitle});  
					// }  
				}, false);  
		
				//消息点击事件  
				//【APP在线】，收到透传消息通过，不会提醒至通知栏目，需要发送本地消息，再进行点击触发的点击事件。  
				//【APP离线】，收到离线透传消息，必须通过Java后台的Intent字符串携带payload，且符合格式才能触发click事件，格式不符合不会触发。  
				plus.push.addEventListener("click", function(msg) {  
					console.log("(click):" + JSON.stringify(msg));  
					// if (app.isIOS()) { //如果是IOS  
					// 	var payload;  
					// 	if (msg.type == "click") { //APP离线点击包含click属性，这时payload是JSON对象  
					// 		payload = msg.payload;  
					// 	} else { //APP在线，收到消息不会包含type属性,这时的payload是JSON字符串，需要转为JSON对象  
					// 		payload = JSON.parse(msg.payload);  
					// 	}  
					// 	if (payload != null || payload != undefined) {  
					// 		var messageType = payload.messageType;  
					// 		messageClick(messageType, payload);  
					// 	}  
					// }  
					console.log('离线android')
					//测试啊
					var payload = JSON.parse(msg.payload);
					if (payload !== null || payload !== undefined) {  
						var messageType = payload.messageType;  
						messageClick(messageType, payload);  
					}  
					
					
					
					
					// if (app.isAndroid()) { //如果是Android，收到playload均是是JSON字符串，需要转为JSON对象  
					// 	var payload = JSON.parse(msg.payload);  
					// 	if (payload != null || payload != undefined) {  
					// 		var messageType = payload.messageType;  
					// 		messageClick(messageType, payload);  
					// 	}  
					// }  
				}, false);
			},
			
			// #endif
			
			tapMask() {
				this.$refs.contactsMask.isShowMask = !this.$refs.contactsMask.isShowMask
			},
			
			
			
		},
		onShow() {
		},
		onLoad() {
			
			
			// #ifdef APP-PLUS
			
			//监听并获取推送消息
			this.getPushEvent()
			
			
			// #endif
		},
		onNavigationBarButtonTap(options) {
			if(options.index === 0) {
				this.$refs.contactsMask.isShowMask = !this.$refs.contactsMask.isShowMask
			}
		},
		//页面卸载
		onUnload() {
			//隐藏遮罩层
			this.$refs.contactsMask.isShowMask = false
		},
		//页面隐藏
		onHide() {
			//隐藏遮罩层
			this.$refs.contactsMask.isShowMask = false
		}
		
	}
</script>

<style lang="scss">
	.contacts {
		min-height: 100vh;
		height: 100%;
		contacts-index {
			z-index: 10000;
		}
		
		
		def-mask {
			position: fixed;
			z-index: 10001;
		}
	}

</style>
