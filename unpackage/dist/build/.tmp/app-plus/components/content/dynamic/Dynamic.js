(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/content/dynamic/Dynamic"],{"136d":function(n,t,e){"use strict";var c=e("c154"),o=e.n(c);o.a},"29dd":function(n,t,e){"use strict";(function(n,c){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=e("3389"),a=function(){return Promise.all([e.e("common/vendor"),e.e("components/content/dynamic/dynamicCpns/DynamicCon")]).then(e.bind(null,"72df"))},i={components:{DynamicCon:a},data:function(){return{hackReset:!0,dynamicList:null,userAccount:null}},methods:{getNewestDynamic:function(){var t=this;console.log(n("?account=".concat(this.userAccount)," at components\\content\\dynamic\\Dynamic.vue:27")),(0,o.getNewestDynamicRequest)("?account=".concat(this.userAccount)).then(function(e){console.log(n(e," at components\\content\\dynamic\\Dynamic.vue:29")),200===e.status?2e3===e.data.code?(t.dynamicList=e.data.data,console.log(n(t.dynamicList," at components\\content\\dynamic\\Dynamic.vue:33"))):c.showToast({title:"服务器出错了",icon:"none"}):c.showToast({title:"您可能与服务器断开连接了",icon:"none"})}).catch(function(t){console.log(n(t," at components\\content\\dynamic\\Dynamic.vue:47"))})}},onReachBottom:function(){console.log(n("滚动到底部，朋友动态第一页已展示完毕，开始请求第二页数据"," at components\\content\\dynamic\\Dynamic.vue:53"))},onNavigationBarButtonTap:function(n){0===n.index&&c.navigateTo({url:"/components/content/publish/Publish"})},onLoad:function(){this.getNewestDynamic()},onShow:function(){var t=this;c.$on("updateDynamicList",function(){console.log(n("updateDynamicList"," at components\\content\\dynamic\\Dynamic.vue:68")),t.getNewestDynamic(),t.hackReset=!1,t.$nextTick(function(){this.hackReset=!0})})},created:function(){var n=c.getStorageSync("userInfo");this.userAccount=n.user.userAccount}};t.default=i}).call(this,e("0de9")["default"],e("6e42")["default"])},3493:function(n,t,e){"use strict";e.r(t);var c=e("b89d"),o=e("ee8a");for(var a in o)"default"!==a&&function(n){e.d(t,n,function(){return o[n]})}(a);e("136d");var i,u=e("f0c5"),s=Object(u["a"])(o["default"],c["b"],c["c"],!1,null,null,null,!1,c["a"],i);t["default"]=s.exports},a37b:function(n,t,e){"use strict";(function(n){e("8484"),e("921b");c(e("66fd"));var t=c(e("3493"));function c(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},b89d:function(n,t,e){"use strict";var c,o=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"b",function(){return o}),e.d(t,"c",function(){return a}),e.d(t,"a",function(){return c})},c154:function(n,t,e){},ee8a:function(n,t,e){"use strict";e.r(t);var c=e("29dd"),o=e.n(c);for(var a in c)"default"!==a&&function(n){e.d(t,n,function(){return c[n]})}(a);t["default"]=o.a}},[["a37b","common/runtime","common/vendor"]]]);