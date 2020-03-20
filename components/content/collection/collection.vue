<template>
	<view class="collection">
		<collection-content :myCollectList="myCollectList" class="collectioncontent"></collection-content>
	</view>
</template>

<script>
	
	import CollectionContent from './collectionCpns/CollectionContent'
	
	import { browseMyCollectRequest } from '@/network/collection.js'
	import { mapState } from 'vuex'
	
	
	export default {
		data() {
			return {
				myCollectList: []
			}
		},
		components: {
			CollectionContent
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			//获取所有收藏
			browseMyCollect() {
				browseMyCollectRequest(`?account=${this.userInfo.user.userAccount}`).then(res => {
					console.log(res)
					if(res.status === 200) {
						if(res.data.code === 2000) {
							//获取的收藏列表不是字符串才存储
							if(res.data.data !== "没有添加收藏") {
								const data = res.data.data
								this.myCollectList = this.sortCollectList(data)
							}
						}else {
							console.log('ssssss')
							uni.showToast({
								title: '程序走丢了，请稍后重试',
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
							title: '程序走丢了，请稍后重试',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: '程序走丢了，请稍后重试',
						icon: 'none'
					})
				})
			},
			//对搜藏列表按照时间排序
			sortCollectList(list) {
				return list.sort(function(a, b) {
					return b.date - a.date
				})
			}
		},
		created() {
			this.browseMyCollect()
		}
	}
</script>

<style lang="scss">
	.collection {
		height: 100vh;
		background-color: #F0F0F0;
		margin: 0 auto;
		.collectioncontent {
			uni-search-bar {
				.uni-searchbar.data-v-622c0ccb {
					justify-content: center;
					
					margin: 0 auto;
					padding: 20rpx 0;
					align-items: center;
					.uni-searchbar__box.data-v-622c0ccb {
						background-color: #FFFFFF;
						height: 75rpx;
					}
				}
				.uni-searchbar__cancel.data-v-622c0ccb {
					font-size: 28rpx;
				}
				
			}
		}
	}
</style>
