<template>
	<view class="remind">
		<view class="remind-head">
			<input @focus="isFocus1" focus @blur="isBlur1" v-model="remindInfo.remindTitle" class="remind-head-son" type="text" placeholder="提醒标题..." />
			<text @tap.stop="resetInput1" v-if="showDel1" class="my-iconfont del-icon">&#xe627;</text>
		</view>
		<view class="remind-msg">
			<!-- <input @focus="isFocus2" @blur="isBlur2" v-model="remindInfo.remindContent" class="remind-msg-son" type="text" value="" placeholder="提醒内容..."/> -->
			<textarea @focus="isFocus2" @blur="isBlur2" auto-height v-model="remindInfo.remindContent" class="remind-msg-son" type="text" placeholder="提醒内容..."/>
			<text @tap.stop="resetInput2" v-if="showDel2" class="my-iconfont del-icon">&#xe627;</text>
		</view>
		
		
		
		<!-- 设置人/群 -->
		<view class="all-list">
			<view class="switch-list remind-list first-remind-list">
				<view class="switch-list-title remind-list-left">
					提醒指定的人或群
				</view>
				<switch @change="changePersonSwitch" style="transform: scale(.9);" class="right-switch remind-list-right" :checked="personChecked" />
			</view>
			
			<view v-if="personChecked" @tap="toChooseFriend" class="remind-list remind-list2" hover-class="tap-hover-color">
				<view class="remind-list-left">
					选择好友或群组
				</view>
				<view class="remind-list-right">
					<text>{{ selectedPerson }}</text>
					<text class="my-iconfont remind-list-right-icon">&#xe683;</text>
				</view>
			</view>
			
		</view>
		
		
		
		<!-- 设置时间 -->
		<view class="time-list all-list">
			<view class="switch-list remind-list first-remind-list">
				<view class="switch-list-title remind-list-left">
					指定时间提醒
				</view>
				<switch style="transform: scale(.9);" class="right-switch remind-list-right" :checked="timeChecked" @change="changeTimeSwitch" />
			</view>
			
			<view v-if="timeChecked">
				<view class="time-val-list remind-list remind-list2" hover-class="tap-hover-color">
					<view class="remind-list-left">
						选择时间
					</view>
					<view @tap="onShowDatePicker" class="remind-list-right">
						{{ selectDateTime }}
					</view>
				</view>
				<view class="freq-list remind-list remind-list2" @click="showFreq" hover-class="tap-hover-color">
					<view class="remind-list-left">
						重复
					</view>
					<view class="remind-list-right">
						<input disabled type="text" :value="timeFreqList[remindInfo.remindType-1]" />
					</view>
				</view>
			</view>
			
		</view>
		
		
		
		
		
		<!-- 设置位置 -->
		<view class="all-list">
			<view class="switch-list remind-list first-remind-list">
				<view class="switch-list-title remind-list-left">
					指定位置提醒
				</view>
				<switch @change="changeLocationSwitch" style="transform: scale(.9);" class="right-switch remind-list-right" :checked="locationChecked" />
			</view>
			
			<view v-if="locationChecked" class="remind-list remind-list2" hover-class="tap-hover-color">
				<view class="remind-list-left">
					选择位置
				</view>
				<view class="remind-list-right">
					<text class="my-iconfont remind-list-right-icon">&#xe683;</text>
				</view>
			</view>
		</view>
		
		<!-- #ifdef MP-WEIXIN -->
		<button type="default" @tap="finishRemind">完成</button>
		<!-- #endif -->
		<!-- 时间选择器 -->
		<mx-date-picker format="yyyy-mm-dd hh:ii" :show="showPicker" type="datetime" :value="selectDateTime" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	
	import { mapState } from 'vuex';
	
	import { saveMindRequest, modifyRemindRequest } from '@/network/remind.js';
	
	import { formatToTimeStamp, formatTimeStamp } from '@/common/index.js'
	
	
	
	export default {
		components: {
			MxDatePicker
		},
		data() {
			//初始化当前时间，仅创建组件时一次
			const currentDate = this.getDate()
			return {
			
				
				
				//是否显示时间选择器
				showPicker: false,
				
				//当前选择年月日时分
				selectDateTime: currentDate,
				
				
				//提醒时间的频率列表
				timeFreqList: ['一次', '每天', '每周', '每月'],
				
				//提醒时间的频率列表的下标
				timeFreqIndex: 0,
				type: '', //当前模式: new为添加提醒; modify修改提醒 edit为编辑草稿
				
				currentIndex: null, //当前提醒列表下标
				
				//提醒请求参数
				remindInfo: {
					remindAccount: '',
					remindTitle: '',
					remindContent: '',
					remindTime: '',
					remindType: 1,
					remindLocation: '',
					remindPerson: ''
				},
				//控制删除按钮的显示
				showDel1: false,
				showDel2: false,
				
				//是否显示指定时间列表
				timeChecked: false,
				
				//控制位置
				locationChecked: false,
				
				//控制人或群
				personChecked: false
				
			}
		},
		computed: {
			...mapState(['userInfo']),
			selectedPerson() { //已选人数
				if(this.remindInfo.remindPerson[0] === this.userInfo.user.userAccount) {
					return '已选自己'
				}else {
					return '已选 ' + this.remindInfo.remindPerson.length
				}
			}
		},
		methods: {
			finishRemind() {
				if(this.type === 'new' || this.type === 'edit') {
					this.addRemind()
				}else if(this.type === 'modify') {
					this.modifyRemind()
				}
			},
			
			//完成添加提醒
			addRemind() {
				let obj = {}
				obj.account = this.userInfo.user.userAccount
				obj.title = this.remindInfo.remindTitle
				obj.content = this.remindInfo.remindContent
				obj.time = this.remindInfo.remindTime
				obj.timeType = this.remindInfo.remindType
				obj.location = this.remindInfo.remindLocation
				
				if(this.remindInfo.remindPerson) {
					console.log('别人')
					obj.person = this.remindInfo.remindPerson
				}else {
					console.log('自己', this.userInfo.user.userAccount)
					let list = []
					list[0] = this.userInfo.user.userAccount
					obj.person = list
				}
				if(this.hasValidRemindReq(obj)) {
					return
				}
				this.hasValidSelectTime(this.remindTimeStamp)
				console.log('准备提交提醒的obj:', obj)
				this.saveMind(obj)
			},
			//新建定时任务
			saveMind(obj) {
				saveMindRequest(obj).then(res => {
					this.$toast.showRes(res)
					if(res.data.code === 2000) {
						uni.showToast({
							title: '成功设置事项提醒',
							icon: 'none',
							mask: true,
							success: res => {
								setTimeout(() => {
									uni.$emit('addRemind', this.remindInfo)
									if(this.type === 'new') {
										console.log('11111111')
										uni.navigateBack()
									}else if(this.type === 'edit') {
										console.log('222222222')
										this.updateDraftRemindList('del')
									}
								}, 500)
							}
						})
					}
				}).catch(err => {
					this.$toast.showErr(err)
				})
			},
			//修改定时任务
			modifyRemind() {
				let obj = {}
				obj.account = this.userInfo.user.userAccount
				obj.id = this.remindInfo.id
				obj.title = this.remindInfo.remindTitle
				obj.content = this.remindInfo.remindContent
				obj.time = this.remindInfo.remindTime
				obj.timeType = this.remindInfo.remindType
				obj.location = this.remindInfo.remindLocation
				obj.person = this.remindInfo.remindPerson
				console.log('obj:', obj)
				if(this.hasValidRemindReq(obj)) {
					return
				}
				modifyRemindRequest(obj).then(res => {
					if(res.data.code === 2000) {
						uni.$emit('modifyRemindList', {
							index: this.currentIndex,
							info: this.remindInfo
						})
						uni.showToast({
							title: '修改成功',
							icon: 'none',
							success: res => {
								uni.navigateBack()
							}
						})
					}
				})
			},
			//显示时间选择器
			onShowDatePicker(){
				
				uni.showLoading({
					mask: true
				})
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPicker = true;
						uni.hideLoading()
					}, 0)
				})
			},
			//完成时间选择
			onSelected(e) {
				this.showPicker = false;
				if(e) {
					console.log(e.date)
					//中国标准时间转时间戳
					let selectTimeStamp = formatToTimeStamp(e.date)
					//时间戳转年-月-日 时:分:秒
					let selectDateTime = formatTimeStamp(selectTimeStamp, 'yyyy-MM-dd hh:mm')
					
					if(this.type === 'new' || this.type === 'edit') {
						if(!this.hasValidSelectTime(selectTimeStamp)) {
							uni.showToast({
								title: '请选择未来的时间段',
								icon: 'none'
							})
							return
						}
					}
					this.$nextTick(() => {
						this.remindInfo.remindTime = selectTimeStamp
						this.selectDateTime = selectDateTime
						// this.remindTimeStamp = selectTimeStamp
						console.log('选择的时间戳为:', selectTimeStamp)
						console.log('选择的时间为:', this.selectDateTime)
					})
				}
			},
			//判断选择的时间是否有效
			hasValidSelectTime(selectTimeStamp) {
				let date = new Date()
				let currentTimeStamp = date.getTime()
				return selectTimeStamp > currentTimeStamp
			},
			
			//不能让必填内容为空
			hasValidRemindReq(obj) {
				let title = ''
				if(!obj.title) {
					title =  '标题不能为空'
				}else if(!obj.content) {
					title =  '内容不能为空'
				}else if(!obj.time || !this.hasValidSelectTime(obj.time)) {
					title = '请选择正确时间'
				}else if(this.personChecked) {
					if(!obj.person) {
						title = '请选择好友或群组'
					}
				}else if(this.locationChecked) {
					if(!obj.location) {
						title =  '请选择正确位置'
					}
				}
				uni.showToast({
					title,
					icon: 'none'
				})
				return title
			},
			//以2020-02-28 15:19:30的格式 获取当前时间
			getDate(type=null) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hours = date.getHours()
				let minutes = date.getMinutes()
				let seconds = date.getSeconds()
				// if (type === 'start') {
				// 	year = year - 60;
				// } else if (type === 'end') {
				// 	year = year + 2;
				// }
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				hours = hours > 9 ? hours : '0' + hours;
				minutes = minutes > 9 ? minutes : '0' + minutes;
				// seconds = seconds > 9 ? seconds : '0' + seconds;
				// return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
				return `${year}-${month}-${day} ${hours}:${minutes}`
				
			},
			
			//指定时间的显示与隐藏
			changeTimeSwitch(e) {
				this.$nextTick(() => {
					this.timeChecked = !this.timeChecked
				})
			},
			//指定位置的显示与隐藏
			changeLocationSwitch() {
				this.$nextTick(() => {
					this.locationChecked = !this.locationChecked
				})
			},
			
			//指定人或群的显示与隐藏
			changePersonSwitch() {
				this.$nextTick(() => {
					this.personChecked = !this.personChecked
				})
			},
			showFreq() {
				uni.showActionSheet({
					itemList: this.timeFreqList,
					success: res => {
						switch (res.tapIndex){
							case 0:
								this.remindInfo.remindType = 1
								break
							case 1:
								this.remindInfo.remindType = 2
								break
							case 2:
								this.remindInfo.remindType = 3
								break
							case 3:
								this.remindInfo.remindType = 4
								break
						}
					},
					fail: err => {
						console.log(err)
					}
				})
			},
			
			//更新草稿
			updateDraftRemindList(type) { //新增或修改或删除草稿
				let list = []
				let key = `draftRemindList_${this.userInfo.user.userAccount}`
				uni.getStorage({
					key,
					complete: res => {
						if(res.data.length) {
							list = Object.assign([], res.data)
						}
						
						if(type === 'new') {
							list.unshift(this.remindInfo)
						}else if(type === 'edit') {
							list.splice(this.currentIndex, 1, this.remindInfo)
						}else {
							list.splice(this.currentIndex, 1)
						}
						uni.setStorage({
							key,
							data: list,
							success: res => {
								uni.$emit('updateDraftRemindList', '')
								uni.navigateBack()
							}
						})
					}
				})
			},
			
			toChooseFriend() {
				console.log(this.remindInfo.remindPerson.length)
				if(this.remindInfo.remindPerson) {
					uni.setStorageSync('setRemindList', this.remindInfo.remindPerson)
				}
				uni.navigateTo({
					url: '/components/content/chooseFriend/ChooseFriend?type=setRemind'
				})
			},
			
			//聚焦input
			isFocus1() {
				this.showDel1 = true
			},
			isFocus2() {
				this.showDel2 = true
			},
			
			//失焦
			isBlur1() {
				setTimeout(() => {
					this.showDel1 = false
				}, 80)
			},
			isBlur2() {
				setTimeout(() => {
					this.showDel2 = false
				}, 80)
			},
			
			//清除input内容
			resetInput1() {
				this.$nextTick(() => {
					this.remindInfo.remindTitle = ''
				})
			},
			resetInput2() {
				this.$nextTick(() => {
					this.remindInfo.remindContent = ''
				})
			}
		},
		onLoad(option) {
			console.log('option:', option)
			let title = '添加提醒' //导航栏标题
			if(option.type === 'new') { //添加提醒
				this.type = 'new'
			}else { //修改提醒、修改草稿
				const key = `${option.type}Remind`
				let info = uni.getStorageSync(key)
				let tempInfo = Object.assign({}, info)
				this.selectDateTime = formatTimeStamp(tempInfo.remindTime, 'yyyy-MM-dd hh:mm')
				this.remindInfo = tempInfo
				this.type = option.type
				this.currentIndex = option.index
				title = option.type === 'edit' ? '编辑草稿' : '修改事项提醒'
				if(this.remindInfo.remindTime) {
					console.log('开启时间')
					this.timeChecked = true
				}
				if(this.remindInfo.remindLocation) {
					console.log('开启位置')
					this.locationChecked = true
				}
				if(this.remindInfo.remindPerson && this.remindInfo.remindPerson[0] != this.userInfo.user.userAccount) {
					console.log('开启人提醒')
					this.personChecked = true
				}
				console.log('this.remindInfo:', this.remindInfo)
				uni.removeStorageSync(key)
			}
			uni.setNavigationBarTitle({
				title
			})
			
		},
		//返回触发modal
		onBackPress(e) {
			
			if(e.from === 'navigateBack') {
				//返回
				return false
			}
			if(e.from === 'backbutton') {
				if(this.type === 'edit' || this.type === 'new') {
					if(!this.remindInfo.remindTitle && !this.remindInfo.remindContent) {
						uni.navigateBack()
					}else {
						uni.showModal({
							title: '提示',
							content: '是否保存为草稿？',
							success: res => {
								if(res.confirm) {
									this.updateDraftRemindList(this.type)
								}else if(res.cancel){
									uni.navigateBack()
								}
							},
							fail(err) {
								console.log(err)
								return true
							}
						})
					}
				}else {
					uni.showModal({
						title: '提示',
						content: '修改未保存,是否退出？',
						success: res => {
							if(res.confirm) {
								uni.navigateBack()
							}else if(res.cancel){
							}
						},
						fail(err) {
							console.log(err)
							return true
						}
					})
				}
			}
			return true
		},
		onNavigationBarButtonTap(options) {
			if(options.index === 0) {
				this.finishRemind()
			}
		},
		onShow() {
			console.log('show')
			uni.$once("setRemindList", (list) => {
				console.log('选择的好友列表为:', list)
				this.remindInfo.remindPerson = list
			})
		}
	}
</script>

<style lang="scss">
	
	.remind {
		color: #666666;
		height: 100vh;
		background-color: #F8F8F8;
		font-size: $uni-font-size-lg;
		.remind-head, .remind-msg {
			position: relative;
			color: $uni-text-color;
			background-color: #FFFFFF;
			.remind-head-son, .remind-msg-son {
				padding: 20rpx 30rpx;
				
				max-height: 150rpx;
			}
			
			
		}
		.remind-msg {
			
			margin-top: 60rpx;
		}
		.all-list {
			margin: 60rpx 0;
			//全部list
			.remind-list {
				display: flex;
				align-items: center;
				padding: 15rpx 30rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				.remind-list-left {
					width: auto;
				}
				.remind-list-right {
					text-align: right;
					flex: 1;
					.remind-list-right-icon {
						color: $uni-text-color-grey;
					}
				}
			}
			
			.remind-list2 {
				padding: 25rpx 30rpx !important;
			}
			
			.first-remind-list {
				padding: 15rpx 0 15rpx 30rpx;
			}
			
			//下边框
			.switch-list, .time-val-list {
				border-bottom: 1rpx solid rgba(144, 144, 144, .1);
			}
		}
	}
</style>
