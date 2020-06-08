<template>
	<view class="messagelist set-bgc">
		
		<default-list @click.native="toDynamic" :hasContent="true" :noBorderBtm="true">
			<text class="messagelist-img my-iconfont item-img1" slot="def-list-left">&#xe604;</text>
			<text class="messagelist-title" :class="{'newfriend-dynamic': newFriendDynamic}" slot="def-list-center">朋友动态</text>
			<text class="messagelist-content" :clas="{'messagelist-content-mutinumber': false}" slot="def-list-content">3</text>
		</default-list>
		
		<default-list :marTop="true">
			<text class="messagelist-img my-iconfont item-img2" slot="def-list-left">&#xe69a;</text>
			<text class="messagelist-title" slot="def-list-center">扫一扫</text>
		</default-list>
		
		<default-list :noBorderBtm="true">
			<text class="messagelist-img my-iconfont item-img3" slot="def-list-left">&#xe688;</text>
			<text class="messagelist-title" slot="def-list-center">位置</text>
		</default-list>
		
		<default-list :marTop="true">
			<text class="messagelist-img my-iconfont item-img4" slot="def-list-left">&#xe603;</text>
			<text class="messagelist-title" slot="def-list-center">工具</text>
		</default-list>
		
		<default-list @click.native="toSetting" :noBorderBtm="true">
			<text class="messagelist-img my-iconfont item-img5" slot="def-list-left">&#xe6a0;</text>
			<text class="messagelist-title" slot="def-list-center">设置</text>
		</default-list>
	</view>
</template>

<script>
	import DefaultList from "@/components/content/defaultlist/DefaultList.vue"
	import { mapState } from 'vuex'
	
	export default {
		components: {
			DefaultList
		},
		computed: {
			...mapState(['newFriendDynamic'])
		},
		methods: {
			toSetting() {
				uni.navigateTo({
					url:"/components/content/setting/Setting"
				})
			},
			toDynamic() {
				uni.navigateTo({
					url: "/components/content/dynamic/Dynamic"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.messagelist {
		height: 100vh;
		
		.messagelist-img {
			font-size: 56rpx;
		}
		
		.item-img1 {
			color: #7C32C9;
		}
		.item-img2 {
			color: #2E77ED;
		}
		.item-img3 {
			color: #6B400D;
		}
		.item-img4 {
			color: #D7CAFF;
		}
		.item-img5 {
			color: #4E30DC;
		}
		.messagelist-title {
			color: $uni-text-color;
			font-size: $uni-font-size-lg;
		}
		.messagelist-content {
			padding: 0 15rpx;
			line-height: 36rpx;
			font-size: $uni-font-size-lg;
			margin-left: 20rpx;
			text-align: center;
			color: #fff;
			background-color: #DD524D;
			border-radius: 50%;
		}
		.messagelist-content-new {
			width: 20rpx;
			height: 20rpx;
			background-color: $def-text-red-color;
			border-radius: 50%;
		}
		.messagelist-content-mutinumber {
			padding: 0 5rpx !important;
		}
		.newfriend-dynamic {
			position: relative;
			&::after {
				content: '';
				position: absolute;
				right: -40rpx;
				top: 14rpx;
				width: 20rpx;
				height: 20rpx;
				background-color: $def-text-red-color;
				border-radius: 50%;
			}
		}
		
	}
	
</style>
