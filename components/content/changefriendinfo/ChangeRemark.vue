<template>
	<view v-if="changeInfo" class="change-remark">
		<view class="change-remark-list">
			<view class="change-remark-item">
				<view class="change-remark-item-title">
					备注名
				</view>
				<view class="input-item">
					<input @focus="focusInput1" @blur="blurInput1" v-model="changeInfo.remarkName" class="remark-name-input" type="text" focus placeholder="添加备注名" />
					<view v-if="isShowInput1" @tap.stop="delRemarkVal" class="my-iconfont input-del-icon">&#xe61a;</view>
				</view>
				
			</view>
			
			<view class="change-remark-item">
				<view class="change-remark-item-title">
					标签
				</view>
				<view @tap="toChangeLabel" class="input-item input-item-label">
					
					<view v-if="changeInfo.friendLabelList.length > 0" class="select-label-item">
						<view v-for="(item, index) in changeInfo.friendLabelList" :key="index" class="select-label">
							{{ item }}
						</view>
					</view>
					<input v-else disabled="true" class="label-input" type="text" placeholder="添加标签对联系人进行分类" />
				</view>
			</view>
			<view class="change-remark-item phone-input-item">
				<view class="change-remark-item-title phone-input-item-title">
					电话号码
				</view>
				<view v-for="(item, index) in changeInfo.friendPhoneList" :key="index" class="input-item">
					<block v-if="index < 5">
						<input @input="addingPhone" :data-index="index" class="phone-input phone-input-border" v-model="changeInfo.friendPhoneList[index]" type="number" placeholder="添加电话号码" />
						<view @tap.stop="delPhoneList(index)" v-if="item" class="my-iconfont input-del-icon">&#xe61a;</view>
					</block>
				</view>
			</view>
			
			<view class="change-remark-item">
				<view class="change-remark-item-title">
					描述
				</view>
				<view class="input-item">
					<input @focus="focusInput3" @blur="blurInput3" v-model="changeInfo.friendDescribe" class="describe-input" type="text" placeholder="添加更多备注信息" />
					<view v-if="isShowInput3" @tap.stop="delDescribeVal" class="my-iconfont input-del-icon">&#xe61a;</view>
				</view>
			</view>
			
		</view>
		
		<button @tap="updateFriendInfo" type="primary">完成</button>
	</view>
</template>

