<template>
	<view class="register1 set-bgc">
		<view class="center-content">
			<view class="login-content">
				<view class="login-head">
					注册帐户
				</view>
				<view class="login-form">
					<form @submit="registerClick" @reset="resetClick">
						<view class="my-input">
							<input @input="handlerUserPhone" @blur="userPhoneInputDefocus" v-model="userPhone" class="def-input" type="number" maxlength="11" name="userPhone" placeholder="请输入手机号" />
							<view @tap="delInput" class="def-input-del">
								<text v-if="showPhoneInput" class="my-iconfont def-input-del-icon">&#xe61a;</text>
							</view>
						</view>
						<view class="input-and-code">
							<input class="left-input def-font-lg" maxlength="4" type="number" name="code" placeholder="短信验证码" />
							<button :disabled="sendCodeBtn" @click="cliSendCode" class="right-btn def-font-lg" type="primary">{{ sendCodeBtnVal }}</button>
						</view>
						<button form-type="submit" type="primary" class="def-button def-font-lg">下一步</button>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { sendCodeMixin } from '@/common/utils.js'
	import { isPoneAvailable } from '@/common/index.js'


	export default {
		data() {
			return {
				showPhoneInput: false
			}
		},
		mixins: [sendCodeMixin],
		methods: {
			toRegister2() {
				uni.navigateTo({
					url: "/components/content/register/register2"
				})
			},
			//验证手机号与验证码
			registerClick(e) {
				let val = e.detail.value;
				if(isPoneAvailable(val.userPhone)) {
					if(this.getCode === parseInt(val.code)) {
						uni.navigateTo({
							url: '/components/content/register/register2?userPhone=' + val.userPhone
						})
					}else {
						uni.showToast({
							title: '验证码错误',
							icon: 'none'
						})
					}
				}else {
					uni.showToast({
						title: '手机号错误',
						icon: 'none'
					})
				}
				
			},
			//监听输入内容
			handlerUserPhone(e) {
				if(e.detail.value.length > 0) {
					this.showPhoneInput = true
				} else {
					this.showPhoneInput = false
				}
			},
			//清除手机号输入框
			delInput() {
				setTimeout(() => {
					this.userPhone = '';
					this.showPhoneInput = false;
				}, 80)
			}
			
			
			
			
			
			
			
		}
	}
</script>

<style lang="scss">
	.register1 {
		height: 100vh;
		margin: 0 auto;
		
	}
</style>
