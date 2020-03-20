<template>
	<view class="choose-friend">
		<scroll-view class="scrollList" :scroll-into-view="currentLetter" scroll-y :style="scrollStyle">
			<view v-for="(item1, index1) in list" :key="index1" id="top">
				<view v-if="item1.list.length>0" class="choose-list" :id="item1.letters">
					<view class="choose-letter">
						{{ item1.letters }}
					</view>
					<view class="choose-item" @tap="chooseItem(item2)" v-for="(item2, index2) in item1.list" :key="index2">
						<view class="choose-item-icon">
							<view v-if="item2.checked" class="my-iconfont">&#xe612;</view>
						</view>
						<view class="choose-item-img">
							<image :src="imgUrl + item2.friendFaceImage" mode="aspectFill"></image>
						</view>
						<view class="choose-item-name">
							{{ item2.friendRemarkName }}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 底部已选择列表、搜索框 -->
		<scroll-view class="scroll-select-list" scroll-x>
			<view class="select-list">
				<block v-for="(item1, index1) in list" :key='index1'>
					<block v-if="item1.list.length>0">
						<block v-for="(item2, index2) in item1.list" :key="index2">
							<view @tap="delSelectItem(index1, index2)" v-if="item2.checked" class="select-item" :id="'select-item'+index1">
								<image :src="imgUrl + item2.friendFaceImage" mode="aspectFill"></image>
							</view>
						</block>
					</block>
				</block>
				<!-- <view class="select-item" id="last-input">
					<input @input="handleInput" type="text" value="" placeholder="搜索好友" />
				</view> -->
			</view>
		</scroll-view>
		
		<view class="letters-index-list">
			<view @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="touchMove" @touchend.stop.prevent="touchEnd" @touchcancel.stop.prevent="touchCancel" class="letters-index-item">
				<text class="my-iconfont">&#xe80e;</text>
			</view>
			<view @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="touchMove" @touchend.stop.prevent="touchEnd" @touchcancel.stop.prevent="touchCancel" class="letters-index-item" v-for="(item, index) in lettersList" :key="index">
				{{ item }}
			</view>
		</view>
		<view v-if="indexAlert" class="mid-letter">
			{{ currentLetter }}
		</view>
	</view>
</template>

<script>
	import { imgBaseUrl } from '@/common/helper.js'
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				//图片前缀地址
				imgUrl: '',
				//存储选择朋友列表
				list: [],
				lettersList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'],
				//是否触摸显示字母
				indexAlert: false,
				//当前触摸字母
				currentLetter: '',
				// 索引单个字母高度
				oneLetterHeight: 0,
				scrollStyle: '',
				//横向滚动left
				selectScrollLeft: 0,
				//已选择好友个数
				selectedItem: 0
			}
		},
		computed: {
			...mapState(['friendList'])
			
		},
		methods: {
			//开始触摸
			touchStart(e) {
				//计算触摸了哪个字母pageY-索引列表距离顶部距离再除以/单个索引高度
				let pageY = e.touches[0].pageY
				//这个index算上回到顶部按钮,Math.floor取整
				let index = Math.floor((pageY-15)/this.oneLetterHeight)
				if(index === 0) {
					this.indexAlert = false
					this.currentLetter = 'top'
				}else {
					const item = this.list[index-1].list
					if(item.length>0) {
						this.indexAlert = true
						this.currentLetter = this.lettersList[index-1]
					}else {
						this.indexAlert = false
					}
				}
				
				
				
			},
			
			//触摸移动
			touchMove(e) {
				//计算触摸了哪个字母pageY-索引列表距离顶部距离再除以/单个索引高度
				let pageY = e.touches[0].pageY
				//这个index算上回到顶部按钮,Math.floor取整
				let index = Math.floor((pageY-15)/this.oneLetterHeight)
				if(index === 0) {
					this.indexAlert = false
					this.currentLetter = 'top'
				}else {
					const item = this.list[index-1].list
					if(item.length>0) {
						this.indexAlert = true
						this.currentLetter = this.lettersList[index-1]
					}else {
						this.indexAlert = false
					}
				}
			},
			
			//触摸结束
			touchEnd() {
				console.log('touchEnd')
				this.$nextTick(() => {
					this.indexAlert = false
					//清除当前滚动的定位
					this.currentLetter = ''
				})
			},
			
			//触摸被打断
			touchCancel() {
				console.log('touchCancel')
				this.$nextTick(() => {
					this.indexAlert = false
					//清除当前滚动的定位
					this.currentLetter = ''
				})
			},
			
			//选择该好友
			chooseItem(item) {
				console.log(item)
				this.$nextTick(() => {
					item.checked = !item.checked
					if(item.checked) {
						this.selectScrollLeft += 50
						this.selectedItem += 1
					}else {
						this.selectedItem -= 1
					}
					
					//获取当前窗口，修改导航栏button样式
					let webView = this.$mp.page.$getAppWebview();
					webView.setTitleNViewButtonStyle(0, {
						"text": `确定(${this.selectedItem}) `
					})
					
					this.$forceUpdate()
				})
			},
			
			//删除底部已选好友
			delSelectItem(index1, index2) {
				this.$nextTick(() => {
					this.list[index1].list[index2].checked = false
					this.selectedItem -= 1
					this.$forceUpdate()
				})
			}
		},
		
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				uni.showToast({
					title: '添加成功',
					icon: 'none',
					success: res => {
						uni.navigateBack()
					}
				})
			}
		},
		created() {
			this.imgUrl = imgBaseUrl
			//设置scroll-view的样式，高度
			const windowHeight = uni.getSystemInfoSync().windowHeight
			this.scrollStyle = `height: ${windowHeight-60}px`
			
			
			
			
			const reg = /145/
			const str = 'das12145dsdsa' 
			console.log('练习正则：', reg.test(str))
			
			
			
			
			
			
		},
		onLoad() {
			console.time('time1')
			this.list = JSON.parse(JSON.stringify(this.friendList))
			
			this.list.forEach(item => {
				item.list.forEach(list => {
					list.checked = false
				})
			})
			console.log(this.list)
			console.timeEnd('time1')
			
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this)
			query.select('.letters-index-list').boundingClientRect(data => {
				this.oneLetterHeight = data.height/28
			}).exec()
		}
	}
