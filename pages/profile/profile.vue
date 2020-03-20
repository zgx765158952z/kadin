<template>
	<view class="profile set-bgc">
		<profile-head :nickname="userInfo.user.nickname" :userAccount="userInfo.user.userAccount" @tap.native="toPersonalInfo"></profile-head>
		<profile-con></profile-con>
		<profile-btm></profile-btm>
		<!-- #ifdef APP-PLUS -->
		<button @tap="getCid" type="primary">获取自己的cid</button>
		<text selectable v-if="cid">{{ cid }}</text>
		<!-- #endif -->
	</view>
</template>

<script>
	import ProfileHead from './profileCpns/ProfileHead';
	import ProfileCon from './profileCpns/ProfileCon';
	import ProfileBtm from './profileCpns/ProfileBtm';
	
	
	import { getMyUserInfo } from "@/network/myUserInfo.js";
	
	import { mapState } from 'vuex';
	
	export default {
		components: {
			ProfileHead,
			ProfileCon,
			ProfileBtm
		},
		data() {
			return {
				list: "123",
				cid: ''
			};
		},
		computed: {
			//批量映射
			...mapState(['userInfo'])
		},
		methods: {
			// #ifdef APP-PLUS
			//测试，获取cid
			getCid() {
				this.cid = plus.push.getClientInfo().clientid
			},
			// #endif
			
			toPersonalInfo() {
				uni.navigateTo({
					url: "/components/content/personalinfo/PersonalInfo"
				})
			}
		},
		created() {
			console.log('created')
		}
	}
</script>

<style lang="scss">
	
	.profile {
		height: 100vh;

		
	}

</style>
