
/***
		1.发送验证码
***/
import { sendCode, queryPhoneHasBeenUsed } from '@/network/register.js'
import { isPoneAvailable } from '@/common/index.js'


//发送验证码混入模块
const sendCodeMixin = {
	data() {
		return {
			//绑定手机号input
			userPhone: '',
			//绑定点击发送button: disabled
			sendCodeBtn: false,
			//绑定点击发送button:  value
			sendCodeBtnVal: '发送验证码',
			counter: 60,
			//绑定验证码input
			getCode:null,
			//存储定时
			interval: null
		}
	},
	methods: {
		//发送验证码
		cliSendCode() {
			if(isPoneAvailable(this.userPhone)) {
				//验证码倒计时
				this.countDown();
				sendCode("?phone=" + this.userPhone).then(res => {
					if(res.status === 200) {
						if(res.data.code === 4000) {
							uni.showToast({ title: '非法手机号', icon: 'none' });
						}else if(res.data.code === 5003) {
							uni.showToast({ title: '发送验证码操作频繁,请稍后再获取', icon: 'none' });
						}else if(res.data.code === 2000) {
							this.getCode = res.data.data;
							uni.showToast({ title: '发送成功', icon: 'none' });
						} else {
							uni.uni.showToast({ title: '发送失败', icon: 'none' });
						}
						
					} else {
						uni.uni.showToast({ title: '您可能与服务器断开了连接', icon: 'none' });
					}
					
					console.log(res)
				}).catch(err => {
					uni.showToast({ title: '您可能与服务器断开了连接', icon: 'none' });
				}).finally(() => {
					console.log('finally')
				})
			}else {
				uni.showToast({ title: '请填写正确手机号', icon: 'none' })
			}
		},
		//手机号输入框失焦时,判断手机是否注册
		userPhoneInputDefocus(e) {
			//获取当前页面栈的实例,拿到页面url,用于判断当前操作是注册还是修改密码
			const pages = getCurrentPages();
			
			const value = e.detail.value;
			if(value.length > 0 && value.length === 11) {
				queryPhoneHasBeenUsed(`?phone=${value}`).then(res => {
					if(res.status === 200) {
						console.log(res)
						if(res.data.code === 4003) {
							if(pages[pages.length-1].route === 'components/content/register/register1') {
								uni.showToast({ title: '该号码已注册', icon: 'none' })
							}
							
						}else if(res.data.code === 2000) {
							if(pages[pages.length-1].route === 'components/content/changepwd/changepwd1') {
								uni.showToast({ title: '该号码未注册', icon: 'none' })
							}
						}
						
					} else {
						uni.showToast({ title: '您可能与服务器断开了连接', icon: 'none' })
					}
				}).catch(err => {
					uni.showToast({ title: '您可能与服务器断开了连接', icon: 'none'
					})
				})
			} else {
				uni.showToast({ title: '手机号为11位', icon: 'none' })
			}
		},
		//验证码倒计时
		countDown() {
			this.interval = setInterval(() => {
				if(this.counter>0) {
					--this.counter;
					this.sendCodeBtnVal = this.counter +'s后重新获取';
					this.sendCodeBtn = true;
				}else if(this.counter === 0) {
					this.sendCodeBtnVal = '重新发送验证码';
					this.sendCodeBtn = false;
					this.counter=60;
					clearInterval(this.interval)
				}
				
			}, 1000)
		}
		
	},
	
	onUnload() {
		//页面卸载时清除定时器
		clearInterval(this.interval)
	}
}





//首页遮罩层与弹窗
const listPopShadeMixin = {
	data() {
		return {
			winSize: {},
			//遮罩的显示与隐藏
			showPop: false,
			//弹窗显示与隐藏
			showPopList: false,
			//弹窗定位的样式
			popStyle: "",
			//弹窗列表
			popList: ['标为关注', '置顶聊天', '删除该聊天'],
			//当前选择用户
			pickerUserIndex: -1
		}
	},
	methods: {
		/* 获取窗口尺寸 */
		getWindowSize() {
			uni.getSystemInfo({
				success: res => {
					this.winSize = {
						//窗口宽高
						'width': res.windowWidth,
						'height': res.windowHeight,
						//app状态栏高度
						"statusBarHeight": res.statusBarHeight
					}
					console.log(this.winSize)
				}
			})
		},
		/* 长按 */
		handlerLongtap(e) {
			console.log(e)
			/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
			let [touches, style, index] = [e.touches[0], "", e.currentTarget.dataset.index]
		
			if(touches.clientY > (this.winSize.height/2) ) {
				
				/* APP端还要再减去状态栏 */
				// #ifdef APP-PLUS
				style = `bottom: ${this.winSize.height-touches.clientY-this.winSize.statusBarHeight-20}px; `
				// #endif
				
				/* 微信小程序端 */
				// #ifdef MP-WEIXIN
				style = `bottom: ${this.winSize.height-touches.clientY}px; `
				// #endif
			}else {
				style = `top: ${touches.clientY}px; `
			}
			
			if(touches.clientX > (this.winSize.width/2)) {
				style += `right: ${this.winSize.width-touches.clientX}px; `
			}else {
				style += `left: ${touches.clientX}px; `
			}
			//设备短震动
			uni.vibrateShort({
				success: res => {
					console.log('设备短震动')
				}
			})
			//弹窗定位的样式
			this.popStyle = style
			//当前选择列表的index
			this.pickerUserIndex = Number(index)
			//显示弹窗
			this.showPopList = true
			//显示遮罩
			this.showPop = true
			
			
		},
		//隐藏遮罩和弹窗
		hidePop() {
			this.showPopList = false
			//隐藏时取消选中列表
			this.pickerUserIndex = -1
			setTimeout(() => {
				this.showPop = false
			}, 300)
		},
		//出现弹窗时禁止点击list
		tapList() {
			if(this.showPop) {
				return
			}
		},
		
		/* 别删 */
		//阻止通过遮罩层滚动底下list,并隐藏遮罩层
		moveHandle() {
			this.hidePop()
		}
	},
	beforeMount() {
		this.getWindowSize()
	},
	onUnload() {
		console.log('onUnload')
	}
	
}

