<template>
	<view class="publish">
		<view class="publish-textarea">
			<textarea v-model="currentText" auto-height focus="true" placeholder="写下你的想法..."/>
		</view>
		<view class="publish-img-list">
			<view>
				<view v-for="(item, index) in imgList" :key="index" class="publish-img-item def-center-box">
					<image :src="item" mode="aspectFill"></image>
					<text @tap="delApicture(index)" class="my-iconfont publish-img-item-del">&#xe629;</text>
				</view>
				<view v-if="maximum" @tap="choosePicture" class="publish-add-icon def-center-box my-iconfont">&#xe606;</view>
			</view>
		</view>
		<view class="publish-set">
			<head-img-item @click.native="toLocationInfo">
				<view class="my-iconfont set-img" slot="start-img">&#xe613;</view>
				<view slot="title">
					所在位置
				</view>
				<view class="link-right" slot="right">
					<view class="link-right-img my-iconfont">&#xe683;</view>
				</view>
			</head-img-item>
			<head-img-item>
				<view class="my-iconfont set-img" slot="start-img">&#xe610;</view>
				<view slot="title">
					提醒谁看
				</view>
				<view class="link-right" slot="right">
					<view class="link-right-img my-iconfont">&#xe683;</view>
				</view>
			</head-img-item>
			<head-img-item>
				<view class="my-iconfont set-img" slot="start-img">&#xe62b;</view>
				<view slot="title">
					谁可以看
				</view>
				<view class="link-right" slot="right">
					<text class="link-right-img my-iconfont"><text>公开</text>&#xe683;</text>
				</view>
			</head-img-item>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<button @tap="PublishDynamic" size="mini" type="default">发布</button>
		<!-- #endif -->
	</view>
</template>

<script>
	import HeadImgItem from '@/components/content/defimglist/HeadImgItem.vue'
	
	
	import { doPublishDynamicRequest, dynamicUploadImage } from '@/network/dynamic.js'
	import { mapState, mapMutations } from 'vuex'
	import { chooseImg, uploadFile } from '@/common/index.js'
	import { publish_info } from '@/common/helper.js'
	
	export default {
		components: {
			HeadImgItem
		},
		data() {
			return {
				txt1: "",
				txt2: "",
				currentText: '',
				imgList: []
			}
		},
		computed: {
			...mapState(['userInfo']),
			maximum() { //是否能再添加图片
				return this.imgList.length < 9
			}
		},
		methods: {
			...mapMutations(['updateFriendDynamicList']),
			//点击发表
			PublishDynamic() {
				if(this.currentText.length > 0) {
					let obj = {
						images: ['null'],
						account: this.userInfo.user.userAccount,
						content: this.currentText,
						address: '广州天河',
					}
					this.doPublishDynamic(obj)
				}else {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})
				}
				
			},
			//选择图片
			choosePicture() {
				chooseImg().then(res => {
					console.log('img', res)
					for(let i=0; i<res.length; i++) { //去重
						const ind = this.imgList.findIndex(item => {
							return item === res[i]
						})
						if(ind === -1) {
							this.imgList.push(res[i])
						}
					}
				})
			},
			//发表动态
			async doPublishDynamic(obj) {
				let newObj = {
					'images': ['null']
				}
				if(this.imgList) { //是否选择有图片
					await dynamicUploadImage(this.imgList).then(res => {
						console.log('批量上传图片:', res)
						let newImgList = []
						res.forEach(item => {
							let data = JSON.parse(item.data)
							if(item.statusCode === 200 && data.code === 2000) {
								console.log('上传成功:', data.data)
								newImgList.push(data.data)
							}
						})
						
						obj['images'] = newImgList
						newObj['images'] = newImgList
						console.log('obj:', obj)
					})
					
				}
				
				doPublishDynamicRequest(obj).then(res => {
					if(res.status === 200) {
						if(res.data.code === 2000) {
							newObj['account'] = obj.account
							newObj['content'] = obj.content
							newObj['location'] = obj.address
							newObj['id'] = res.data.data.friendCircleId
							newObj['time'] = res.data.data.createTime
							newObj['faceImage'] = this.userInfo.user.faceImage
							newObj['name'] = this.userInfo.user.nickname
							newObj['comment'] = []
							newObj['likePerson'] = []
							
							this.updateFriendDynamicList(newObj)
							uni.navigateBack()
						}else {
							uni.showToast({
								title: '发表失败',
								icon: 'none'
							})
						}
					}else {
						uni.showToast({
							title: '发表失败',
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			delApicture(index) { //删除图片
				this.imgList.splice(index, 1)
			},
			toLocationInfo() {
				uni.navigateTo({
					url: "/components/content/myLocation/LocationInfo"
				})
			}
		},
		onNavigationBarButtonTap(options) {
			if(options.index === 0) {
				console.log('option')
				this.PublishDynamic()
			}
		},
		//返回触发modal
		onBackPress(e) {
			if(e.from === 'navigateBack') {
				//返回
				return false
			}
			if(e.from === 'backbutton') {
				if(this.currentText.length > 0) {
					uni.showModal({
						title: '提示',
						content: '您确定退出当前编辑？',
						success(res) {
							if(res.confirm) {
								uni.navigateBack()
							}else if(res.cancel){
								//表示禁止默认返回
								return true
							}
						},
						fail(err) {
							console.log(err)
							return true
						}
					})
				}else {
					return false
				}
			}
			return true
		},
	}
</script>

<style lang="scss">
	.publish {
		.publish-textarea {
			display: flex;
			justify-content: center;
			textarea {
				width: 90%;
				padding: 30rpx;
				min-height: 100rpx;
			}
		}
		.publish-img-list {
			margin: 0 auto;
			&>view {
				display: flex;
				flex-flow: row wrap;
				padding: 0 30rpx;
				.publish-img-item, .publish-add-icon {
					position: relative;
					width: 200rpx;
					height: 200rpx;
					margin: 7rpx;
					image {
						width: 100%;
						height: 100%;
					}
					.publish-img-item-del {
						position: absolute;
						font-size: 34rpx;
						color: #DD524D;
						right: -5rpx;
						top: -5rpx;
						z-index: 1;
					}
				}
				.publish-add-icon {
					font-size: 80rpx;
					color: #999;
					background-color: #F7F7F7;
				}
			}
			
		}
		
		.publish-set {
			padding: 0 30rpx;
			box-sizing: border-box;
			font-size: $uni-font-size-sm;
			border-top: 1rpx solid rgba(100, 100, 100, .1);
			.set-img {
				font-size: 36rpx;
			}
			.link-right {
				.link-right-img {
					font-size: $uni-font-size-base;
				}
			}
			
		}
	}
</style>
