<template>
	<view class="addfriendinfo">
		<view class="addfriendinfo-top">
			<view class="top-left">
				<block v-if="addfriendInfo.image.length > 0">
					<image class="left-headimg" :src=" imgUrl + addfriendInfo.image" mode="aspectFill"></image>
				</block>
				
				<block v-else>
					<text class="iconfont-img left-headimg">&#xe668;</text>
				</block>
			</view>
			<view class="top-right">
				<view class="nickname">
					{{ addfriendInfo.nickname }}
				</view>
			</view>
		</view>
		
		
		
		
		
		<view class="myborderlist">
			<default-list>
				<view slot="def-list-left" class="def-list-left">
					设置备注和标签
				</view>
			</default-list>
		</view>
		
		<view class="myborderlist">
			<default-list>
				<view slot="def-list-left" class="def-list-left">
					个性签名
				</view>
				<view slot="def-list-center" class="def-list-center">
					<text v-if="addfriendInfo && addfriendInfo.signature.length > 0">{{ addfriendInfo.signature }}</text>
					<text v-else>无个性签名</text>
				</view>
			</default-list>
			
			<default-list>
				<view slot="def-list-left" class="def-list-left">
					来源
				</view>
				<view slot="def-list-center" class="def-list-center">
					<text v-if="addfriendInfo && addfriendInfo.source.length > 0">来自{{ addfriendInfo.source }}搜索</text>
					<text v-else>来自手机号搜索</text>
				</view>
			</default-list>
		</view>
		
		<view @tap="toApplyFriend" class="list4 cli-hover">
			<view class="send-msg">
				添加到通讯录
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	import { imgBaseUrl } from '@/common/helper.js'
	
	export default {
		components: {
			DefaultList
		},
		data() {
			return {
				addfriendInfo: null,
				friendPhone: null,
				imgUrl: ''
			}
		},
		methods: {
			//跳转
			toApplyFriend() {
				uni.navigateTo({
					url: '/components/content/applyfriend/ApplyFriend?friendPhone=' + this.friendPhone
				})
			}
			
		},
		onNavigationBarButtonTap(option) {
			if(option.index === 0) {
				uni.showActionSheet({
					itemList: ['设置备注和标签', '加入黑名单', '取消'],
					success(e) {
						
					}
				})
			}
		},
		created() {
			this.imgUrl = imgBaseUrl
		},
		onLoad(option) {
			console.log(option);
			this.addfriendInfo = JSON.parse(decodeURIComponent(option.addfriendInfo));
			this.friendPhone = option.friendPhone;
		}
	}
</script>

<style lang="scss">
	.addfriendinfo {
		background-color: #F8F8F8;
		height: 100vh;
		.addfriendinfo-top {
			display: flex;
			background-color: #FFFFFF;
			padding: 25rpx 0 55rpx 0;
			border-bottom: 1rpx solid rgba(100, 100, 100, .1);
			.top-left {
				padding: 0 30rpx;
				.left-headimg {
					border-radius: 12rpx;
					width: 120rpx;
					height: 120rpx;
				}
				.iconfont-img {
					font-family: 'iconfont';
					font-size: 120rpx;
					border-radius: 12rpx;
				}
			}
			.top-right {
				flex: 1;
				.nickname {
					font-size: 40rpx;
					font-weight: bold;
				}
				.little-font {
					margin: 3rpx 0;
					font-size: 30rpx;
					color: #989898;
				}
			}
		}
		.myborderlist {
			margin-bottom: 25rpx;
		}
		
		.list3, .list4 {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 0;
			background-color: #FFFFFF;
			.img {
				margin-right: 15rpx;
				image {
					display: flex;
					align-items: center;
					width: 60rpx;
					height: 60rpx;
				}
			}
			.send-msg {
				color: #576A92;
			}
		}
		.list3 {
			border-bottom: 1rpx solid rgba(100, 100, 100, .1);
		}
		.cli-hover:active {
			background-color: $uni-bg-color-hover;
		}
		
		
	}
</style>
