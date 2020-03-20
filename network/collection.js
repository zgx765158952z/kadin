import { http } from '@/network/http.js'

//获取所有收藏
export function browseMyCollectRequest(params) {
	return http.get('/myCollect/browseMyCollect' + params)
}

//添加收藏
export function addMyCollectRequest(params) {
	return http.post('/myCollect/AddMyCollect', params)
}

//删除收藏
export function delMyCollectRequest(params) {
	return http.delete('/myCollect/deleteCollect'+params)
}

//根据文件类型搜索收藏
export function queryCollectByTypeRequest(params) {
	return http.get('/myCollect/queryCollectByType' + params)
}

//根据标签搜索收藏
export function queryCollectByLabelRequest(params) {
	return http.get('/myCollect/queryCollectByLabel' + params)
}
