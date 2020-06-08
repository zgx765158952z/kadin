<template>
	<view class="changepwd1 set-bgc">
		<view class="center-content">
			<view class="login-content">
				<view class="login-head">
					验证帐户信息
				</view>
				<view class="login-form">
					<form @submit="registerClick">
						<view class="my-input">
							<input @input="handlerUserPhone" @blur="userPhoneInputDefocus" v-model="userPhone" class="def-input" type="number" maxlength="11" name="userPhone" placeholder="手机号/用户名" />
							<view class="def-input-del" @tap="delInput">
								<text v-if="showPhoneInput" class="my-iconfont def-input-del-icon">&#xe61a;</text>
							</view>
						</view>
						<view class="input-and-code">
							<input class="left-input" maxlength="4" type="number" name="code" placeholder="短信验证码" />
							<!-- <button :disabled="sendCodeBtn"  type="primary">{{ sendCodeBtnVal }}</button> -->
							<text @tap="cliSendCode" class="right-btn def-font-lg" :class="{'right-btn-disabled': sendCodeBtn}">{{ sendCodeBtnVal }}</text>
						</view>
						<button type="primary" class="def-button" form-type="submit">下一步</button>
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
		mixins: [sendCodeMixin],
		data() {
			return {
				showPhoneInput: false
			}
		},
		methods: {
			toChangepwd2() {
				console.log('toChangepwd2')
			},
			
			//验证手机号与验证码
			registerClick(e) {
				let val = e.detail.value;
				if(isPoneAvailable(val.userPhone)) {
					if(this.getCode === parseInt(val.code)) {
						uni.navigateTo({
							url: '/components/content/changepwd/changepwd2?userPhone=' + val.userPhone
						})
					}else {
						uni.showToast({
							title: '验证码错误',
							icon: 'none'
						})
					}
				}else {
					uni.showToast({
						title: '手机号为11位',
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
	// .changepwd1 {
	// 	height: 100vh;
	// 	margin: 0 auto;
		
	// }
</style>
