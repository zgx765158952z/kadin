function handlePushMsg(newPushMsg, globalData) {
	console.log('收到定时提醒object:', newPushMsg)
	
	uni.switchTab({
		url: '/pages/index/index',
		success: res => {
			uni.navigateTo({
				url: '/components/content/remind/Reminded',
				success: res => {
					//#ifdef APP-PLUS
					const allPushMsg = plus.push.getAllMessage()
					console.log('当前所有的推送消息:', allPushMsg)
					let remindPerson = JSON.parse(newPushMsg.remindPerson)
					globalData.newRemindVibrate = setInterval(() => {
						plus.device.vibrate() //1.5s调用一次震动
					}, 3000)
					plus.nativeUI.alert(`${newPushMsg.remindContent}`,function(res) {
						console.log('点击了', res)
						clearInterval(globalData.newRemindVibrate)
					}, `来自: ${remindPerson[0]} 标题: ${newPushMsg.remindTitle}`, '收到')
					//#endif
				}
			})
		}
	})
}


module.exports = {
	handlePushMsg
}