<template>
	<view class="collect-search">
		<view class="collect-search-content">
			<view class="collect-search-btm">
				<block v-if="searchList.length > 0">
					<block v-for="(item, index) in searchList" :key="index">
						<view @longpress="handlerLongtap" :data-index="index" @tap="toChain(item.collectContent)" class="collect-search-list">
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
		</view>
	</view>
</template>

<script>
	import { queryCollectByTypeRequest, queryCollectByLabelRequest } from '@/network/collection.js'
	import { formatTimeStamp } from '@/common/index.js'
	
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				//获取的搜索列表数据
				searchList: []
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			
			//按文件类型搜索
			queryCollectByType(type) {
				const reqStr = `?account=${this.userInfo.user.userAccount}&collectType=${type}`
				queryCollectByTypeRequest(reqStr).then(res => {
					console.log(res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							this.searchList = res.data.data
						}else if(res.data.code === 4004) {
							uni.showToast({
								title: '您无此类型收藏',
								icon: 'none'
							})
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
			
			//按标签搜索
			queryCollectByLabel(type) {
				const reqStr = `?account=${this.userInfo.user.userAccount}&collectLabel=${type}`
				queryCollectByLabelRequest(reqStr).then(res => {
					console.log(res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							this.searchList = res.data.data
						}else if(res.data.code === 4004) {
							
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
			//跳转外链
			toChain(link) {
				uni.navigateTo({
					url: `/components/content/collection/collectionCpns/CollectChain?link=${link}&name=img-webview`
				})
			},
		},
		filters: {
			getFormatTime(timeStamp) {
				return formatTimeStamp(timeStamp, 'yyyy-MM-dd hh:mm')
			}
		},
		onLoad(option) {
			console.log(option)
			if(option.cate === 'type') {
				this.queryCollectByType(option.type)
			}else if(option.cate === 'label') {
				this.queryCollectByLabel(option.type)
			}
		}
	}
</script>

<style lang="scss">
	.collect-search {
		height: 100vh;
		background-color: #F0F0F0;
		.collect-search-content {
			margin: 0 20rpx;
			padding-top: 10rpx;
			box-sizing: border-box;
			.collect-search-btm {
				.collect-search-list {
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
				.collect-search-list:active {
					background-color: #F3F3F3;
				}
				.collect-search-list-active {
					background-color: #F3F3F3 !important;
				}
			}
		}
		
	}
</style>
