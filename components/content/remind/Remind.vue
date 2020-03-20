<template>
	<view class="remind">
		<view class="remind-head">
			<input @focus="isFocus1" focus @blur="isBlur1" v-model="remindInfo.title" class="remind-head-son" type="text" placeholder="提醒标题..." />
			<text @tap.stop="resetInput1" v-if="showDel1" class="my-iconfont del-icon">&#xe627;</text>
		</view>
		<view class="remind-msg">
			<input @focus="isFocus2" @blur="isBlur2" v-model="remindInfo.content" class="remind-msg-son" type="text" value="" placeholder="提醒内容..."/>
			<text @tap.stop="resetInput2" v-if="showDel2" class="my-iconfont del-icon">&#xe627;</text>
		</view>
		
		<!-- 设置时间 -->
		<view class="time-list all-list">
			<view class="switch-list remind-list first-remind-list">
				<view class="switch-list-title remind-list-left">
					在指定时间提醒我
				</view>
				<switch style="transform: scale(.9);" class="right-switch remind-list-right" :checked="timeChecked" @change="changeTimeSwitch" />
			</view>
			
			<view v-if="timeChecked">
				<view class="time-val-list remind-list remind-list2" hover-class="tap-hover-color">
					<view class="remind-list-left">
						指定时间
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
						<input disabled type="text" :value="timeFreqList[timeFreqIndex]" />
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- 设置位置 -->
		<view class="all-list">
			<view class="switch-list remind-list first-remind-list">
				<view class="switch-list-title remind-list-left">
					在指定位置提醒我
				</view>
				<switch @change="changeLocationSwitch" style="transform: scale(.9);" class="right-switch remind-list-right" :checked="locationChecked" />
			</view>
			
			<view v-if="locationChecked" class="remind-list remind-list2" hover-class="tap-hover-color">
				<view class="remind-list-left">
					位置
				</view>
				<view class="remind-list-right">
					<text class="my-iconfont remind-list-right-icon">&#xe683;</text>
				</view>
			</view>
			
		</view>
		
		<!-- 设置人/群 -->
		<view class="all-list">
			<view class="switch-list remind-list first-remind-list">
				<view class="switch-list-title remind-list-left">
					在指定人或群提醒我
				</view>
				<switch @change="changePersonSwitch" style="transform: scale(.9);" class="right-switch remind-list-right" :checked="personChecked" />
			</view>
			
			<view v-if="personChecked" class="remind-list remind-list2" hover-class="tap-hover-color">
				<view class="remind-list-left">
					人或群
				</view>
				<view class="remind-list-right">
					<text class="my-iconfont remind-list-right-icon">&#xe683;</text>
				</view>
			</view>
			
		</view>
		
		<!-- 时间选择器 -->
		<mx-date-picker :format="selectDateTime" :showSeconds="true" :show="showPicker" type="datetime" :value="selectDateTime" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	
	import { mapState } from 'vuex';
	
	import { saveMindRequest } from '@/network/remind.js';
	
	import { formatToTimeStamp, formatTimeStamp } from '@/common/index.js'
	
	export default {
		components: {
			MxDatePicker
		},
		data() {
			//初始化当前时间，仅创建组件时一次
			const currentDate = this.getDate()
			return {
			
				//是否显示指定时间列表
				timeChecked: false,
				
				//是否显示时间选择器
				showPicker: false,
				
				//当前选择年月日时分
				selectDateTime: currentDate,
				
				
				//提醒时间的频率列表
				timeFreqList: ['永不', '一次', '每天'],
				
				//提醒时间的频率列表的下标
				timeFreqIndex: 0,
				
				//提醒请求参数
				remindInfo: {
					title: '',
					content: '',
					time: Number,
					time_type: 2,
					location: '',
					person: ''
				},
				
				//控制删除按钮的显示
				showDel1: false,
				showDel2: false,
				
				
				//控制位置
				locationChecked: false,
				
				//控制人或群
				personChecked: false
				
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			//显示时间选择器
			onShowDatePicker(){
				uni.showLoading({
					mask: true
				})
				this.$nextTick(() => {
					this.showPicker = true;
				})
				uni.hideLoading()
			},
			//完成时间选择
			onSelected(e) {
				this.showPicker = false;
				if(e) {
					let date = new Date()
					let currentTimeStamp = date.getTime()
					//中国标准时间转时间戳
					let selectTimeStamp = formatToTimeStamp(e.date)
					//时间戳转年-月-日 时:分:秒
					let selectDateTime = formatTimeStamp(selectTimeStamp, 'yyyy-MM-dd hh:mm:ss')

					if(currentTimeStamp < selectTimeStamp) {
						this.$nextTick(() => {
							this.selectDateTime = selectDateTime
							console.log('选择的时间戳为:', selectTimeStamp)
							console.log('选择的时间为:', this.selectDateTime)
						})
					}else {
						uni.showToast({
							title: '请选择未来的时间段',
							icon: 'none'
						})
					}
				}
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
				seconds = seconds > 9 ? seconds : '0' + seconds;
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
				
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
								this.timeFreqIndex = 0;
								break;
							case 1:
								this.timeFreqIndex = 1;
								break;
							case 2:
								this.timeFreqIndex = 2;
								break;
						}
					},
					fail: err => {
						console.log(err)
					}
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
					this.remindInfo.title = ''
				})
			},
			resetInput2() {
				this.$nextTick(() => {
					this.remindInfo.content = ''
				})
			}
		},
		//返回触发modal
		onBackPress(e) {
			if(e.from === 'navigateBack') {
				//返回
				return false
			}
			if(e.from === 'backbutton') {
				uni.showModal({
					title: '提示',
					content: '您确定退出编辑？',
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
			}
			return true
		},
		onNavigationBarButtonTap(options) {
			if(options.index === 0) {
			}
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