<script>
	import { getMyFriendInfoRequest, updateFriendInfoRequest } from '@/network/changefriendinfo.js'
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				//原始值
				friendInfo: {},
				//改变后的值
				changeInfo: {},
				//备注输入框显示
				isShowInput1: false,
				//描述输入框显示
				isShowInput3: false
				
				// friendLabelList: ['家人', '公司', '朋友', '死党', '同学', '大马猴xuxubaobao', '酱油瓶', 'cssssssss'],
				// friendPhoneList: ['13789786566', '13923686898', '']
			}
		},
		computed: {
			...mapState(['userInfo', 'friendList'])
		},
		methods: {
			
			
			//获取某个好友信息
			getMyFriendInfo(friendAccount) {
				getMyFriendInfoRequest(`?account=${this.userInfo.user.userAccount}&friendAccount=${friendAccount}`).then(res => {
					console.log(res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							const data = res.data.data
							//原始值
							this.friendInfo = data
							/*** 这个需要重新创建个变量指向新的内存地址
							不然修改changeInfo数据时，friendInfo也会跟着改变
							***/
							const newData = {
								friendAccount: data.friendAccount,
								remarkName: data.remarkName,
								friendDescribe: data.friendDescribe,
								friendLabelList: data.friendLabelList,
								friendPhoneList: data.friendPhoneList
							}
							if(this.friendInfo.friendDescribe === 'null') {
								this.friendInfo.friendDescribe = null
								newData.friendDescribe = null
							}
							
							if(this.friendInfo.friendPhoneList[0] === '') {
								this.friendInfo.friendPhoneList = []
								newData.friendPhoneList = []
							}
							
							
							//改变值
							this.changeInfo = newData
							
							//电话号码最后一位加入一个空字符串
							this.changeInfo.friendPhoneList.push('')
							console.log(this.changeInfo.friendPhoneList)
							
						}else {
							uni.showToast({
								title: '程序走丢了,请稍后重试',
								icon: 'none'
							})
						}
					}else if(res.status === 404) {
						uni.showToast({
							title: '网络走丢了,请稍后重试',
							icon: 'none'
						})
					}else {
						uni.showToast({
							title: '程序走丢了,请稍后重试',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: '程序走丢了,请稍后重试',
						icon: 'none'
					})
				})
			},
			//监听添加电话号码输入
			addingPhone(e) {
				//获取当前输入的index
				const currentIndex = e.currentTarget.dataset.index
				//获取friendPhoneList的最后一个的index
				const listLastIndex = this.changeInfo.friendPhoneList.length-1
				const lastStr = this.changeInfo.friendPhoneList[this.changeInfo.friendPhoneList.length-1]
				
				console.log('this.changeInfo.friendPhoneList:', this.changeInfo.friendPhoneList)
				console.log('this.friendInfo.friendPhoneList:', this.friendInfo.friendPhoneList)
				//正在输入的是最后一个
				if(currentIndex === listLastIndex) {
					//如果最后一个不是空字符串，就给他添加一个空字符串
					if(lastStr !== "") {
						console.log('添加空字符串')
						this.changeInfo.friendPhoneList.push("")
					}
				}else {
					//如果输入的不是最后一个，当空字符串时删除该位置的数据
					if(e.detail.value === '') {
						this.changeInfo.friendPhoneList.splice(currentIndex, 1)
					}
				}
			},
			
			//删除指定电话号码
			delPhoneList(index) {
				this.changeInfo.friendPhoneList.splice(index, 1)
			},
			//修改好友信息
			updateFriendInfo() {
				let obj = this.changeInfo
				obj['myAccount'] = this.userInfo.user.userAccount
				obj.friendPhoneList.splice(-1, 1)
				console.log('将要修改的好友信息：', obj)
				if(obj.remarkName) {
					updateFriendInfoRequest(obj).then(res => {
						console.log(res)
						if(res.status === 200) {
							if(res.data.code === 2000) {
								uni.$emit('changeFriendInfo',{})
								
								uni.$emit('updateFriendList',{})
								
								uni.navigateBack()
								
							}else {
								uni.showToast({
									title: '程序走丢了，请稍后重试',
									icon: 'none'
								})
							}
						}else if(res.status === 404) {
							uni.showToast({
								title: '网络走丢了，请稍后重试',
								icon: 'none'
							})
						}else {
							uni.showToast({
								title: '程序走丢了，请稍后重试',
								icon: 'none'
							})
						}
					}).catch(err => {
						uni.showToast({
							title: '程序走丢了，请稍后重试',
							icon: 'none'
						})
						console.log(err)
					})
				}else {
					uni.showToast({
						title: '请输入正确备注名',
						icon: 'none'
					})
				}
				
				
				
				
			},
			
			//判断数据是否修改
			friendInfoHasChange() {
				let obj = this.changeInfo
				const info = this.friendInfo
				obj.friendPhoneList.splice(-1, 1)
				console.log(this.changeInfo.friendPhoneList, this.friendInfo.friendPhoneList)
				if(obj.friendDescribe !== info.friendDescribe || obj.friendLabelList !== info.friendLabelList || obj.friendPhoneList !== info.friendPhoneList || obj.remarkName !== info.remarkName) {
					return true
				}else {
					return false
				}
			},
			
			//清除备注名输入框
			delRemarkVal() {
				this.$nextTick(() => {
					this.changeInfo.remarkName = ''
				})
			},
			//清除描述输入框
			delDescribeVal() {
				if(this.changeInfo.friendDescribe) {
					this.changeInfo.friendDescribe = ''
				}
			},
			
			/* 聚焦 */
			focusInput1(e) {
				this.isShowInput1 = true
			},
			focusInput3(e) {
				this.isShowInput3 = true
			},
			
			/* 失焦: 失焦时隐藏删除图标，需延时 */
			blurInput1() {
				setTimeout(() => {
					this.isShowInput1 = false
				}, 80)
			},
			blurInput3() {
				setTimeout(() => {
					this.isShowInput3 = false
				}, 80)
			},
			//跳转到ChangeLabel
			toChangeLabel() {
				const friendLabelList = this.changeInfo.friendLabelList
				const allLabelList = this.friendInfo.allLabelList
				
				uni.navigateTo({
					url: `/components/content/changefriendinfo/ChangeLabel`,
					success: res => {
						uni.setStorageSync('friendLabelList', friendLabelList)
						uni.setStorageSync('allLabelList', allLabelList)
					}
				})
			}
		},
		
		onBackPress(e) {
			if(e.from === 'navigateBack') {
				//API返回时执行
				return false
			}
			
			if(e.from === 'backbutton') {
				//物理返回执行
				uni.showModal({
					title: '提示',
					content: '是否保存修改',
					success: res => {
						
						if(res.confirm) {
							this.updateFriendInfo()
						}else if(res.cancel) {
							console.log('取消修改')
							uni.navigateBack()
						}
					}
					
				})
				
			}
			return true
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				console.log('完成')
				this.updateFriendInfo()
			}
		},
		onLoad(option) {
			
			if(option.friendAccount) {
				const friendAccount = option.friendAccount
				this.getMyFriendInfo(friendAccount)
			}
			
			//监听是否有保存修改标签
			uni.$on('saveFriendInfoLabel', friendLabelList => {
				console.log(friendLabelList)
				this.changeInfo.friendLabelList = friendLabelList.friendLabelList
			})
			
		}
	}
