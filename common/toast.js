//响应参数提示
function showRes(res) {
	console.log(res)
	if(res.status === 200) {
		if(res.data.code !== 2000) {
			uni.showToast({ title: '程序走丢了,请稍后重试', icon: 'none' })
		}
	}else if(res.status === 404) {
		uni.showToast({ title: '网络走丢了,请稍后重试', icon: 'none' })
	}else {
		uni.showToast({ title: '程序走丢了,请稍后重试', icon: 'none' })
	}
}

//catch错误响应
function showErr(err) {
	console.log(err)
	uni.showToast({ title: '程序走丢了,请稍后重试', icon: 'none' })
}

module.exports = {
	showRes,
	showErr
}