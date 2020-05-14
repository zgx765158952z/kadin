//#ifdef APP-PLUS
import {
	openDB,
	createTable,
	insertData,
	selectData,
	transactionDB,
	deleteData,
	closeDB
} from '@/common/sqlite.js'

import { 
	name,
	path,
	rawMsg_tablename
} from '@/common/sqlConfig.js' 

import store from '@/vuex/store.js'

// IM数据存取方法
//初始化本地数据库,打开数据库,创建数据表
function initiLocalDB(account) {
	openDB().then(res => {
		//原始消息数据表名
		const tablename = rawMsg_tablename + '_' + account
		deleteData(`drop table ${tablename}`).then(res => {
			console.log('删除数据表成功:', res)
		}).catch(err => {
			console.log('删除数据表失败:', err)
		})
		let create_sql = `CREATE TABLE ${tablename} (
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			time CHAR,
			userUpdateTime CHAR, 
			sessionId CHAR, 
			flow CHAR, 
			scene CHAR, 
			'from' CHAR, 
			'to' CHAR, 
			target CHAR, 
			type CHAR, 
			text TEXT, 
			status CHAR, 
			fromClientType CHAR, 
			fromNick CHAR, 
			idClient VARCHAR, 
			idServer CHAR, 
			custom CHAR, 
			cc INTEGER, 
			isHistoryable INTEGER, 
			isLocal INTEGER, 
			isOfflinable INTEGER, 
			isPushable INTEGER, 
			isReplyMsg INTEGER, 
			isRoamingable INTEGER, 
			isSyncable INTEGER, 
			isUnreadable INTEGER, 
			needMsgReceipt INTEGER, 
			needPushNick INTEGER
		)`
		createTable(tablename, create_sql).then(res2 => { //没有数据表则创建
			
		}).catch(err2 => {
			console.log(err2)
		})
	}).catch(err => {
	})
}

//查询并获取原始消息记录 rawMsgCount获取原始消息数量 first表示第一次查询
function getRawMsg(account, sessionId, rawMsgCount=20, first=true) {
	//原始历史记录表名
	const tablename = rawMsg_tablename + '_' + account
	//获取指定原始聊天记录
	const select_sql = `select * from ${tablename} where sessionId='${sessionId}' order by time desc limit ${rawMsgCount}`
	selectData( tablename, select_sql ).then(res => {
		if(first) {
			try {
				store.commit({
					type: 'appendRawMessageList',
					data: formatRawMsg(res),
					sessionId
				})
			}catch(e) {
				console.log(e)
			}
		}
	}).catch(err => {
	})
}

//插入一条原始消息记录数据
function insertOneRawMsg(account, msg) {
	const tablename = rawMsg_tablename + '_' + account
	let insert_sql_arr = ''
	//判断msg是字符串还是[]---1.[]需要批量插入 2.字符串直接插入
	if(msg && msg.length>0) {
		console.log('这是数组')
		transactionDB('begin').then(res => {
			try {
				msg.map(item => {
					insert_sql_arr = `insert into ${tablename} values (
						null,
						${item.time},
						${item.userUpdateTime},
						'${item.sessionId}',
						'${item.flow}',
						'${item.scene}',
						'${item.from}',
						'${item.to}',
						'${item.target}',
						'${item.type}',
						'${item.text}',
						'${item.status}',
						'${item.fromClientType}',
						'${item.fromNick}',
						'${item.idClient}',
						'${item.idServer}',
						'${item.custom}',
						${item.cc ? 1 : 0 },
						${item.isHistoryable ? 1 : 0 },
						${item.isLocal ? 1 : 0 },
						${item.isOfflinable ? 1 : 0 },
						${item.isPushable ? 1 : 0 },
						${item.isReplyMsg ? 1 : 0 },
						${item.isRoamingable ? 1 : 0 },
						${item.isSyncable ? 1 : 0 },
						${item.isUnreadable ? 1 : 0 },
						${item.needMsgReceipt ? 1 : 0 },
						${item.needPushNick ? 1 : 0 }
					)`
					insertData(tablename, insert_sql_arr).then(res => {
					}).catch(err => {
					})
				})
				transactionDB('commit').then(res => {
					console.log('数据批量插入完毕,关闭事务')
				})
			}catch(e) {
				console.log('插入数据失败,执行回滚:', e)
				transactionDB('rollback').then(res => {
					console.log('数据回滚成功')
				})
			}
		})
		
		
	}else {
		console.log('这是字符串')
		insert_sql_arr = `insert into ${tablename} values (
			null,
			${msg.time},
			${msg.userUpdateTime},
			'${msg.sessionId}',
			'${msg.flow}',
			'${msg.scene}',
			'${msg.from}',
			'${msg.to}',
			'${msg.target}',
			'${msg.type}',
			'${msg.text}',
			'${msg.status}',
			'${msg.fromClientType}',
			'${msg.fromNick}',
			'${msg.idClient}',
			'${msg.idServer}',
			'${msg.custom}',
			${msg.cc ? 1 : 0 },
			${msg.isHistoryable ? 1 : 0 },
			${msg.isLocal ? 1 : 0 },
			${msg.isOfflinable ? 1 : 0 },
			${msg.isPushable ? 1 : 0 },
			${msg.isReplyMsg ? 1 : 0 },
			${msg.isRoamingable ? 1 : 0 },
			${msg.isSyncable ? 1 : 0 },
			${msg.isUnreadable ? 1 : 0 },
			${msg.needMsgReceipt ? 1 : 0 },
			${msg.needPushNick ? 1 : 0 }
		)`
		insertData(tablename, insert_sql_arr).then(res => {
		}).catch(err => {
		})
	}
	console.log('insert_sql_arr:', insert_sql_arr)
	
}

//获取单个sessionId的历史记录列表后,格式化成rawMessageList
function formatRawMsg(rawMsgList) {
	let obj = {} //{timeStamp1: {from, to, ....}, timeStamp2: {from, to, ....}}
	for(let i=rawMsgList.length-1; i>0; i--) {
		obj[rawMsgList[i].time] = rawMsgList[i]
	}
	return obj
}



export {
	initiLocalDB,
	getRawMsg,
	insertOneRawMsg,
	formatRawMsg
}

//#endif