(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/content/personalinfo/changeinfo/moreCpns/Signature"],{1754:function(n,t,e){"use strict";(function(n){e("8484"),e("921b");o(e("66fd"));var t=o(e("ef13"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},2636:function(n,t,e){},"965a":function(n,t,e){"use strict";var o,r=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"b",function(){return r}),e.d(t,"c",function(){return u}),e.d(t,"a",function(){return o})},a682:function(n,t,e){"use strict";(function(n,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=e("b3e4"),u=e("2f62");function a(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},o=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(e).filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),o.forEach(function(t){c(n,t,e[t])})}return n}function c(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var i={methods:{},data:function(){return{currentSigna:""}},computed:a({},(0,u.mapState)(["userInfo"])),created:function(){n("log","this.userInfo.user.signature:",this.userInfo.user.signature," at components\\content\\personalinfo\\changeinfo\\moreCpns\\Signature.vue:25"),this.currentSigna=this.userInfo.user.signature},onNavigationBarButtonTap:function(t){var e=this;0===t.index&&(this.currentSigna?(0,r.modifyUserInfo)({userAccount:this.userInfo.user.userAccount,modifyContent:this.currentSigna,modifyType:2}).then(function(n){200===n.status?2e3===n.data.code?(e.$set(e.userInfo.user,"signature",e.currentSigna),o.setStorageSync("userInfo",e.userInfo),o.navigateBack()):o.showToast({title:"服务器睡着了",icon:"none"}):o.showToast({title:"您可能与服务器断开连接了",icon:"none"})}).catch(function(t){o.showToast({title:"您可能与服务器断开连接了",icon:"none"}),n("log",t," at components\\content\\personalinfo\\changeinfo\\moreCpns\\Signature.vue:61")}):o.showToast({title:"内容不能为空",icon:"none"}))}};t.default=i}).call(this,e("0de9")["default"],e("6e42")["default"])},bf61:function(n,t,e){"use strict";e.r(t);var o=e("a682"),r=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=r.a},e0c1:function(n,t,e){"use strict";var o=e("2636"),r=e.n(o);r.a},ef13:function(n,t,e){"use strict";e.r(t);var o=e("965a"),r=e("bf61");for(var u in r)"default"!==u&&function(n){e.d(t,n,function(){return r[n]})}(u);e("e0c1");var a,c=e("f0c5"),i=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=i.exports}},[["1754","common/runtime","common/vendor"]]]);