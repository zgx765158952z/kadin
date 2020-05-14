let envir = 'online'
let ENVIRONMENT_CONFIG = {}

let configMap = {
	online: {
		appkey: 'a59ba9fafb323c6fcc49a5cbf48d369a'
	}
}


ENVIRONMENT_CONFIG = configMap[envir]

//是否开启私有化部署
ENVIRONMENT_CONFIG.openPrivateConf = false

module.exports = ENVIRONMENT_CONFIG