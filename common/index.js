/***
		放一些公共方法
***/

//验证手机号是否合法
export function isPoneAvailable(phone) {
	const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	return myreg.test(phone)
}

//验证密码是否合法
export function isPasswordAvailable(password) {
	//暂且任意字符8-16位无限制,后续需要改动
	const myreg =  /.{8,16}/
	return myreg.test(password)
}


//时间戳格式化为某种格式,根据传入参数不同显示不同格式
export function formatTimeStamp(timeStamp, fmt) {
	Date.prototype.Format = function (fmt) {
	    var o = {
				"y+": this.getFullYear(),
	            "M+": this.getMonth() + 1, // 月份
	            "d+": this.getDate(), // 日
	            "h+": this.getHours(), // 小时
	            "m+": this.getMinutes(), // 分
	            "s+": this.getSeconds(), // 秒
	            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
	            "S": this.getMilliseconds() // 毫秒
	    };
	    if (/(y+)/.test(fmt))
	        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	return new Date(timeStamp).Format(fmt);
}

//中国标准时间转时间戳
export function formatToTimeStamp(DateTime) {
	let timeStamp = new Date(DateTime).getTime()
	return timeStamp
}


//判断首字母:中文英文或其他特殊符号,并获取首字母
import { pinyin_dict_notone } from '@/js_sdk/pinyins/pinyin_dict_notone'
	
export function isChinese(str) {
	//中文
	const reg1 = /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/
	
	//英文
	const reg2 = /[a-zA-Z]/
	
	if(str) {
		if(reg1.test(str)) {
			for(let key in pinyin_dict_notone) {
				const value = pinyin_dict_notone[key];
				if(value.indexOf(str) !== -1) {
					//中文
					return key
				}
			}
			//特殊字符
			return false
		}else if(reg2.test(str)) {
			//英文
			return str
		}else {
			//特殊字符
			return false
		}
	}else {
		return false
	}
}

//函数防抖
export function debounce(fn, wait=30) {
	let timer = null
	console.log('触发防抖函数')
	return function() {
		if(timer !== null) {
			console.log('清除定时器')
			clearTimeout(timer)
		}
		//重新设置定时器
		timer = setTimeout(() => {
			console.log('最后执行函数')
			fn.apply(this, arguments)
		}, wait)
	}
}


