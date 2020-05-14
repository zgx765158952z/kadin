<template>
	<view class="group-members">
		<view class="group-members-list">
			<view v-for="(item, index) in groupMemberList[currentGroup.tid]" :key="index" class="group-members-item">
				<image @tap="toFriendInfo(item.account)" @longtap="changeMode" src="/static/image/global/boyHeadImg.png" mode="aspectFill"></image>
				<text @tap.stop="handleDelMember(item.account)" v-if="delMode && index !== 0" class="my-iconfont delmember-icon">&#xe629;</text>
				<text class="group-members-name">
					{{ item.groupNickname }}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	
	
	export default {
		data() {
			return {
				delMode: false, //移除模式
			}
		},
		computed: {
			...mapState(['userInfo', 'currentGroup', 'groupMemberList']),
			...mapGetters(['isGroupAdmin'])
		},
		methods: {
			changeMode() { //改变当前模式
				if(this.isGroupAdmin === 3) {
					if(this.delMode) {
						this.delMode = false
						//#ifdef APP-PLUS
						this.changeRightTopBtn('管理 ')
						//#endif
					}else {
						this.delMode = true
						//#ifdef APP-PLUS
						this.changeRightTopBtn('取消 ')
						//#endif
					}
				}else {
					console.log('您没有权限删除群成员')
				}
				
			},
			handleDelMember(account) {
				console.log('删除成员账号:', account)
			},
			toFriendInfo(account) {
				console.log('toFriendInfo', account)
				uni.navigateTo({
					url: `/components/content/friend/FriendInfo?friendAccount=${account}` 
				})
			},
			// #ifdef APP-PLUS
			changeRightTopBtn(text) { //获取当前窗口，修改导航栏button样式
				let webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewButtonStyle(0, {
					text
				})
			},
			// #endif
		},
		onLoad() {
			if(this.isGroupAdmin === 3) {
				//#ifdef APP-PLUS
				this.changeRightTopBtn('管理 ')
				//#endif
			}
		},
		onNavigationBarButtonTap(options) {
			if(options.index === 0) {
				this.changeMode()
			}
		}
	}
</script>

<style scoped lang="scss">
	.group-members {
		.group-members-list {
			display: flex;
			flex-flow: row wrap;
			padding: 15rpx;
			box-sizing: border-box;
			.group-members-item {
				position: relative;
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				justify-content: center;
				width: 20%;
				padding: 15rpx 0;
				box-sizing: border-box;
				image {
					width: 110rpx;
					height: 110rpx;
					border-radius: 20rpx;
				}
				
				.delmember-icon {
					position: absolute;
					right: 15rpx;
					top: 15rpx;
					font-size: 36rpx;
					color: #DF5000;
				}
				.group-members-name {
					width: 100%;
					text-align: center;
					font-size: $uni-font-size-base;
					color: #989898;
					padding: 0 10rpx;
					box-sizing: border-box;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
		}
	}
</style>
