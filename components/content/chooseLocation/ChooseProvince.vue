<template>
	<view class="choose-province">
		<block v-for="(item, index) in list" :key="index">
			<default-list @click.native="toChooseCity(index)">
				<view slot="def-list-left">
					{{ item.name }}
				</view>
			</default-list>
		</block>
		
	</view>
</template>

<script>
	import DefaultList from '@/components/content/defaultlist/DefaultList.vue'
	import { provinceList } from "@/common/cityList.js"
	
	export default {
		components: {
			DefaultList
		},
		data() {
			return {
				list: null
			}
		},
		methods: {
			//跳转到ChooseCity
			toChooseCity(index) {
				//传选择的城市列表到ChooseCity，JSON序列化
				uni.navigateTo({
					url: "/components/content/chooseLocation/ChooseCity?cityList=" + encodeURIComponent(JSON.stringify(this.list[index].city)) + "&province=" + encodeURIComponent(JSON.stringify(this.list[index].name))
				})
			}
		},
		created() {
			this.list = provinceList
			console.log(this.list)
		}
	}
</script>

<style>
</style>
