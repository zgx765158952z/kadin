<template>
	<view class="change-address2">
		
		<default-list class="first-name-list" :myRight="false">
			<view slot="def-list-left">
				收货人
			</view>
			<input slot="def-list-center" v-model="addressInfo.consignee" type="text" placeholder="姓名"/>
			<image slot="def-list-right" src="/static/image/personinfo/contact.png"></image>
		</default-list>
		
		<default-list :myRight="false">
			<view slot="def-list-left">
				手机号码
			</view>
			<input slot="def-list-center" v-model="addressInfo.phone" maxlength="11" type="number" placeholder="11位手机号"/>
		</default-list>
		
		<default-list :myRight="false">
			<view slot="def-list-left">
				地区信息
			</view>
			<input slot="def-list-center" v-model="addressInfo.region" type="text" placeholder="地区信息"/>
			<image slot="def-list-right" src="/static/image/personinfo/local.png"></image>
		</default-list>
		
		<default-list :myRight="false">
			<view slot="def-list-left">
				详细地址
			</view>
			<input slot="def-list-center" v-model="addressInfo.detailedAddress" type="text" placeholder="街道门牌信息"/>
		</default-list>
		
		<default-list :myRight="false">
			<view slot="def-list-left">
				邮政编码
			</view>
			<input slot="def-list-center" v-model="addressInfo.postal" type="text" placeholder="邮政编码"/>
		</default-list>
		
		
	</view>
</template>

<script>
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	import { mapState } from 'vuex'
	import { modifyUserInfo } from '@/network/changePersonInfo.js'
	
	export default {
		components: {
			DefaultList
		},
		data() {
			return {
				addressInfo: {},
				//新增我的地址模式
				newAddress: false,
				//编辑我的地址模式
				editAddress: false,
				chooseIndex: '',
				userAddressList: []
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		created() {
			const list = JSON.parse(this.userInfo.user.userAddress)
			if(list.length > 0) {
				this.userAddressList = list
			}
		},
		methods: {
			//新增我的地址模式: 判断表单是否有数据
			calcInfoList() {
				const obj = this.addressInfo;
				if(obj.consignee) {
					return true
				}
				if(obj.phone) {
					return true
				}
				if(obj.region) {
					return true
				}
				if(obj.address) {
					return true
				}
				if(obj.postal) {
					return true
				}
				return false
			},
			//修改我的地址模式: 判断表单数据是否有改变
			hasChangeAddressInfo() {
				const obj = this.userAddressList[chooseIndex]
				console.log(obj)
				if(obj !== this.addressInfo) {
					return true
				}else {
					return false
				}
			}
		},
		onBackPress(e) {
			if(e.from === 'navigateBack') {
				//返回
				return false
			}
			if(e.from === 'backbutton') {
				//新增地址模式：判断表单是否为空
				if(this.newAddress) {
					if(this.calcInfoList()) {
						uni.showModal({
							title: '提示',
							content: '确定放弃新增的信息？',
							success(res) {
								if(res.confirm) {
									uni.navigateBack()
								}else if(res.cancel){
									//表示禁止默认返回
									return true
								}
							},
							fail(err) {
								console.log(err)
								return true
							}
						})
					}else {
						return false
					}
				}
				
				//修改地址模式：判断表单是否被修改
				if(this.editAddress) {
					if(this.hasChangeAddressInfo()) {
						uni.showModal({
							title: '提示',
							content: '确定放弃修改的信息？',
							success(res) {
								if(res.confirm) {
									uni.navigateBack()
								}else if(res.cancel){
									//表示禁止默认返回
									return true
								}
							},
							fail(err) {
								console.log(err)
								return true
							}
						})
					}else {
						return false
					}
				}
			}
			return true
		},
		onLoad(option) {
			//判断是新增地址还是编辑地址
			if(option.index) {
				//编辑我的地址模式
				this.editAddress = true
				this.chooseIndex = option.index
				//修改导航栏标题为修改地址
				uni.setNavigationBarTitle({
					title: '修改地址'
				})
				//获取用户信息的地址，JSON序列化
				const userAddressList = this.userAddressList
				console.log(userAddressList)
				//取出需要编辑的地址用于展示
				this.addressInfo = userAddressList[option.index]
				console.log(this.addressInfo)
			}else{
				//新增我的地址模式
				this.newAddress = true
				//展示空内容
				this.addressInfo = {
					consignee: '',
					phone: '',
					region: '',
					detailedAddress: '',
					postal: ''
				}
			}
		},
		//保存信息
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				//新增地址模式
				if(this.newAddress){
					const obj = this.addressInfo;
					//判断表单是否填全
					if(obj.consignee && obj.phone && obj.region && obj.detailedAddress && obj.postal) {
						let list = []
						if(this.userInfo.user.userAddress.length > 0) {
							list = this.userAddressList
						}
						//向数组开头添加新增地址
						list.unshift(obj)
						//list重新序列化字符串存储到本地userInfo的userAddress
						const newList = JSON.stringify(list)
						const reqInfo = {
							userAccount: this.userInfo.user.userAccount,
							modifyContent: newList,
							modifyType: 3
						}
						modifyUserInfo(reqInfo).then(res => {
							if(res.status === 200) {
								if(res.data.code === 2000) {
									this.$set(this.userInfo.user, 'userAddress', newList)
									uni.setStorageSync('userInfo', this.userInfo)
									uni.navigateBack()
								}else {
									uni.showToast({
										title: '您可能与服务器断开了连接',
										icon: 'none'
									})
								}
								console.log(res)
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
							title: '请填写完整信息',
							icon: 'none'
						})
					}
				}
				//修改地址模式,表单是否修改
				if(this.editAddress) {
					if(this.hasChangeAddressInfo()) {
						const list = this.userAddressList
						list[this.chooseIndex] = this.addressInfo
						console.log(list)
						//list重新序列化字符串存储到本地userInfo的userAddress
						const newList = JSON.stringify(list)
						const reqInfo = {
							userAccount: this.userInfo.user.userAccount,
							modifyContent: newList,
							modifyType: 3
						}
						
						modifyUserInfo(reqInfo).then(res => {
							if(res.status === 200) {
								if(res.data.code === 2000) {
									this.$set(this.userInfo.user, 'userAddress', newList)
									uni.setStorageSync('userInfo', this.userInfo)
									uni.navigateBack()
								}else {
									uni.showToast({
										title: '您可能与服务器断开了连接',
										icon: 'none'
									})
								}
								console.log(res)
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
						//无修改直接返回
						uni.showToast({
							title: '无修改信息',
							icon: 'none'
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.change-address2 {
		.def-list {
			padding: 30rpx 0 30rpx 0 !important;
			margin: 0 40rpx !important;
			.def-list-center {
				margin-left: 50rpx !important;
				color: #000000 !important;
			}
			.def-list-right {
				image {
					width: 50rpx !important;
					height: 50rpx !important;
				}
			}
		}
		.first-name-list {
			.def-list-center {
				margin-left: 85rpx !important;
			}
		}
	}
</style>
