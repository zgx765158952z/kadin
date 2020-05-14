//请求BASEURL
const baseUrl = 'http://192.168.1.138:9090';

//图片URL
const imgBaseUrl = "http://192.168.1.176/";

const headers = {
	'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
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
	http_config
}