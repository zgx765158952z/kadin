
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
							uni.showToast({
								title: '非法手机号',
								icon: 'none'
							});
						}else if(res.data.code === 5003) {
							uni.showToast({
								title: '发送验证码操作频繁，请稍后再获取',
								icon: 'none'
							});
						}else if(res.data.code === 2000) {
							this.getCode = res.data.data;
							uni.showToast({
								title: '发送成功',
								icon: 'none'
							});
						} else {
							uni.uni.showToast({
								title: '发送失败',
								icon: 'none'
							});
						}
						
					} else {
						uni.uni.showToast({
							title: '您可能与服务器断开了连接',
							icon: 'none'
						});
					}
					
					console.log(res)
				}).catch(err => {
					uni.showToast({
						title: '您可能与服务器断开了连接',
						icon: 'none'
					});
				}).finally(() => {
					console.log('finally')
				})
			}else {
				uni.showToast({
					title: '请填写正确手机号',
					icon: 'none'
				})
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
								uni.showToast({
									title: '该号码已注册',
									icon: 'none'
								})
							}
							
						}else if(res.data.code === 2000) {
							if(pages[pages.length-1].route === 'components/content/changepwd/changepwd1') {
								uni.showToast({
									title: '该号码未注册',
									icon: 'none'
								})
							}
						}
						
					} else {
						uni.showToast({
							title: '您可能与服务器断开了连接',
							icon: 'none'
						})
					}
				}).catch(err => {
					uni.showToast({
						title: '您可能与服务器断开了连接',
						icon: 'none'
					})
				})
			} else {
				uni.showToast({
					title: '手机号为11位',
					icon: 'none',
					duration: 500
				})
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
			
			
			//弹窗定位的样式
			this.popStyle = style
			//当前选择列表的index
			this.pickerUserIndex = Number(index)
			//显示遮罩
			this.showPop = true
			this.$nextTick(() => {
				setTimeout(() => {
					//显示弹窗
					this.showPopList = true
				}, 10)
			})
			
		},
		//隐藏遮罩和弹窗
		hidePop() {
			this.showPopList = false
			setTimeout(() => {
				this.showPop = false
				//隐藏时取消选中列表
				this.pickerUserIndex = -1
			}, 250)
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
export { 
	sendCodeMixin,
	listPopShadeMixin
}