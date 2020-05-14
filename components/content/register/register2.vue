<template>
	<view class="register2 set-bgc">
		<view class="center-content">
			<view class="login-content">
				<view class="login-head">
					设置密码
				</view>
				<view class="login-form">
					<form @submit="registerClick">
						<view class="my-input">
							<input v-model="password1" @input="handlerPassword1" class="def-input" type="password" maxlength="16" name="password1" placeholder="设置您的密码" />
							<view class="def-input-del" @tap="delPwd1Input">
								<text v-if="showPassword1Input" class="my-iconfont def-input-del-icon">&#xe61a;</text>
							</view>
						</view>
						<view class="my-input">
							<input v-model="password2" @input="handlerPassword2" class="def-input" type="password" maxlength="16" name="password2" placeholder="确认密码" />
							<view class="def-input-del" @tap="delPwd2Input">
								<text v-if="showPassword2Input" class="my-iconfont def-input-del-icon">&#xe61a;</text>
							</view>
						</view>
						<button type="primary" class="def-button def-font-lg" form-type="submit">注册</button>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { doRegister } from '@/network/register.js'
	import { 
		//#ifdef APP-PLUS
		getCid,
		//#endif
		isPasswordAvailable
	} from '@/common/index.js'
	
	import { mapMutations, mapActions } from 'vuex'
	
	
	
	export default {
		data() {
			return {
				userPhone: '',
				password1: '',
				password2: '',
				showPassword1Input: false,
				showPassword2Input: false
			}
		},
		methods:{
			...mapMutations(['setLogin']),
			...mapActions(['doGetMyUserInfo']),
			//注册按钮
			registerClick(e) {
				const val = e.detail.value;
				if(val.password1.length> 0 && val.password2.length> 0) {
					if(val.password1 === val.password2) {
						if(isPasswordAvailable(val.password1)) {
							//#ifdef APP-PLUS
							const cid = getCid() //获取cid
							//#endif
							const obj = {
								//#ifdef APP-PLUS
								cid,
								//#endif
								//#ifdef MP-WEIXIN
								cid: '116f951ea532bc59e1e0ae479068f4bd',
								//#endif
								userPhone: this.userPhone,
								userPassword: val.password2
							}
							console.log('obj:', obj)
							doRegister(obj).then(res => {
								console.log(res)
								if(res.data.code === 4003) {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
								if(res.data.code === 2000) {
									const userInfo = res.data.data
									
									//将用户微信息保存（全局userInfo、hasLogin和本地仓储）,设置当前为已登录状态
									this.setLogin(userInfo)
									
									
									uni.showToast({
										title: '注册成功',
										icon: 'none',
										mask: true
									})
									//关闭所有页面，跳转到index页面
									uni.reLaunch({
										url: '/pages/index/index'
									})
								}
							}).catch(err => {
								uni.showToast({
									title: '服务器发生错误，请稍后重试',
									icon: 'none'
								})
								console.log(err)
							})
						}else {
							uni.showToast({
								title: '密码为8-16位任意字符',
								icon: 'none'
							})
						}
						
					}else {
						uni.showToast({
							title: '两次密码不一致',
							icon: 'none'
						})
					}
				}else {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					})
				}
				
				
			},
			//监听pwd1输入
			handlerPassword1(e) {
				if(e.detail.value.length > 0) {
					this.showPassword1Input = true
				}else {
					this.showPassword1Input = false
				}
			},
			//监听pwd2输入
			handlerPassword2(e) {
				if(e.detail.value.length > 0) {
					this.showPassword2Input = true
				}else {
					this.showPassword2Input = false
				}
			},
			
			//清除pwd1输入
			delPwd1Input() {
				this.showPassword1Input = false;
				this.password1 = '';
			},
			
			//清除pwd2输入
			delPwd2Input() {
				this.showPassword2Input = false;
				this.password2 = '';
			}
		},
		onLoad(option) {
			console.log(option.userPhone)
			this.userPhone = option.userPhone
		}
		
	}
</script>

<style lang="scss">
	.register2 {
		height: 100vh;
		margin: 0 auto;
		.login-head {
			text-align: center;
			font-size: 40rpx;
			font-weight: bold;
			color: #333366;
		}
	}
</style>
