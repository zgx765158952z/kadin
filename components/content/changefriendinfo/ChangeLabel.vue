<template>
	<view class="change-label set-bgc">
		<view class="label-content">
			<view class="label-content-top">
				<block v-if="friendLabelList.length > 0">
					<view @tap="changeCurrentIndex(index)" v-for="(item, index) in friendLabelList" :key="index" :class="{'label-content-top-item-hover': currentIndex === index}" class="label-content-top-item">
						<text class="add-label">{{ item }}<text v-if="currentIndex === index" class="my-iconfont add-label-icon">&#xe61a;</text></text>
					</view>
				</block>
				<view class="label-content-top-input">
					<input @blur="addLabelValue" v-model="labelValue" type="text" placeholder="添加标签" />
				</view>
			</view>
			
			<view class="label-content-btm">
				<view class="label-content-btm-first">
					所有标签
				</view>
				<view class="all-label">
					<view @tap="handleAddLabel(index)" v-for="(item, index) in allLabelList" :key="index" class="all-label-item" :class="{'all-label-item-active': isLabel(index)}" hover-class="tap-hover-color">
						{{ item }}
					</view>
				</view>
			</view>
		</view>
		<button @tap="handleFinish" type="primary">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				friendLabelList: [],
				allLabelList: [],
				//添加标签输入框
				labelValue: '',
				//当前编辑标签下标
				currentIndex: -1,
				//已选择的标签 对应 所有标签的下标index
				selectIndex: []
			}
		},
		methods: {
			//查找当前标签是否已存在
			isLabel(index) {
				if(this.selectIndex.findIndex(value => index === value) !== -1) {
					return true
				}
			},
			//保存标签
			handleFinish() {
				uni.$emit('saveFriendInfoLabel', {
					friendLabelList: this.friendLabelList
				})
				uni.navigateBack()
			},
			//添加标签
			addLabelValue() {
				if(this.labelValue !== "") {
					//去掉头尾空格
					const reg = /(^\s+)|(\s+$)/g
					this.labelValue.replace(reg)
					//查找想添加的标签是否已存在friendLabelList
					if(this.friendLabelList.find(value => value === this.labelValue) === undefined) {
						
						//查找是否已存在allLabelList
						if(this.allLabelList.findIndex(value => value === this.labelValue) !== -1) {
							const ind = this.allLabelList.findIndex(value => value === this.labelValue)
							this.selectIndex.push(ind)
						}
						this.friendLabelList.push(this.labelValue)
					}
					this.labelValue = ""
					
				}
			},
			//删除标签
			changeCurrentIndex(index) {
				
				if(this.currentIndex === index) {
					const label = this.friendLabelList[index]
					const ind1 = this.allLabelList.findIndex(value => value === label)
					const ind2 = this.selectIndex.findIndex(value => value === ind1)
					
					console.log('删除该标签:', this.friendLabelList[index])
					this.currentIndex = -1
					this.selectIndex.splice(ind2, 1)
					this.friendLabelList.splice(index, 1)
					
				}else {
					this.currentIndex = index
				}
			},
			//加标签到friendLabelList
			handleAddLabel(index) {
				const label = this.allLabelList[index]
				
				//先判断friendLabelList里有无该标签,有则返回第一个元素的索引位置
				// 没有则返回undefined
				//allLabelList里无数据才添加
				if(this.friendLabelList.length > 0) {
					if(this.friendLabelList.findIndex(value => value === label) === -1) {
						this.friendLabelList.push(label)
						this.selectIndex.push(index)
					}else {
						//当有数据时删除
						const hasIndex = this.friendLabelList.findIndex(value => value === label)
						const ind =  this.selectIndex.findIndex(value => value === index)
						this.friendLabelList.splice(hasIndex, 1)
						this.selectIndex.splice(ind, 1)
					}
					
				}else {
					this.friendLabelList.push(label)
					this.selectIndex.push(index)
				}
				
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
					content: '是否保存此次编辑',
					success: res => {
						
						if(res.confirm) {
							this.handleFinish()
						}else if(res.cancel) {
							uni.navigateBack()
						}
					}
					
				})
			}
			return true
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				//保存此次编辑的标签
				this.handleFinish()
			}
		},
		onLoad() {
			
			const friendLabelList = uni.getStorageSync('friendLabelList')
			const allLabelList = uni.getStorageSync('allLabelList')
			uni.removeStorageSync('friendLabelList')
			uni.removeStorageSync('allLabelList')
			
			if(allLabelList.length > 0) {
				this.allLabelList = allLabelList
				if(friendLabelList.length > 0) {
					this.friendLabelList = friendLabelList
					//查找已有标签在所有标签的下标位置index,所有标签和已有标签样式联动
					for(let value of this.friendLabelList) {
						const ind = this.allLabelList.findIndex(index => index === value)
						this.selectIndex.push(ind)
					}
				}
			}
		}
		
	}
</script>

<style lang="scss">
	.change-label {
		height: 100vh;
		font-size: $uni-font-size-base;
		.label-content {
			border-top: 1rpx solid rgba(100, 100, 100, .1);
			padding: 30rpx;
			box-sizing: border-box;
			.label-content-top {
				position: relative;
				
				padding: 20rpx 0;
				box-sizing: border-box;
				.label-content-top-item {
					display: flex;
					align-items: center;
					margin: 10rpx;
					padding: 6rpx 18rpx;
					color: #07C160;
					box-shadow: 0 0 5rpx #07C160;
					border-radius: 30rpx;
					text-align: center;
					background-color: #FFFFFF;
					.add-label {
						.add-label-icon {
							font-size: 20rpx;
						}
					}
				}
				
				
				.label-content-top-input {
					margin: 20rpx 0;
					padding: 10rpx 30rpx;
					box-sizing: border-box;
					font-size: $uni-font-size-lg;
					background-color: #FFFFFF;
					border-radius: 30rpx;
					text-align: center;
					width: 50%;
				}
				
				&::after {
					content: '';
					position: absolute;
					bottom: -1rpx;
					left: 0;
					width: 100%;
					height: 1rpx;
					border-bottom: 1rpx solid rgba(70, 70, 70, .1);
				}
				
				
				
			}
			
			.label-content-btm {
				margin-top: 30rpx;
				.label-content-btm-first {
					margin: 20rpx;
					color: $uni-text-color-disable;
				}
				.all-label {
					.all-label-item {
						display: flex;
						align-items: center;
						margin: 10rpx;
						padding: 6rpx 18rpx;
						color: $uni-text-color;
						box-shadow: 0 0 5rpx #666666;
						border-radius: 30rpx;
						text-align: center;
						background-color: #FFFFFF;
					}
					.all-label-item-active {
						color: #07C160 !important;
						box-shadow: 0 0 5rpx #07C160 !important;
					}
				}
			}
		}
	}
	
	
	//弹性盒子
	
	.label-content-top, .all-label {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}
	
	//点击添加标签时显示的删除样式
	.label-content-top-item-hover {
		color: #FFFFFF !important;
		background-color: #05AE55 !important;
	}
</style>
