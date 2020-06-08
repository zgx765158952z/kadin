//请求BASEURL
const baseUrl = 'http://192.168.1.137:9090';

//图片URL
const imgBaseUrl = "http://39.108.212.170/";

const headers = {
	'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
}
const publish_upload = {
	name: 'multipartFile',
	url: baseUrl + '/fastDFS/uploadImage'
}

//请求默认参数config
const http_config = {
	baseURL: baseUrl,
	timeout: 5000,
	// #ifdef H5
	withCredentials: true,
	// #endif
	headers
}

export { 
	baseUrl,
	imgBaseUrl,
	publish_upload,
	http_config
}