<template>
	<view class="choose-city">
		<block v-if="cityList.length > 1">
			<block v-for="(item, index) in cityList" :key="index">
				<default-list @click.native="toChooseLocation(item.name)">
					<view slot="def-list-left">
						{{ item.name }}
					</view>
				</default-list>
			</block>
		</block>
		
		<block v-else>
			<block v-for="(item, index) in cityList[0].districtAndCounty" :key="index">
				<default-list @click.native="toChooseLocation(item)">
					<view slot="def-list-left">
						{{ item }}
					</view>
				</default-list>
			</block>
		</block>
		
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
				cityList: [],
				province: ''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			//保存选择的地区，并返回到ChooseLocation
			toChooseLocation(city) {
				const obj = {
					userAccount: this.userInfo.user.userAccount,
					modifyContent: this.province + city,
					modifyType: 4
				}
				
				if(this.province && city) {
					modifyUserInfo(obj).then(res => {
						if(res.status === 200) {
							if(res.data.code === 2000) {
								this.$set(this.userInfo.user, 'region', obj.modifyContent)
								uni.setStorageSync('userInfo', this.userInfo)
								uni.showToast({
									title: '成功保存',
									icon: 'none'
								})
								uni.navigateBack({
									delta: 2
								})
							}else {
								uni.showToast({
									title: '您可能与服务器断开了连接',
									icon: 'none'
								})
							}
						}else {
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
						console.log(err)
					})
				}else {
					uni.showToast({
						title: '选择地区发生错误，请稍后再试',
						icon: 'none'
					})
				}
				
				
			}
		},
		onLoad(option) {
			//接收ChooseProvince传过来的城市列表以及当前省份,JSON序列化
			const cityList = JSON.parse(decodeURIComponent(option.cityList))
			const province = JSON.parse(decodeURIComponent(option.province))
			this.cityList = cityList
			this.province = province
		}
	}
</script>

<style>
</style>
