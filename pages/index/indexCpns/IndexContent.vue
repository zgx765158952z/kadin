<template>
	<view class="indecon">
		
		
		<view class="indecon-list">
			<view class="indecon-item indecon-item1">
				<text class="indecon-item-img1 my-iconfont">&#xe60a;</text>
				<view class="indecon-item-info">
					<view class="indecon-item-info-top">
						<view class="indecon-item-info-top-title">
							消息中心
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="indecon-list" @tap="tapList">
			
			<view @tap="toSession(item.name)" @longpress="handlerLongtap" :class="{'index-list-active': pickerUserIndex === index}" v-for="(item, index) in userList" :key="index" :data-index="index" class="indecon-item">
				<image class="indecon-item-img" src="/static/image/test/test.jpg" mode="aspectFill"></image>
				<view class="indecon-item-info">
					<view class="indecon-item-info-top">
						<view class="indecon-item-info-top-title">
							{{ item.name }}
						</view>
						<view class="indecon-item-info-top-time">
							{{ item.time }}
						</view>
					</view>
					<view class="indecon-item-info-bottom">
						<view class="indecon-item-info-bottom-msg">
							{{ item.msg }}
						</view>
						<text class="my-iconfont msg-icon">&#xe626;</text>
					</view>
				</view>
			</view>
		</view>
		
		
		
		
		<view class="def-popup">
			<view @tap="hidePop" @touchmove.stop.prevent="moveHandle" v-if="showPop" class="def-popup-mask">
				<view class="def-popup-list" :class="{'show':showPop}" :style="popStyle">
					<view @tap="choosePop(index)" v-for="(item, index) in popList" :key="index" class="def-popup-item" hover-class="tap-hover-color">
						{{ item }}
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import { listPopShadeMixin } from '@/common/utils.js'
	
	
	export default {
		
		data() {
			return {
				//聊天列表
				userList: []
				
			}
		},
		mixins: [listPopShadeMixin],
		methods: {
			
			
			
			
			/* 获取列表数据 */
			getListData() {
				let list = [];
				for (let i = 0; i < 20; i++) {
					list.push({
						"name": `第${i+1}个用户`,
						"time": '3月18日',
						"msg": `这是第${i+1}个用户的聊天信息这是第${i+1}个用户的聊天信息这是第${i+1}个用户的聊天信息`
					})
				}
				this.userList = list;
			},
			
			//点击菜单的下标index
			choosePop(index) {
				return index
			},
			
			//跳转到session
			toSession(name) {
				uni.navigateTo({
					url: `/components/content/session/Session?name=${name}`
				})
			}
			
			
			
		},
		beforeMount() {
			this.getListData()
		}
		
	}
</script>

<style scoped lang="scss">
	
	/*弹性盒子*/
	
	.indecon-item,
	.indecon-item-info-top,
	.indecon-item-info-bottom,
	{
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}
	
	.indecon {
		.msg-center {
			.my-iconfont {
				font-size: 80rpx;
			}
		}
		.indecon-item1 {
			border-bottom: 1rpx solid rgba(100, 100, 100, .05);
			.indecon-item-img1 {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80rpx;
				height: 80rpx;
				margin-right: 30rpx;
				font-size: 60rpx;
				color: #FFFFFF;
				background-color: #55A532;
				border-radius: 100%;
			}
		}
		.indecon-list {
			
			.indecon-item {
				position: relative;
				padding: 24rpx 30rpx;
				margin-top: 1px;
				image {
					height: 90rpx;
					width: 90rpx;
					border-radius: 8rpx;
					margin-right: 20rpx;
				}
				
				.indecon-item-info {
					flex: 1;
					.indecon-item-info-top-title {
						flex-grow: 4;
						font-size: $uni-font-size-lg;
					}
					.indecon-item-info-top-time {
						text-align: right;
						font-size: 24rpx;
						flex-grow: 1;
						color: #999999;
					}
					.indecon-item-info-bottom {
						color: #999999;
						font-size: 24rpx;
						
						.indecon-item-info-bottom-msg {
							flex: 1;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							margin-right: 50rpx;
						}
						.msg-icon {
							color: #666666;
							min-width: 30rpx;
							width: 30rpx;
						}
					}
					
					
				}
				
			}
			.indecon-item:active {
				background-color: #F3F3F3 !important;
			}
			.index-list-active {
				background-color: #F3F3F3 !important;
			}
				
			
			/* :not反向选择器，除了第一个元素 */
			/* &>view表示： &为上一级元素，即indecon-item>view*/
			&>view:not(:first-child) {
				margin-top: 1rpx;
			
				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: 1rpx solid rgba(100, 100, 100, .05);
					width: 620upx;
					position: absolute;
					top: -1rpx;
					right: 0;
					transform:scaleY(1);	/* 1px像素 */
				}
			}
		}
		
		
		
		
		
		
		
		.def-popup {
			/*遮罩*/
			.def-popup-mask {
				position: fixed;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: 100;
				/*列表*/
				.def-popup-list {
					position: fixed;
					z-index: 101;
					max-width: 500rpx;
					color: #333;
					text-align: left;
					font-size: $uni-font-size-lg;
					box-sizing: border-box;
					background-color: #FFFFFF;
					box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.5);
					line-height: 100rpx;
					
					transition: transform 0.15s ease-in-out 0s;
					user-select: none;
					-webkit-touch-callout: none;
					transform: scale(0, 0);
					
					&.show {
						transform: scale(1, 1);
					}
					
					.def-popup-item {
						padding: 0 40rpx 0 30rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
			
		}
		
		
		
	}
	
</style>
