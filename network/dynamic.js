import { http } from '@/network/http.js'



//获取朋友动态列表
export function getNewestDynamicRequest(params) {
	return http.get('/circle/browseFriendCircle'+ params)
}

//获取个人的动态列表
export function getMyDynamicRequest(params) {
	return http.get('/circle/browseMyFriendCircle' + params)
}

//获取某个朋友动态的列表
export function getPersonDynamicRequest(params) {
	return http.get('/circle/browseOtherFriendCircle' + params)
}

//发动态
export function doPublishDynamic(params) {
	return http.post('/circle/postMoments', params)
}


//评论
export function doCommentRequest(params) {
	return http.post('/circle/comment', params)
}


//点赞
export function doDynamicLikeRequest(params) {
	return http.post('/circle/friendCircleLike', params)
}
