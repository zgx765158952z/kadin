<template>
	<view class="collection-content">
		
		<!-- 设置圆角搜索框 -->
		<uni-search-bar @click.native="hanldeSearch" ref="collectSearch" :radius="50" @confirm="confirmSearch"/>
		
		<block v-if="!showLabel">
			<view class="top-list">
				<view @tap="toCollectSearch(item, 'type')" v-for="(item, index) in defTypeList" :key="index" class="top-list-item" :class="'item'+index">
					{{ item }}
				</view>
			</view>
			
			<view class="collectionbtm">
				<block v-if="listData.length > 0">
					<block v-for="(item, index) in listData" :key="index">
						<view @longpress="handlerLongtap" :data-index="index" @tap="toChain(item.collectContent)" class="collectionlist">
							<block v-if="item.collectType === '图片'">
								<view class="list-top">
									<block v-if="item.collectContent">
										<view class="only-image">
											<image class="only-image-icon" :src="item.collectContent" mode="aspectFill"></image>
										</view>
									</block>
								</view>
							</block>
							
							<block v-if="item.collectType === '链接'">
								<view class="list-top">
									<view class="link-image">
										<text class="my-iconfont link-image-icon">&#xe65b;</text>
									</view>
									<block v-if="item.collectContent">
										<view class="list-title">
											{{ item.collectContent }}
										</view>
									</block>
								</view>
							</block>
							
							<view class="list-btm">
								{{ userInfo.user.nickname }} {{ item.date | getFormatTime}} {{ item.collectType }}
							</view>
						</view>
					</block>
				</block>
				
			</view>
		</block>
		<block v-else>
			<view class="label-list">
				<view class="label-list-top">
					{{ labelList.length > 0 ? '所有标签': ''}}
				</view>
				<block v-if="labelList.length > 0">
					<view class="label-item">
						<view @tap="toCollectSearch(item, 'label')" class="label-item-text" v-for="(item, index) in labelList" :key="index" hover-class="tap-hover-color">
							{{ item }}
						</view>
					</view>
				</block>
			</view>
			
		</block>
		
		<view class="def-popup">
			<view @tap="hidePop" @touchmove.stop.prevent="moveHandle" v-if="showPop" class="def-popup-mask">
				<view class="def-popup-list" :class="showPopList? 'effect-in' : 'effect-hide'" :style="popStyle">
					<view @tap="choosePop(index)" v-for="(item, index) in popList" :key="index" class="def-popup-item" hover-class="tap-hover-color">
						{{ item }}
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar"
	import { mapState } from 'vuex'
	import { formatTimeStamp } from '@/common/index.js'
	import { delMyCollectRequest } from '@/network/collection.js'
	
	//混入
	import { listPopShadeMixin } from '@/common/utils.js'
	
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				//类型列表
				defTypeList: ["图片", "链接", "文件", "音乐", "聊天记录", "语音", "笔记", "位置"],
				
				
				listData: [],
				showLabel: false,
				labelList: []
			}
		},
		props: {
			myCollectList: {
				type: Array,
				default() {
					return []
				}
			}
		},
		mixins: [ listPopShadeMixin ],
		watch: {
			myCollectList(newV, oldV) {
				if(!newV) {
					this.listData = oldV
				}else {
					this.listData = newV
				}
				//标签列表
				for(let i=0; i<this.listData.length; i++) {
					if(this.listData[i].collectLabel !== null) {
						this.labelList.push(this.listData[i].collectLabel)
					}
				}
			}
		},
		filters: {
			getFormatTime(timeStamp) {
				return formatTimeStamp(timeStamp, 'yyyy-MM-dd hh:mm')
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			
			//跳转到CollectSearch
			toCollectSearch(type, cate) {
				uni.navigateTo({
					url: `/components/content/collection/collectionCpns/CollectSearch?type=${type}&cate=${cate}`
				})
			},
			//确认搜索
			confirmSearch() {
				uni.showToast({
					title: '暂无关键字搜索功能',
					icon: 'none'
				})
			},
			
			//取消搜索
			cancelSearch() {
				this.showLabel = false
			},
			//聚焦搜索
			hanldeSearch() {
				setTimeout(() => {
					this.showLabel = this.$refs.collectSearch.showSync
				}, 120)
			},
			
			//跳转外链
			toChain(link) {
				uni.navigateTo({
					url: `/components/content/collection/collectionCpns/CollectChain?link=${link}&name=img-webview`
				})
			},
			//点击菜单的下标index
			choosePop(index) {
				switch(index) {
					case 0:
						console.log('点击index为0')
						break
					case 1:
						console.log('点击index为1')
						break
					case 2:
						console.log('当前的pickerUserIndex：', this.pickerUserIndex)
						this.delMyCollect(this.pickerUserIndex)
						break
					case 3:
						console.log('点击index为3')
						break
				}
			},
			//删除收藏请求
			delMyCollect(index) {
				const obj = {
					account: this.userInfo.user.userAccount,
					collectId: this.listData[index].collectId
				}
				const reqStr = `?account=${this.userInfo.user.userAccount}&collectId=${this.listData[index].collectId}`
				delMyCollectRequest(reqStr).then(res => {
					console.log(res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							this.$nextTick(() => {
								//删除对应列表
								this.listData.splice(index, 1)
							})
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
					console.log(err)
				})
			}
		},
		beforeMount() {
			//弹窗列表
			this.popList = ['转发', '编辑标签', '删除', '更多']
		}
	}
</script>

<style scoped lang="scss">
	.collection-content {
		margin: 0 20rpx;
		.top-list {
			display: flex;
			flex-wrap: wrap;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			padding: 30rpx 10rpx;
			.top-list-item {
				text-align: center;
				width: 24%;
				margin: 20rpx 0;
				font-size: 32rpx;
			}
			.top-list-item:active {
				color: #007AFF;
			}
			.item1, .item5 {
				border-left: 1px solid rgba(100, 100, 100, 0.2);
				border-right: 1px solid rgba(100, 100, 100, 0.2);
			}
			.item2, .item6 {
				border-right: 1px solid rgba(100, 100, 100, 0.2);
			}
			
		}
		
		
		.collectionbtm {
			.collectionlist {
				background-color: #FFFFFF;
				padding: 20rpx;
				margin: 20rpx 0;
				border-radius: 15rpx;
				.list-top {
					display: flex;
					.only-image{
						margin-right: 20rpx;
						.only-image-icon {
							max-width: 160rpx;
							max-height: 160rpx;
						}
					}
					.link-image {
						margin-right: 20rpx;
						.link-image-icon {
							font-size: 80rpx;
							color: #F7A349;
						}
					}
					.list-title {
						flex: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.list-btm {
					color: #666666;
					font-size: 26rpx;
					margin-top: 15rpx;
				}
			}
			.collectionlist:active {
				background-color: #F3F3F3;
			}
			.collectionlist-active {
				background-color: #F3F3F3 !important;
			}
		}
		
		
		//搜索框聚焦时样式
		.label-list {
			margin-top: 5rpx;
			box-sizing: border-box;
			color: $uni-text-color-grey;
			font-size: $uni-font-size-base;
			
			.label-list-top {
				text-align: center;
			}
			
			.label-item {
				display: flex;
				flex-flow: row wrap;
				justify-content: flex-start;
				align-items: center;
				align-content: center;
				
				margin-top: 50rpx;
				
				&>.label-item-text {
					box-sizing: border-box;
					padding: 6rpx 15rpx;
					margin: 10rpx;
					border-radius: 20rpx;
					background-color: #FFFFFF;
					color: $uni-text-color;
					border: 2rpx solid $uni-text-color-disable;
					box-shadow: 0 0 3rpx $uni-text-color-disable;
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
