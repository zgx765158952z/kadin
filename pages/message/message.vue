<template>
	<view class="messgae">
		<message-list></message-list>
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
		}
		
	}
</script>

<style lang="scss">

</style>
