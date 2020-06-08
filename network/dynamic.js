import { http } from '@/network/http.js'
import { publish_upload } from '@/common/helper.js'
import { uploadFile } from '@/common/index.js'

//获取朋友动态列表
function getNewestDynamicRequest(data) {
	return http({
		method: 'get',
		url: `/circle/browseFriendCircle?account=${data.account}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
		timeout: 20000
	})
}

//获取个人的动态列表
function getMyDynamicRequest(params) {
	return http.get('/circle/browseMyFriendCircle' + params)
}

//获取某个朋友动态的列表
function getPersonDynamicRequest(data) {
	return http.get(`/circle/browseOtherFriendCircle?account=${data.account}&pageNum=${data.pageNum}&pageSize=${pageSize}` + params)
}

//发表仅文字的朋友圈
function doPublishDynamicRequest(data) {
	return http({
		headers: {
			"Content-Type": "application/json"
		},
		method: 'post',
		url: '/circle/postMoments',
		data
	})
}

//上传图片(可多张)
function dynamicUploadImage(imgList) {
	const promises = imgList.map(item => {
		return uploadFile(publish_upload, item)
	})
	// Promise.all(promises).then(res => {
	// 	console.log('批量上传图片:', res)
	// 	let newImgList = []
	// 	res.forEach(item => {
	// 		let data = JSON.parse(item.data)
	// 		if(item.statusCode === 200 && data.code === 2000) {
	// 			console.log('上传成功:', data.data)
	// 			newImgList.push(data.data)
	// 		}
	// 	})
	// 	return newImgList
	// })
	
	return Promise.all(promises)
}

//评论
function doCommentRequest(data) {
	return http({
		headers: {
			"Content-Type": "application/json"
		},
		method: 'post',
		url: '/circle/comment',
		data
	})
}


//点赞
function doDynamicLikeRequest(data) {
	return http({
		headers: {
			"Content-Type": "application/json"
		},
		method: 'post',
		url: '/circle/friendCircleLike',
		data,
	})
}

////获取与我相关的点赞与评论信息
function getLikeCommentInfoRequest(data) {
	return http.get('/circle/getLikeCommentInfo?account=' + data)
}

//浏览单个动态
function browseFriendCircleOneRequest(data) {
	return http.get(`/circle/browseFriendCircleOne?account=${data.account}&friendCircleId=${data.friendCircleId}`)
}

module.exports = {
	doDynamicLikeRequest,
	getNewestDynamicRequest,
	getMyDynamicRequest,
	getPersonDynamicRequest,
	doPublishDynamicRequest,
	dynamicUploadImage,
	doCommentRequest,
	doDynamicLikeRequest,
	getLikeCommentInfoRequest,
	browseFriendCircleOneRequest
}