(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/content/personalinfo/changeinfo/ChangeName"],{"07c1":function(n,e,t){"use strict";(function(n){t("8484"),t("921b");o(t("66fd"));var e=o(t("292d"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("6e42")["createPage"])},"145d":function(n,e,t){"use strict";t.r(e);var o=t("3829"),c=t.n(o);for(var r in o)"default"!==r&&function(n){t.d(e,n,function(){return o[n]})}(r);e["default"]=c.a},"292d":function(n,e,t){"use strict";t.r(e);var o=t("6b98"),c=t("145d");for(var r in c)"default"!==r&&function(n){t.d(e,n,function(){return c[n]})}(r);t("f206");var u,a=t("f0c5"),i=Object(a["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=i.exports},3829:function(n,e,t){"use strict";(function(n,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c=t("b3e4"),r=t("2f62");function u(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),o.forEach(function(e){a(n,e,t[e])})}return n}function a(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var i={methods:{submitName:function(e){console.log(n(e," at components\\content\\personalinfo\\changeinfo\\ChangeName.vue:19"))}},data:function(){return{currentNickName:"",userAccount:""}},computed:u({},(0,r.mapState)(["userInfo"])),onNavigationBarButtonTap:function(e){var t=this;0===e.index&&(this.currentNickName?this.currentNickName!==this.userInfo.user.nickname?(0,c.modifyUserInfo)({userAccount:this.userAccount,modifyContent:this.currentNickName,modifyType:1}).then(function(n){200===n.status?2e3===n.data.code?(t.$set(t.userInfo.user,"nickname",t.currentNickName),o.showToast({title:"成功保存",icon:"none"}),o.navigateBack()):o.showToast({title:"服务器睡着了",icon:"none"}):o.showToast({title:"您可能与服务器断开连接了",icon:"none"})}).catch(function(e){o.showToast({title:"您可能与服务器断开连接了",icon:"none"}),console.log(n(e," at components\\content\\personalinfo\\changeinfo\\ChangeName.vue:69"))}):o.navigateBack():o.showToast({title:"昵称不能为空",icon:"none"}))},created:function(){this.currentNickName=this.userInfo.user.nickname,this.userAccount=this.userInfo.user.userAccount}};e.default=i}).call(this,t("0de9")["default"],t("6e42")["default"])},"3f28":function(n,e,t){},"6b98":function(n,e,t){"use strict";var o,c=function(){var n=this,e=n.$createElement;n._self._c},r=[];t.d(e,"b",function(){return c}),t.d(e,"c",function(){return r}),t.d(e,"a",function(){return o})},f206:function(n,e,t){"use strict";var o=t("3f28"),c=t.n(o);c.a}},[["07c1","common/runtime","common/vendor"]]]);