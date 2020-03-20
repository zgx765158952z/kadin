<template>
	<view class="messgae">
		<message-list>
			
		</message-list>
		
		
	</view>
</template>

<script>
	import MessageList from './messageCpns/MessageList.vue'
	
	export default {
		components: {
			MessageList
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			};
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon:"none",
					title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			}
		}
		
	}
</script>

<style lang="scss">

</style>
