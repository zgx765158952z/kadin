// #ifdef APP-PLUS
/**** 存储数据配置 ****/



//数据库名
const name = 'kadin_sqlite' //数据库名
const path = '_doc/kadin_sqlite.db' //数据库路径

//原始聊天记录的数据表名,后接账号
let rawMsg_tablename = 'rawMsgList'
//事项提醒的数据表名，后接账号
let remind_tablename = 'remindInfos'

export {
	name,
	path,
	rawMsg_tablename,
	remind_tablename
}

// #endif
