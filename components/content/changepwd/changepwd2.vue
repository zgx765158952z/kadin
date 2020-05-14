<template>
	<view class="changepwd2 set-bgc">
		<view class="center-content">
			<view class="login-content">
				<view class="login-head">
					设置您的新密码
				</view>
				<view class="login-form">
					<form @submit="registerClick">
						<view class="my-input">
							<input v-model="password1" @input="handlerPassword1" class="def-input" type="password" maxlength="16" name="password1" placeholder="设置新密码" />
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
						<button type="primary" class="def-button def-font-lg" form-type="submit">修改</button>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { changepwdRequest } from '@/network/changepwd.js'
	import { isPasswordAvailable } from '@/common/index.js'
	
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
		methods: {
			
			registerClick(e) {
				const value = e.detail.value
				console.log(e.detail.value.password1)
				console.log(e.detail.value.password2)
				if(value.password1.length >0 && value.password2.length >0) {
					if(value.password1 === value.password2) {
						if(isPasswordAvailable(value.password2)) {
							changepwdRequest({
								phone: this.userPhone,
								newPassword: value.password2
							}).then(res => {
								if(res.status === 200) {
									if(res.data.code === 2000) {
										uni.showToast({
											title: '设置成功',
											icon: 'none'
										})
										uni.navigateTo({
											url: `/components/content/login/login?userPhone=${this.userPhone}`
										})
									}else {
										uni.showToast({
											title: '服务器出了点小失误',
											icon: 'none'
										})
									}
								}else {
									uni.showToast({
										title: '服务器出了点小失误',
										icon: 'none'
									})
								}
								console.log(res)
							}).catch(err => {
								uni.showToast({
									title: '您可能与服务器断开了连接',
									icon: 'none'
								})
							})
						}else {
							uni.showToast({
								title: '密码为8-16位',
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
	// .changepwd2 {
	// 	height: 100vh;
	// 	margin: 0 auto;
	// 	.login-head {
	// 		text-align: center;
	// 		font-size: 40rpx;
	// 		font-weight: bold;
	// 		color: #333366;
	// 	}
	// }
</style>