</script>

<style lang="scss">
	.change-remark {
		height: 100vh;
		width: 100%;
		background-color: #F7F7F7;
		box-sizing: border-box;
		padding-top: 1rpx;
		border-top: 1rpx solid rgba(100, 100, 100, .1);
		font-size: $uni-font-size-base;
		.change-remark-list {
			
			.change-remark-item {
				
				.input-item {
					position: relative;
					.input-del-icon {
						display: flex;
						align-items: center;
						justify-content: center;
						position: absolute;
						right: 20rpx;
						top: 50%;
						margin-top: -25rpx;
						z-index: 88;
						width: 50rpx;
						height: 50rpx;
						font-size: $uni-font-size-lg;
						color: $uni-text-color-grey;
					}
				}
				
				//标签
				.input-item-label {
					.select-label-item {
						
						display: flex;
						flex-flow: row wrap;
						justify-content: flex-start;
						align-items: center;
						align-content: center;
						padding: 30rpx;
						background-color: #FFFFFF;
						
						.select-label {
							display: flex;
							align-items: center;
							margin: 10rpx;
							padding: 6rpx 18rpx;
							color: #07C160;
							box-shadow: 0 0 5rpx #07C160;
							border-radius: 30rpx;
							text-align: center;
							background-color: #FFFFFF;
						}
					}
				}
				.phone-input {
					border-bottom: 1rpx solid rgba(100, 100, 100, .1);
				}
				.change-remark-item-title {
					padding: 15rpx 0;
					margin-left: 30rpx;
					font-size: $uni-font-size-sm;
					color: #666666;
				}
				
				.remark-name-input, .label-input, .phone-input, .describe-input {
					padding: 30rpx;
					background-color: #FFFFFF;
					font-size: $uni-font-size-lg;
					position: relative;
					z-index: 1;
				}
			}
			
			
			
		}
		
	}
</style>
