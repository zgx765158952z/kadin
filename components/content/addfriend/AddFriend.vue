<template>
	<view class="addfriend">
		
		<!-- 设置圆角搜索框 -->
		<uni-search-bar @input="changeSearchFriendInput" @confirm="SearchFriendInput" @cancel="cancelSearchFriend" :radius="100" />
		
		<view class="addfri-number">
			我的卡丁号: {{ userInfo.user.userAccount }}
		</view>
		
		
		
		<view class="addfriend-first-item">
			<view v-if="isShowBtmList">
				<head-img-item>
					<text class="addfriend-left-img my-iconfont" slot="start-img">&#xe640;</text>
					<text slot="title">雷达加朋友</text>
					<text slot="msg">添加身边朋友</text>
					<text class="addfriend-right-img" slot="right">&#xe683;</text>
				</head-img-item>
				
				
				<head-img-item>
					<text class="addfriend-left-img my-iconfont" slot="start-img">&#xe60a;</text>
					<text slot="title">建群</text>
					<text slot="msg">与朋友加入同一群聊</text>
					<text class="addfriend-right-img" slot="right">&#xe683;</text>
				</head-img-item>
				
				<head-img-item>
					<text class="addfriend-left-img my-iconfont" slot="start-img">&#xe69a;</text>
					<text slot="title">扫一扫</text>
					<text slot="msg">扫描二维码</text>
					<text class="addfriend-right-img" slot="right">&#xe683;</text>
				</head-img-item>
				
				
				<head-img-item :noBorderBtm="true">
					<text class="addfriend-left-img my-iconfont" slot="start-img">&#xe702;</text>
					<text slot="title">手机联系人</text>
					<text slot="msg">添加或邀请通讯录中的朋友</text>
					<text class="addfriend-right-img" slot="right">&#xe683;</text>
				</head-img-item>
			</view>
			
			
			
			<view v-if="!isShowBtmList">
				<head-img-item :noBorderBtm="true" class="addfriend-userinfo" @click.native="toFriendInfo">
					<image v-if="addfriendInfo.image.length > 0" slot="start-img" class="addfriend-left-img my-iconfont" :src="imgUrl+addfriendInfo.image" mode="aspectFill"></image>
					
					<text v-else class="addfriend-left-img my-iconfont" slot="start-img">&#xe668;</text>
					
					<text v-if="addfriendInfo.nickname" slot="title">{{ addfriendInfo.nickname }}</text>
					
					
					<text v-if="addfriendInfo.signature" slot="msg">{{ addfriendInfo.signature }}</text>
					
					<text class="addfriend-right-img" slot="right">&#xe683;</text>
				</head-img-item>
			</view>
			
		</view>
		
		
		
		
		
		
		
		
		
		
	</view>
</template>

<script>
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import HeadImgItem from "@/components/content/defimglist/HeadImgItem.vue"
	
	
	import { searchFriendRequest } from '@/network/addfriend.js'
	import { isPoneAvailable } from '@/common/index.js'
	import { mapState } from 'vuex'
	import { imgBaseUrl } from '@/common/helper.js'
	
	export default {
		components: {
			HeadImgItem,
			uniSearchBar,
			uniList,
			uniListItem
		},
		data() {
			return {
				isShowBtmList: true,
				addfriendInfo: null,
				friendPhone: null,
				userAccount: '',
				imgUrl: ''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			//搜索好友
			SearchFriendInput(e) {
				const friendPhone = e.value;
				this.friendPhone = friendPhone;
				console.log(friendPhone);
				if(friendPhone.length > 0) {
					if(isPoneAvailable(friendPhone)) {
						searchFriendRequest(
						`?myPhone=${this.userInfo.user.userPhone}&friendPhone=${friendPhone}`
						).then(res => {
							if(res.status === 200) {
								const code = res.data.code;
								if(code === 4004) {
									uni.showToast({ title: '找不到网络', icon: 'none' })
								}else if(code === 4003) {
									uni.showToast({ title: '已经是你的好友', icon: 'none' })
								}else if(code === 2000) {
									this.isShowBtmList = false;
									this.addfriendInfo = res.data.data;
									console.log(this.addfriendInfo)
								}else {
									uni.showToast({
										title: '搜索好友失败',
										icon: 'none'
									})
								}
							} else {
								uni.showToast({
									title: '网络连接错误',
									icon: 'none'
								})
							}
						}).catch(err => {
							uni.showToast({
								title: '与服务器断开连接',
								icon: 'none'
							})
						})
					}else {
						uni.showToast({
							title: '该卡丁号不存在',
							icon: 'none'
						})
					}
					
				}
			},
			
			//取消搜索
			cancelSearchFriend() {
				this.isShowBtmList = true;
			},
			
			//搜索框无内容不显示搜索结果
			changeSearchFriendInput(e) {
				if(e.value.length === 0) {
					this.isShowBtmList = true;
				}
			},
			//跳转到用户详细信息页
			toFriendInfo() {
				uni.navigateTo({
					url: "/components/content/addfriend/AddfriendInfo?addfriendInfo="+ encodeURIComponent(JSON.stringify(this.addfriendInfo)) + '&friendPhone=' + this.friendPhone
				})
			}
			
				
		},
		created() {
			const userInfo = uni.getStorageSync('userInfo')
			this.imgUrl = imgBaseUrl
		},
	}
</script>

<style lang="scss">
	.addfriend {
		height: 100vh;
		background-color: #F0F0F0;
		uni-search-bar {
			.uni-searchbar.data-v-622c0ccb {
				justify-content: center;
				
				margin: 0 auto;
				padding: 20rpx 0;
				align-items: center;
				width: 96%;
				.uni-searchbar__box.data-v-622c0ccb {
					background-color: #FFFFFF;
					height: 68rpx;
				}
			}
			.uni-searchbar__cancel.data-v-622c0ccb {
				font-size: 28rpx;
			}
			
		}
		.addfri-number {
			margin-top: 30rpx;
			font-size: 30rpx;
			color: #666666;
			text-align: center;
		}
		
		.addfriend-first-item {
			background-color: #FFFFFF;
			margin-top: 30rpx;
			.addfriend-left-img {
				font-size: 80rpx;
			}
			
			.addfriend-right-img {
				font-family: 'iconfont';
				font-size: 40rpx;
			}
			
			.addfriend-userinfo {
				.end-info {
					padding: 35rpx 0;
					box-sizing: border-box;
				}
			}
		}
		
		
		
		.addfri-uni-list {
			.uni-list.data-v-8ed9886a {
				margin: 40rpx 0;
			}
		}
	}
</style>
