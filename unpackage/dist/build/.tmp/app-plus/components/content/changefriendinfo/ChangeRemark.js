(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/content/changefriendinfo/ChangeRemark"],{"0a93":function(n,e,t){},"8d61":function(n,e,t){"use strict";t.r(e);var o=t("9053"),i=t.n(o);for(var a in o)"default"!==a&&function(n){t.d(e,n,function(){return o[n]})}(a);e["default"]=i.a},9053:function(n,e,t){"use strict";(function(n,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=t("42c5"),a=t("2f62");function r(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),o.forEach(function(e){c(n,e,t[e])})}return n}function c(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var f={data:function(){return{friendInfo:{},changeInfo:{},isShowInput1:!1,isShowInput3:!1}},computed:r({},(0,a.mapState)(["userInfo","friendList"])),methods:{getMyFriendInfo:function(e){var t=this;(0,i.getMyFriendInfoRequest)("?account=".concat(this.userInfo.user.userAccount,"&friendAccount=").concat(e)).then(function(e){if(n("log",e," at components\\content\\changefriendinfo\\ChangeRemark.vue:86"),200===e.status)if(2e3===e.data.code){var i=e.data.data;t.friendInfo=i;var a={friendAccount:i.friendAccount,remarkName:i.remarkName,friendDescribe:i.friendDescribe,friendLabelList:i.friendLabelList,friendPhoneList:i.friendPhoneList};"null"===t.friendInfo.friendDescribe&&(t.friendInfo.friendDescribe=null,a.friendDescribe=null),""===t.friendInfo.friendPhoneList[0]&&(t.friendInfo.friendPhoneList=[],a.friendPhoneList=[]),t.changeInfo=a,t.changeInfo.friendPhoneList.push(""),n("log",t.changeInfo.friendPhoneList," at components\\content\\changefriendinfo\\ChangeRemark.vue:118")}else o.showToast({title:"程序走丢了,请稍后重试",icon:"none"});else 404===e.status?o.showToast({title:"网络走丢了,请稍后重试",icon:"none"}):o.showToast({title:"程序走丢了,请稍后重试",icon:"none"})}).catch(function(e){n("log",e," at components\\content\\changefriendinfo\\ChangeRemark.vue:138"),o.showToast({title:"程序走丢了,请稍后重试",icon:"none"})})},addingPhone:function(e){var t=e.currentTarget.dataset.index,o=this.changeInfo.friendPhoneList.length-1,i=this.changeInfo.friendPhoneList[this.changeInfo.friendPhoneList.length-1];n("log","this.changeInfo.friendPhoneList:",this.changeInfo.friendPhoneList," at components\\content\\changefriendinfo\\ChangeRemark.vue:153"),n("log","this.friendInfo.friendPhoneList:",this.friendInfo.friendPhoneList," at components\\content\\changefriendinfo\\ChangeRemark.vue:154"),t===o?""!==i&&(n("log","添加空字符串"," at components\\content\\changefriendinfo\\ChangeRemark.vue:159"),this.changeInfo.friendPhoneList.push("")):""===e.detail.value&&this.changeInfo.friendPhoneList.splice(t,1)},delPhoneList:function(n){this.changeInfo.friendPhoneList.splice(n,1)},updateFriendInfo:function(){var e=this.changeInfo;e["myAccount"]=this.userInfo.user.userAccount,e.friendPhoneList.splice(-1,1),n("log","将要修改的好友信息：",e," at components\\content\\changefriendinfo\\ChangeRemark.vue:179"),e.remarkName?(0,i.updateFriendInfoRequest)(e).then(function(e){n("log",e," at components\\content\\changefriendinfo\\ChangeRemark.vue:182"),200===e.status?2e3===e.data.code?(o.$emit("changeFriendInfo",{}),o.$emit("updateFriendList",{}),o.navigateBack()):o.showToast({title:"程序走丢了，请稍后重试",icon:"none"}):404===e.status?o.showToast({title:"网络走丢了，请稍后重试",icon:"none"}):o.showToast({title:"程序走丢了，请稍后重试",icon:"none"})}).catch(function(e){o.showToast({title:"程序走丢了，请稍后重试",icon:"none"}),n("log",e," at components\\content\\changefriendinfo\\ChangeRemark.vue:213")}):o.showToast({title:"请输入正确备注名",icon:"none"})},friendInfoHasChange:function(){var e=this.changeInfo,t=this.friendInfo;return e.friendPhoneList.splice(-1,1),n("log",this.changeInfo.friendPhoneList,this.friendInfo.friendPhoneList," at components\\content\\changefriendinfo\\ChangeRemark.vue:232"),e.friendDescribe!==t.friendDescribe||e.friendLabelList!==t.friendLabelList||e.friendPhoneList!==t.friendPhoneList||e.remarkName!==t.remarkName},delRemarkVal:function(){var n=this;this.$nextTick(function(){n.changeInfo.remarkName=""})},delDescribeVal:function(){this.changeInfo.friendDescribe&&(this.changeInfo.friendDescribe="")},focusInput1:function(n){this.isShowInput1=!0},focusInput3:function(n){this.isShowInput3=!0},blurInput1:function(){var n=this;setTimeout(function(){n.isShowInput1=!1},80)},blurInput3:function(){var n=this;setTimeout(function(){n.isShowInput3=!1},80)},toChangeLabel:function(){var n=this.changeInfo.friendLabelList,e=this.friendInfo.allLabelList;o.navigateTo({url:"/components/content/changefriendinfo/ChangeLabel",success:function(t){o.setStorageSync("friendLabelList",n),o.setStorageSync("allLabelList",e)}})}},onBackPress:function(e){var t=this;return"navigateBack"!==e.from&&("backbutton"===e.from&&o.showModal({title:"提示",content:"是否保存修改",success:function(e){e.confirm?t.updateFriendInfo():e.cancel&&(n("log","取消修改"," at components\\content\\changefriendinfo\\ChangeRemark.vue:303"),o.navigateBack())}}),!0)},onNavigationBarButtonTap:function(e){0===e.index&&(n("log","完成"," at components\\content\\changefriendinfo\\ChangeRemark.vue:315"),this.updateFriendInfo())},onLoad:function(e){var t=this;if(e.friendAccount){var i=e.friendAccount;this.getMyFriendInfo(i)}o.$on("saveFriendInfoLabel",function(e){n("log",e," at components\\content\\changefriendinfo\\ChangeRemark.vue:328"),t.changeInfo.friendLabelList=e.friendLabelList})}};e.default=f}).call(this,t("0de9")["default"],t("6e42")["default"])},9241:function(n,e,t){"use strict";var o=t("0a93"),i=t.n(o);i.a},b813:function(n,e,t){"use strict";var o,i=function(){var n=this,e=n.$createElement;n._self._c},a=[];t.d(e,"b",function(){return i}),t.d(e,"c",function(){return a}),t.d(e,"a",function(){return o})},defa:function(n,e,t){"use strict";(function(n){t("8484"),t("921b");o(t("66fd"));var e=o(t("e328"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("6e42")["createPage"])},e328:function(n,e,t){"use strict";t.r(e);var o=t("b813"),i=t("8d61");for(var a in i)"default"!==a&&function(n){t.d(e,n,function(){return i[n]})}(a);t("9241");var r,c=t("f0c5"),f=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=f.exports}},[["defa","common/runtime","common/vendor"]]]);