/**
 * 判断消息类型，返回提示
 */
function judgeMessageType(rawMsg) {
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
}

/**
 * 输入Unix时间戳，返回指定时间格式
 */
function calcTimeHeader(time) {
  // 格式化传入时间
  let date = new Date(parseInt(time)),
    year = date.getUTCFullYear(),
    month = date.getUTCMonth(),
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getUTCMinutes()
  // 获取当前时间
  let currentDate = new Date(),
    currentYear = date.getUTCFullYear(),
    currentMonth = date.getUTCMonth(),
    currentDay = currentDate.getDate()
  // 计算是否是同一天
  if (currentYear == year && currentMonth == month && currentDay == day) {//同一天直接返回
    if (hour > 12) {
      return `下午 ${hour}:${minute < 10 ? '0' + minute : minute}`
    } else {
      return `上午 ${hour}:${minute < 10 ? '0' + minute : minute}`
    }
  }
  // 计算是否是昨天
  let yesterday = new Date(currentDate - 24 * 3600 * 1000)
  if (year == yesterday.getUTCFullYear() && month == yesterday.getUTCMonth && day == yesterday.getDate()) {//昨天
    return `昨天 ${hour}:${minute < 10 ? '0' + minute : minute}`
  } else {
    return `${year}-${month + 1}-${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
  }
}
/**
 * 生成富文本节点
 */
function generateRichTextNode(text) {
  let tempStr = text
  let richTextNode = []
  let leftBracketIndex = tempStr.indexOf('[')
  let rightBracketIndex = tempStr.indexOf(']')
  let countOfWord = 0
  Array.from(tempStr).map(item => {
    if (item != '[' && item != ']') {
      countOfWord++
    }
  })
  if (leftBracketIndex == -1 || rightBracketIndex == -1 || countOfWord == 0) {//没有emoji
    richTextNode.push({
      type: 'text',
      text: tempStr
    })
    return richTextNode
  }
  while (tempStr.length != 0) {
    leftBracketIndex = tempStr.indexOf('[')
    rightBracketIndex = tempStr.indexOf(']')
    if (leftBracketIndex == 0) { // 开头是[
      rightBracketIndex = tempStr.indexOf(']')
      if (rightBracketIndex == -1) {
        richTextNode.push({
          type: 'text',
          text: tempStr
        })
        tempStr = ''
      } else {
        let emojiName = tempStr.slice(0, rightBracketIndex + 1)
        if (emoji[emojiName]) { // 有效emoji
          richTextNode.push({
            name: 'img',
            attrs: {
              width: '30rpx',
              height: '30rpx',
              src: emoji[emojiName].img
            }
          })
        } else {//无效emoji
          richTextNode.push({
            type: 'text',
            text: emojiName
          })
        }
        tempStr = tempStr.substring(rightBracketIndex + 1, tempStr.length)
      }
    } else { // 开头不是[
      if (leftBracketIndex == -1) {// 最后全是文字
        richTextNode.push({
          type: 'text',
          text: tempStr.slice(0, tempStr.length)
        })
        tempStr = ''
      } else {
        richTextNode.push({
          type: 'text',
          text: tempStr.slice(0, leftBracketIndex)
        })
        tempStr = tempStr.substring(leftBracketIndex, tempStr.length + 1)
      }
    }
  }
  return richTextNode
}

/**
 * 处理图片富文本节点
 */
function generateImageNode(file) {
  // console.log(file)
  let width = 0, height = 0
  if (file.w > 250) {
    width = 200
    height = file.h / (file.w / 200)
  } else {
    width = file.w
    height = file.h
  }
  let richTextNode = []
  richTextNode.push({
    name: 'img',
    attrs: {
      width: `${width}rpx`,
      height: `${height}rpx`,
      src: file.url
    }
  })
  return richTextNode
}

/**
 * 输出猜拳图片对象，用于生成富文本图片节点
 */
function generateFingerGuessImageFile(value) {
  let file = { w: 50, h: 50, url: '' }
  switch (value) {
    case 1:
      file.url = 'http://yx-web.nos.netease.com/webdoc/h5/im/play-1.png'
      break
    case 2:
      file.url = 'http://yx-web.nos.netease.com/webdoc/h5/im/play-2.png'
      break
    case 3:
      file.url = 'http://yx-web.nos.netease.com/webdoc/h5/im/play-3.png'
      break
    default:
      break
  }
  return file
}


/**
   * 输出贴图表情对象，用于生成富文本图片节点
   * content:"{"type":3,"data":{"catalog":"ajmd","chartlet":"ajmd010"}}"
   */
function generateBigEmojiImageFile(content) {
  let prefix = 'http://yx-web.nosdn.127.net/webdoc/h5/emoji/'
  let file = { w: 100, h: 100, url: '' }
  file.url = `${prefix}${content.data.catalog}/${content.data.chartlet}.png`
  return file
}




/**
 * 距离上一条消息是否超过两分钟
 */
function judgeOverTwoMinute(time, messageArr) {
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
}




module.exports = {
	judgeMessageType,
	calcTimeHeader,
	generateRichTextNode,
	generateImageNode,
	generateFingerGuessImageFile,
	generateBigEmojiImageFile,
	judgeOverTwoMinute
}