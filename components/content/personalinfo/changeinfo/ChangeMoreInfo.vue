<template>
	<view class="ChangeMoreInfo">
		<default-list @click.native="toGenderInfo" class="Info-list">
			<view slot="def-list-left">
				性别
			</view>
			<view slot="def-list-center">
				{{ userInfo.user.userSex?'男':'女' }}
			</view>
		</default-list>
		
		<default-list @click.native="toChooseLocation" class="Info-list">
			<view slot="def-list-left">
				地区
			</view>
			<view v-if="userInfo.user.region" slot="def-list-center">
				<text>{{ userInfo.user.region }}</text>
			</view>
		</default-list>
		
		<default-list @click.native="toSignature" class="Info-list">
			<view slot="def-list-left">
				个性签名
			</view>
			<view v-if="userInfo.user.signature" slot="def-list-center">
				{{ userInfo.user.signature }}
			</view>
		</default-list>
	</view>
</template>

<script>
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	import { mapState } from 'vuex'
	
	export default {
		components: {
			DefaultList
		},
		data() {
			return {
				selectProvince: '',
				selectCity: ''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			toGenderInfo() {
				uni.navigateTo({
					url: '/components/content/personalinfo/changeinfo/moreCpns/GenderInfo'
				})
			},
			toChooseLocation() {
				uni.navigateTo({
					url: '/components/content/chooseLocation/ChooseLocation'
				})
			},
			toSignature() {
				uni.navigateTo({
					url: '/components/content/personalinfo/changeinfo/moreCpns/Signature'
				})
			},
		}
	}
</script>

<style lang="scss">
	.ChangeMoreInfo {
		height: 100vh;
		background-color: #F7F7F7;
		.Info-list {
			.def-list-left {
				
			}
			.def-list-center {
				text-align: right;
				.def-list-center-text {
					margin-left: 10rpx;
				}
			}
		}
		.def-list {
			padding: 30rpx 40rpx 30rpx 0 !important;
			margin-left: 40rpx !important;
		}
	}
</style>
