<template>
	<view class="profilecon">
		<default-list noBorderBtm="true" marTop="true" @tap.native="toPayment">
			<text slot="def-list-left" class="iconfont-img font-img1">&#xe607;</text>
			<text slot="def-list-center" class="profile-title">费用中心</text>
		</default-list>
		
		<default-list noBorderBtm="true" marTop="true" @tap.native="toCollection">
			<text slot="def-list-left" class="iconfont-img font-img2">&#xe644;</text>
			<text slot="def-list-center" class="profile-title">收藏</text>
		</default-list>
		
		<default-list noBorderBtm="true" marTop="true" @tap.native="toSetting">
			<text slot="def-list-left" class="iconfont-img font-img3">&#xe6a0;</text>
			<text slot="def-list-center" class="profile-title">设置</text>
		</default-list>
	</view>
</template>

<script>
	
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	
	export default {
		components: {
			DefaultList
		},
		methods: {
			toPayment() {
				uni.navigateTo({
					url: "/components/content/payment/PayMent"
				})
			},
			toSetting() {
				uni.navigateTo({
					url: "/components/content/setting/Setting"
				})
			},
			toCollection() {
				uni.navigateTo({
					url: '/components/content/collection/collection'
				})
			}
		}
	}
</script>

<style lang="scss">
	.profilecon {
		
		default-list {
			.iconfont-img {
				font-family: 'iconfont';
				font-size: 50rpx;
			}
			.font-img1 {
				color: #F7A46B;
			}
			.font-img2 {
				color: #FBAA00;
			}
			.font-img3 {
				color: #4E30DC;
			}
			.profile-title {
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
			}
			
		}
	}
</style>
