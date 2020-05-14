<template>
	<view class="setting">
		
		<default-list :noBorderBtm="true">
			<text slot="def-list-left">帐户与安全</text>
		</default-list>
		
		<default-list class="setting-item2">
			<text slot="def-list-left">新消息提醒</text>
		</default-list>
		
		<default-list>
			<text slot="def-list-left">勿扰模式</text>
		</default-list>
		
		<default-list>
			<text slot="def-list-left">聊天</text>
		</default-list>
		
		<default-list>
			<text slot="def-list-left">隐私</text>
		</default-list>
		
		<default-list :noBorderBtm="true">
			<text slot="def-list-left">通用</text>
		</default-list>
		
		
		<view class="setting-list2">
			<view class="item1" hover-class="tap-hover-color">
				切换帐号
			</view>
			<view @click="toLogin" hover-class="tap-hover-color" class="item2">
				退出登录
			</view>
			
		</view>
	</view>
</template>

<script>
	import DefaultList from "@/components/content/defaultlist/DefaultList.vue"
	
	import { mapMutations } from 'vuex'
	
	
	export default {
		components: {
			DefaultList
		},
		methods: {
			...mapMutations(['logout']),
			toLogin() {
				uni.showModal({
					title: '提示',
					content: '您确定要退出当前帐户?',
					success: res => {
						if(res.confirm) {
							
							//清除全局userInfo，改变hasLogin为false(未登录状态)
							//清除本地仓储userInfo
							this.logout()
							
							uni.reLaunch({
								url: '/components/content/login/login'
							})
						}else if(res.cancel) {
							return false
						}
					},
					fail: err => {
						console.log(err)
					}
					
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.setting {
		height: 100vh;
		background-color: #F0F0F0;
		
		.setting-item2 {
			.defaultlist {
				margin-top: 30rpx;
			}
		}
		
		
		.setting-list2 {
			text-align: center;
			margin: 70rpx 0;
			.item1 {
				background-color: #FFFFFF;
				margin-bottom: 30rpx;
				padding: 20rpx 0;
			}
			.item2 {
				background-color: #FFFFFF;
				padding: 20rpx 0;
			}
		}
	}
</style>
