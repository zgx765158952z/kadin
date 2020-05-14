<template>
	<view class="GenderInfo">
		<default-list @click.native="changeCheckde(index)" v-for="(item, index) in genderChecked" :key="index" class="info-list" :myRight="false">
			<view slot="def-list-left">
				{{ item.value }}
			</view>
			<view v-if="item.checked" slot="def-list-right">
				<image src="/static/image/global/hook.png"></image>
			</view>
		</default-list>
	</view>
</template>

<script>
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	import { modifyUserInfo } from '@/network/changePersonInfo.js'
	
	import { mapState } from 'vuex'
	
	export default {
		components: {
			DefaultList
		},
		data() {
			return {
				hasMan: true,
				genderChecked: [
					{
						value: '男',
						checked: true
					},
					{
						value: '女',
						checked: false
					}
				]
			}
		},
		created() {
			if(this.userInfo.user.userSex) {
				this.changeCheckde(0)
			}else {
				this.changeCheckde(1)
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			
			//点击改变选择的性别
			changeCheckde(index) {
				//遍历出来item，改变所选择的checked为true，另一个为false
				for(let i=0; i<2; i++) {
					if(index === i) {
						this.genderChecked[i].checked = true
					}else {
						this.genderChecked[i].checked = false
					}
				}
				console.log(this.genderChecked)
			},
			
			//修改性别数据
			modifyUserSex() {
				for(let i=0; i<2; i++) {
					if(this.genderChecked[i].checked) {
						console.log(this.genderChecked[i].value)
						modifyUserInfo(
						{
							userAccount: this.userInfo.user.userAccount,
							modifyContent: this.genderChecked[i].value,
							modifyType: 5
						}
						).then(res => {
							if(res.status === 200) {
								if(res.data.code === 2000) {
									this.$set(this.userInfo.user, 'userSex', i===0 ? true:false)

									uni.setStorageSync('userInfo', this.userInfo)
									uni.showToast({
										title: '成功保存',
										icon: 'none'
									})
									uni.navigateBack()
								}else {
									uni.showToast({
										title: '服务器睡着了',
										icon: 'none'
									})
								}
							}else {
								uni.showToast({
									title: '您可能与服务器断开连接了',
									icon: 'none'
								})
							}
							
						}).catch(err => {
							uni.showToast({
								title: '您可能与服务器断开连接了',
								icon: 'none'
							})
							console.log(err)
						})
					}
				}
			}
			
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				this.modifyUserSex()
			}
		}
	}
</script>

<style lang="scss">
	.GenderInfo {
		height: 100vh;
		background-color: #F7F7F7;
		.info-list {
			.def-list-right {
				image {
					width: 50rpx!important;
					height: 50rpx!important;
				}
			}
		}
	}
</style>
