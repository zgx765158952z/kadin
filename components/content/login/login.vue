<template>
	<view class="login set-bgc">
		<view class="center-content">
			<view class="login-content">
				<view class="login-head">
					登录帐户
				</view>
				<view class="login-form">
					<form @submit="loginClick">
						<view class="my-input">
							<input @input="handlerUserPhone" v-model="userPhone" class="def-input" type="text" maxlength="11" name="userPhone" placeholder="手机号/用户名" />
							<view class="def-input-del" @tap.stop="delUserPhone">
								<text v-if="showUserPhone" class="my-iconfont def-input-del-icon">&#xe61a;</text>
							</view>
						</view>
						<view class="my-input">
							<input @input="handlerUserPassword" v-model="userPassword" class="def-input" type="password" name="userPassword" placeholder="密码" />
							<view class="def-input-del" @tap="delUserPassword">
								<text v-if="showUserPassword" class="my-iconfont def-input-del-icon">&#xe61a;</text>
							</view>
						</view>
						<button type="primary" class="def-button def-font-lg" form-type="submit">登录</button>
					</form>
				</view>
				
				<view class="login-more">
					<text @tap="toChangepwd1" class="login-more-left">忘记密码?</text>
					<text class="login-more-right" @tap="toRegister1">创建新用户</text>
				</view>
				<view class="dividing-line">
					<view class="line-left line"><view class="line-left-text">左中划线</view></view>
					<view class="line-font def-font-base">或</view>
					<view class="line-right line"><view class="line-right-text">右中划线</view></view>
				</view>
				
				<view class="login-other">
					<view class="login-other-img">
						<image src="/static/image/payment/wechat.png"></image>
					</view>
					<view class="login-other-title def-font-lg">微信登录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { doLogin } from '@/network/login.js'
	import { 
		//#ifdef APP-PLUS
		getCid,
		//#endif
		isPoneAvailable, 
		isPasswordAvailable
	} from '@/common/index.js'
	
	import { mapState, mapMutations, mapActions } from 'vuex'
	
	import baseUrl  from '@/common/helper.js'
	
	export default {
		components: {
			
		},
		data() {
			return {
				userPhone: '',
				userPassword: '',
				showUserPhone: false,
				showUserPassword: false
			}
		},
		methods: {
			...mapMutations(['setLogin']),
			...mapActions(['doGetMyUserInfo']),
			loginClick(e) {
				const value = e.detail.value;
				//#ifdef APP-PLUS
				const cid = getCid()
				//#endif
				const userData = {
					//#ifdef APP-PLUS
					cid,
					//#endif
					//#ifdef MP-WEIXIN
					cid: '9f5ebffc66c1c4627abd08f2f782e10a',
					//#endif
					userPhone: value.userPhone,
					userPassword: value.userPassword
				}
				if(isPoneAvailable(value.userPhone)) {
					if(isPasswordAvailable(value.userPassword)) {
						doLogin(userData).then(res => {
							const data = res.data;
							console.log(res)
							if(res.status === 200) {
								if(data.code === 2000) {
									const userInfo = res.data.data
									
									//存储 用户微信息(全局userInfo、hasLogin和本地仓储userInfo)
									this.setLogin(userInfo)
									
									//请求用户详细信息
									this.doGetMyUserInfo()
									
									uni.showToast({
										title: '正在登录',
										icon: 'none'
									})
									
									uni.reLaunch({
										url: '/pages/index/index'
									})
								}else if(data.code === 4003) {
									uni.showToast({
										title: '密码错误',
										icon: 'none'
									})
								}else if(data.code === 4004) {
									uni.showToast({
										title: '号码未注册,请先注册再登录',
										icon: 'none'
									})
								}else if(data.code === 4000) {
									uni.showToast({
										title: '手机号码或者密码不能为空',
										icon: 'none'
									})
								}else {
									console.log('11111')
									uni.showToast({
										title: '您可能与服务器断开了连接',
										icon: 'none'
									})
								}
								
								
								
							}else {
								console.log('22222')
								uni.showToast({
									title: '您可能与服务器断开了连接',
									icon: 'none'
								})
							}
							
							
						}).catch(err => {
							console.log('33333')
							console.log(err)
							uni.showToast({
								title: '您可能与服务器断开了连接',
								icon: 'none'
							})
						})
					}else {
						uni.showToast({
							title: '密码错误',
							icon: 'none'
						})
					}
					
				}else {
					uni.showToast({
						title: '请输入正确手机号',
						icon: 'none'
					})
				}
			},
			delUserPhone() {
				setTimeout(() => {
					this.userPhone = '';
					this.showUserPhone = false
				}, 80)
			},
			delUserPassword() {
				setTimeout(() => {
					this.userPassword = '';
					this.showUserPassword = false
				}, 80)
			},
			//监听输入
			handlerUserPhone(e) {
				if(e.detail.value.length > 0) {
					this.showUserPhone = true
				}else if(e.detail.value.length === 0) {
					this.showUserPhone = false
				}
			},
			handlerUserPassword(e) {
				if(e.detail.value.length > 0) {
					this.showUserPassword = true
				}else if(e.detail.value.length === 0) {
					this.showUserPassword = false
				}
			},
			
			
			toRegister1() {
				uni.navigateTo({
					url: '/components/content/register/register1'
				})
			},
			toChangepwd1() {
				uni.navigateTo({
					url: '/components/content/changepwd/changepwd1'
				})
			}
		},
		onNavigationBarButtonTap(options) {
			if(options.index === 0) {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
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