</script>

<style scoped lang="scss">
	
	//弹性盒子
	.letters-index-list {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
	}
	
	.choose-item, .select-list {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}
	
	
	.choose-friend {
		flex-flow: column nowrap;
		min-height: 100vh;
		height: 100%;
		background-color: #F7F7F7;
		.scrollList {
			.choose-list {
				.choose-letter {
					margin: 10rpx 25rpx;
					font-size: $uni-font-size-base;
				}
				.choose-item {
					position: relative;
					padding: 10rpx 30rpx;
					margin-bottom: 1rpx;
					box-sizing: border-box;
					background-color: #fff;
					.choose-item-icon {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 40rpx;
						height: 40rpx;
						margin-right: 30rpx;
						border-radius: 100%;
						border: 1rpx solid rgba(70, 70, 70, .1);
						
						
						.my-iconfont {
							width: 100%;
							height: 100%;
							border-radius: 100%;
							font-size: 40rpx;
							
							color: #fff;
							background-color: #50B674;
							// background-color: $uni-text-color-disable;
						}
					}
					.choose-item-img {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-right: 30rpx;
						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 8rpx;
						}
					}
					.choose-item-name {
						font-size: $uni-font-size-lg;
					}
					&:active {
						background-color: #F6F6F6;
					}
					
					// &::after {
					// 	content: '';
					// 	position: absolute;
					// 	left: 210rpx;
					// 	bottom: -1rpx;
					// 	width: 100%;
					// 	height: 1rpx;
					// 	background-color: rgba(100, 100, 100, .1);
					// }
					
				}
			}
		}
		
		
	}
	
	
	//底部展示已选择
	.scroll-select-list {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 120rpx;
		width: 100%;
		background-color: #fff;
		box-shadow: 0 -2rpx 2rpx rgba(100, 100, 100, .2);
		.select-list {
			height: 100%;
			z-index: 10;
			padding: 20rpx;
			box-sizing: border-box;
			
			.select-item {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 10rpx;
				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 8rpx;
				}
				
				input {
					min-width: 300rpx;
					font-size: $uni-font-size-lg;
				}
				
				
			}
		}
		
		
	}
	
	
	// 右侧索引列表
	.letters-index-list {
		position: fixed;
		right: 5rpx;
		top: 30rpx;
		width: 50rpx;
		height: 85%;
		font-size: 26rpx;
		color: #666;
		z-index: 199;
		.letters-index-item {
			text-align: center;
			border-radius: 12rpx;
			&:active {
				background-color: red;
			}
		}
	}
	
	
	// 居中显示触摸的字母
	.mid-letter {
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -80rpx;
		margin-left: -80rpx;
		width: 160rpx;
		height: 160rpx;
		color: #fff;
		font-size: 70rpx;
		text-align: center;
		line-height: 160rpx;
		border-radius: 12rpx;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}
</style>
