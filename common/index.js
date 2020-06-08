/***
		放一些公共方法
***/

//验证手机号是否合法
function isPoneAvailable(phone) {
	const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	return myreg.test(phone)
}

//验证密码是否合法
function isPasswordAvailable(password) {
	//暂且任意字符8-16位无限制,后续需要改动
	const myreg =  /.{8,16}/
	return myreg.test(password)
}


//时间戳格式化为某种格式,根据传入参数不同显示不同格式
function formatTimeStamp(timeStamp, fmt) {
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
function formatToTimeStamp(DateTime) {
	console.log('收到的中国标准时间:', DateTime)
	let timeStamp = new Date(DateTime).getTime()
	console.log(typeof timeStamp)
	console.log('中国标准时间转时间戳为:', timeStamp)
	return timeStamp
}


//判断首字母:中文英文或其他特殊符号,并获取首字母
import { pinyin_dict_notone } from '@/js_sdk/pinyins/pinyin_dict_notone'
	
function isChinese(str) {
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
function debounce(fn, wait=30) {
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

//根据firstWorld的首字母进行分类合并加排序
function formatList(data, firstWorld='friendRemarkName') {
	const newArr = []
	//存放特殊字符
	const specialArr = []
	for(let i=0; i<26; i++) {
		const key = String.fromCharCode(65 + i) //A-Z赋给key当做键
		
		newArr[i] = {
			letters: key,
			list: []
		}
		
		data.map((v) => {
			//获取备注名
			const getFirstWorld = v[firstWorld];
			
			// 判断friendRemarkName，是否有备注名
			if(getFirstWorld) {
				//获取备注名的第一个词
				const fir = getFirstWorld.charAt(0)
				//判断该词是哪个类型并返回
				const getFirstWorldType = isChinese(fir);
				if(getFirstWorldType) {
					// 中文，提取第一个拼音并转大写,英文也可如此
					const UpperFirstWorld = getFirstWorldType.charAt(0).toUpperCase();
					if(UpperFirstWorld === key) {
						newArr[i].list.push(v)
					}
					
				}else {
					//特殊字符
					//将特殊字符组先放到一个特殊组里，只需要遍历一次
					
					if(i===0) {
						specialArr.push(v)
					}
				}
			}else {
				//将特殊字符组先放到一个特殊组里，只需要遍历一次
				
				if(i===0) {
					specialArr.push(v)
				}
			}
		})
		
	}
	
	
	
	//特殊字符对象
	const specialObj = {
		letters: "#",
		list: specialArr
	}
	//将特殊字符对象追加到newArr最后面
	newArr.push(specialObj)
	console.log('根据首字母分类列表:', newArr)
	return newArr
}


//将获取的所有的朋友信息更新到朋友名片friendCard
function setNewestFriendCard(state, data) {
	let tempState = Object.assign({}, state)
	let newObj = {}
	data.forEach(item => {
		newObj[item.friendAccount] = item
	})
	return Object.assign({}, newObj, tempState.friendCard)
}

//#ifdef APP-PLUS
//获取cid
function getCid() {
	return plus.push.getClientInfo().clientid
}
//#endif


// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
     // 返回最终结果
    return result;
}

//选择图片
function chooseImg(count=9) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count,
			success: res => {
				console.log('选择的图片:', res)
				resolve(res.tempFilePaths)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//上传文件
function uploadFile(obj, filePath, formData=null) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: obj.url,
			filePath: filePath,
			formData,
			name: obj.name,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}



module.exports = {
	//#ifdef APP-PLUS
	getCid,
	//#endif
	isPoneAvailable,
	isPasswordAvailable,
	formatTimeStamp,
	formatToTimeStamp,
	isChinese,
	formatList,
	setNewestFriendCard,
	deepClone,
	debounce,
	chooseImg,
	uploadFile
}