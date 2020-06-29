
// #ifdef APP-PLUS
import { name, path } from "@/common/sqlConfig.js"


/**  SQLite 数据库操作  **/ 
//打开数据库 
function openDB() {
	return new Promise((resolve, reject) => {
		//需要提前判断数据库是否打开状态
		if(!plus.sqlite.isOpenDatabase({name, path})) {
			plus.sqlite.openDatabase({
				name,
				path,
				success: res => {
					console.log(`${name}-----打开数据库成功`)
					resolve(true)
				},
				fail: err => {
					console.log(`${name}-----打开数据库失败`)
					reject(false)
				}
			})
		}else {
			console.log(`${name}-----数据库已经打开`)
			resolve(true)
		}
	})
	
	
}


// 执行SQL语句
			 
 // id:你自己起的字段名字
 // int:数据类型，整型,
 // primary key:定义这个字段为主键,
 // auto_increment(AUTOINCREMENT):定义这个字段为自动增长, 插入NULL可让其自增，既如果INSERT时不赋值，则自动加1

//创建数据表
function createTable(table_name, sql) {
	return new Promise((resolve, reject) => {
		plus.sqlite.selectSql({
			name,
			sql: `select * from ${table_name} where id=1`,
			success: res => {
				console.log(`${table_name}-----该数据表第一个数据为:`, res)
				resolve(true)
			},
			fail: err => {
				console.log(`${table_name}-----无数据表,开始创建---`)
				plus.sqlite.executeSql({
					name,
					sql,
					success: res => {
						console.log(`${table_name}-----数据表创建成功`, res)
						resolve(true)
					},
					fail: err => {
						console.log(`${table_name}-----数据表创建失败`, err)
						reject(false)
					}
				})
			}
		})
	})
	
}


//在数据表中插入数据(历史记录)
// name:数据库名 account:帐号  data:数据
function insertData(table_name, sql) {
	return new Promise((resolve, reject) => {
		plus.sqlite.executeSql({
			name,
			sql,
			success: res => {
				console.log(`${name}-----插入数据成功`, res)
				resolve(res)
			},
			fail: err => {
				console.log(`${name}-----插入数据失败`, err)
				reject(err)
			}
		})
	})
	
}

//查询数据表
function selectData(table_name, sql) {
	return new Promise((resolve, reject) => {
		plus.sqlite.selectSql({
			name,
			sql,
			success: res => {
				console.log(`${name}-----查询数据表为:`, res)
				resolve(res)
			},
			fail: err => {
				console.log(`${name}-----查询数据表失败:`, err)
				reject(err)
			}
		})
	})
	
	
}

//执行事务
function transactionDB(operation) {
	return new Promise((resolve, reject) => {
		plus.sqlite.transaction({
			name,
			operation,
			success: res => {
				console.log(`${name}-----${operation}执行事务成功`, res)
				resolve(true)
			},
			fail: err => {
				console.log(`${name}-----${operation}执行事务错误`, err)
				reject(false)
			}
		})
	})
	
}
//删除数据表或数据
function deleteData(sql) {
	return new Promise((resolve, reject) => {
		plus.sqlite.executeSql({
			name,
			sql,
			success: res => {
				console.log(`${name}-----删除数据表/数据成功:`, res)
				resolve(res)
			},
			fail: err => {
				console.log(`${name}-----删除数据表/数据失败:`, err)
				reject(err)
			}
		})
	})
}

//关闭数据库
function closeDB() {
	return new Promise((resolve, reject) => {
		plus.sqlite.closeDatabase({
			name,
			success: res => {
				console.log(`${name}-----关闭数据库成功`)
				resolve(true)
			},
			fail: err => {
				console.log(`${name}-----关闭数据库失败`, err)
				reject(false)
			}
		})
	})
}

export {
	openDB,
	createTable,
	insertData,
	selectData,
	transactionDB,
	deleteData,
	closeDB
}

// #endif