import { imgBaseUrl } from '@/common/helper.js'
import { formatList } from '@/common/index.js'



/*  选择好友模块  */
const chooseFriendMixin = {
	data() {
		return {
			//图片前缀地址
			imgUrl: '',
			//该组件作用:创建群、邀请人入群、添加管理员
			chooseFriendType: '',
			//存储选择朋友列表
			list: [],
			lettersList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'],
			//是否触摸显示字母
			indexAlert: false,
			//当前触摸字母
			currentLetter: '',
			// 索引单个字母高度
			oneLetterHeight: 0,
			scrollStyle: '',
			//横向滚动left
			selectScrollLeft: 0,
			//已选择好友个数
			selectedItem: 0
		}
	},
	methods: {
		//开始触摸
		touchStart(e) {
			//计算触摸了哪个字母pageY-索引列表距离顶部距离再除以/单个索引高度
			let pageY = e.touches[0].pageY
			//这个index算上回到顶部按钮,Math.floor取整
			let index = Math.floor((pageY-15)/this.oneLetterHeight)
			if(index === 0) {
				this.indexAlert = false
				this.currentLetter = 'top'
			}else {
				const item = this.list[index-1].list
				if(item.length>0) {
					this.indexAlert = true
					this.currentLetter = this.lettersList[index-1]
				}else {
					this.indexAlert = false
				}
			}
			
			
			
		},
		
		//触摸移动
		touchMove(e) {
			//计算触摸了哪个字母pageY-索引列表距离顶部距离再除以/单个索引高度
			let pageY = e.touches[0].pageY
			//这个index算上回到顶部按钮,Math.floor取整
			let index = Math.floor((pageY-15)/this.oneLetterHeight)
			if(index === 0) {
				this.indexAlert = false
				this.currentLetter = 'top'
			}else {
				const item = this.list[index-1].list
				if(item.length>0) {
					this.indexAlert = true
					this.currentLetter = this.lettersList[index-1]
				}else {
					this.indexAlert = false
				}
			}
		},
		
		//触摸结束
		touchEnd() {
			console.log('touchEnd')
			this.$nextTick(() => {
				this.indexAlert = false
				//清除当前滚动的定位
				this.currentLetter = ''
			})
		},
		
		//触摸被打断
		touchCancel() {
			console.log('touchCancel')
			this.$nextTick(() => {
				this.indexAlert = false
				//清除当前滚动的定位
				this.currentLetter = ''
			})
		},
		
		
		
		// #ifdef APP-PLUS
		changeRightTopBtn() {
			//获取当前窗口，修改导航栏button样式
			let webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewButtonStyle(0, {
				"text": `确定(${this.selectedItem}) `
			})
		},
		// #endif
		
		
		//删除底部已选好友
		delSelectItem(index1, index2) {
			this.$nextTick(() => {
				this.list[index1].list[index2].checked = false
				this.selectedItem -= 1
				this.$forceUpdate()
				// #ifdef APP-PLUS
				this.changeRightTopBtn()
				// #endif
			})
		},
		
		
		//获取已选择好友的帐号列表
		getHasChosenAccountList() {
			let accountList = []
			this.list.forEach(item1 => {
				if(item1.list.length>0) {
					item1.list.forEach(item2 => {
						if(item2.checked) {
							accountList.push(item2.friendAccount)
						}
					})
				}
			})
			return accountList
		}
	},
	onNavigationBarButtonTap(option) {
		if(option.index === 0) {
			this.submitChoose()
		}
	},
	onLoad(option) {
		this.imgUrl = imgBaseUrl
		//设置scroll-view的样式，高度
		const windowHeight = uni.getSystemInfoSync().windowHeight
		this.scrollStyle = `height: ${windowHeight-60}px`
	},
	mounted() {
		const query = uni.createSelectorQuery().in(this)
		query.select('.letters-index-list').boundingClientRect(data => {
			this.oneLetterHeight = data.height/28
		}).exec()
	}
}


export { 
	sendCodeMixin,
	listPopShadeMixin,
	chooseFriendMixin
}