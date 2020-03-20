<template>
	<view class="contactscon">
		
		
		
		<scroll-view class="scrollList" scroll-y :scroll-into-view="currentLetter">
			<view class="contactstop" id="top">
				<view class="contacts-list">
					<view class="contacts-list-img">
						<view class="image-friend">&#xe702;</view>
					</view>
					<view @click="toConsentFriend" class="contacts-list-title">
						新的朋友
					</view>
				</view>
				<view class="contacts-list">
					<view class="contacts-list-img">
						<view class="image-friend">&#xe690;</view>
					</view>
					<view class="contacts-list-title bordernone">
						新的群聊
					</view>
				</view>
			</view>
			
			<view v-for="(item1, index1) in friendList" :key="index1" class="myList" :id="item1.letters">
				<block v-if="item1.list.length > 0">
					<view class="letter-item">
						{{ item1.letters }}
					</view>
					<view @tap="toFriendInfo(item2.friendAccount, index1, index2)" v-for="(item2, index2) in item1.list" :key="index2" class="contacts-list">
						<view class="contacts-list-img">
							<image v-if="item2.friendFaceImage.length > 10" :src=" imgUrl + item2.friendFaceImage" mode="aspectFill"></image>
							<image v-else src="/static/image/global/boyHeadImg.png" mode="aspectFill"></image>
						</view>
						<view v-if="item2.friendRemarkName" class="contacts-list-title" :class="{'bordernone': item1.list.length === (index2+1)}">
							{{ item2.friendRemarkName }}
						</view>
					</view>
				</block>
			</view>
			
		</scroll-view>
		
		<!-- 右边索引列表 -->
		<view @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @touchcancel="touchCancel" class="contactsindex">
			<view class="letters-index-item">
				<text class="my-iconfont">&#xe80e;</text>
			</view>
			<view class="letters-index-item" v-for="(item, index) in lettersList" :key="index">
				{{ item }}
			</view>
		</view>
		
		<!-- 触摸索引显示的索引字母 -->
		<view v-if="indexAlert" class="mid-letter">
			{{ currentLetter }}
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { imgBaseUrl } from '@/common/helper.js'
	
	export default {
		data() {
			return {
				//索引列表
				lettersList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'],
				//单个索引高度
				oneIndexHeight: 0,
				indexAlert: false,
				//当前触摸的字母
				currentLetter: '',
				imgUrl: '',
			}
		},
		computed: {
			...mapState(['friendList'])
		},
		methods: {
			
			
			//触摸索引
			touchStart(e) {
				//计算触摸了哪个字母pageY-索引列表距离顶部距离再除以/单个索引高度
				let pageY = e.touches[0].pageY
				//这个index算上回到顶部按钮,Math.floor取整
				let index = Math.floor((pageY-15)/this.oneIndexHeight)
				if(index === 0) {
					this.indexAlert = false
					this.currentLetter = 'top'
				}else {
					const item = this.friendList[index-1].list
					if(item.length>0) {
						this.indexAlert = true
						this.currentLetter = this.lettersList[index-1]
					}else {
						this.indexAlert = false
					}
				}
			},
			
			//移动触摸索引
			touchMove(e) {
				//计算触摸了哪个字母pageY-索引列表距离顶部距离再除以/单个索引高度
				let pageY = e.touches[0].pageY
				//这个index算上回到顶部按钮,Math.floor取整
				let index = Math.floor((pageY-15)/this.oneIndexHeight)
				if(index === 0) {
					this.indexAlert = false
					this.currentLetter = 'top'
				}else {
					const item = this.friendList[index-1].list
					if(item.length>0) {
						this.indexAlert = true
						this.currentLetter = this.lettersList[index-1]
					}else {
						this.indexAlert = false
					}
				}
			},
			
			//结束触摸索引
			touchEnd() {
				console.log('结束触摸索引')
				this.$nextTick(() => {
					this.indexAlert = false
					//清除当前滚动的定位
					this.currentLetter = ''
				})
			},
			
			//触摸索引被打断
			touchCancel() {
				console.log('触摸索引被打断')
				this.$nextTick(() => {
					this.indexAlert = false
					//清除当前滚动的定位
					this.currentLetter = ''
				})
			},
			
			
			
			toFriendInfo(friendAccount) {
				uni.navigateTo({
					url: `/components/content/friend/FriendInfo?friendAccount=${friendAccount}`
				})
			},
			toConsentFriend() {
				uni.navigateTo({
					url: '/components/content/consentfriend/ConsentFriend'
				})
			},
			
			
		},
		created() {
			
			console.log(this.friendList)
			this.imgUrl = imgBaseUrl
			
		},
		
		mounted() {
			const query = uni.createSelectorQuery().in(this)
			query.select('.contactsindex').boundingClientRect(data => {
				const oneHeight = data.height/28
				this.oneIndexHeight = oneHeight
			}).exec()
		}
	}
</script>

<style lang="scss" scoped>
	.contactscon {
		font-size: $uni-font-size-lg;
		.scrollList {
			height: 100vh;
			overflow: hidden;
			
		}
	}
	
	.contacts-list {
		display: flex;
		padding-left: 20rpx;
		background-color: #FFFFFF;
		.contacts-list-img {
			width: auto;
			
			display: flex;
			align-items: center;
			.image-friend {
				font-family: 'iconfont';
				font-size: 60rpx;
			}
			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 8rpx;
			}
		}
		.contacts-list-title {
			flex: 1;
			font-size: 32rpx;
			margin-left: 30rpx;
			padding: 30rpx 0;
			border-bottom: 1rpx solid rgba(100, 100, 100, .1);
		}
		.bordernone {
			border: none;
		}
	}
	.contacts-list:active {
		background-color: #eee;
	}
	
	
	
	.letter-item {
		background-color: #F7F7F7;
		padding: 10rpx 30rpx;
	}
	
	
	
	.contactsindex {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
	}
	
	// 右侧索引列表
	.contactsindex {
		position: fixed;
		right: 5rpx;
		top: 30rpx;
		width: 50rpx;
		font-size: 26rpx;
		color: #666;
		z-index: 199;
		.letters-index-item {
			text-align: center;
			border-radius: 12rpx;
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
