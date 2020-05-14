import Vue from 'vue'
import App from './App'
import store from './vuex/store.js'
import toast from '@/common/toast.js'

//引入公共js
// import '@/common/myjs.js'

//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$toast = toast

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
