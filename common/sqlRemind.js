//#ifdef APP-PLUS
import { 
	insertData,
	selectData,
	transactionDB
} from '@/common/sqlite.js'

import { 
	name,
	path,
	remind_tablename
} from '@/common/sqlConfig.js' 

import { formatToTimeStamp 
} from '@/common/index.js'

//获取所有未完成的事项提醒任务
function getAllRemindInfos(account) {
	return new Promise((resolve, reject) => {
		const tablename = remind_tablename + '_' + account
		const sql = `select * from ${tablename} where remindStatus='1' order by current_time desc`
		selectData(tablename, sql).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

//获取部分已完成的事项提醒任务
function getSomeRemindInfos() {
	
}

//插入一条事项提醒
function insertRemindInfo(account, data) {
	return new Promise((resolve, reject) => {
		const tablename = remind_tablename + '_' + account
		const date = new Date()
		const currentTime = date.getTime()
		//被提醒人列表转成字符串
		const remindPerson = JSON.stringify(data.remindPerson)
		let sql = `insert into ${tablename} values(
			null,
			'${currentTime}',
			'${account}',
			'${data.remindTitle}',
			'${data.remindContent}',
			'${data.remindTime}',
			'${data.remindTimeType}',
			'${data.remindLocation?data.remindLocation: 0}',
			'${remindPerson}',
			'${data.remindTag}',
			'1',
			'${data.fatherId?data.fatherId : 0}',
			${data.isMasterTask},
			0
		)`
		console.log('sql', sql)
		insertData(tablename, sql).then(res => {
			let selectSql = `select * from ${tablename} where create_time='${currentTime}'`
			selectData(tablename, selectSql).then(res1 => {
				resolve(res1) //返回刚创建的父任务
			})
			
		}).catch(err => {
			reject(err)
		})
	})
}

//插入多条条事项提醒
function insertManyRemindInfo(account, list, fatherId) {
	return new Promise((resolve, reject) => {
		transactionDB('begin').then(res => {
			const tablename = remind_tablename + '_' + account
			const date = new Date()
			const currentTime = date.getTime()
			for(let i=1; i<list.length; i++) {
				let remindPerson = JSON.stringify(list[i].remindPerson)
				const sql = `insert into ${tablename} values(
					null,
					'${currentTime}',
					'${list[i].remindAccount}',
					'${list[i].remindTitle}',
					'${list[i].remindContent}',
					'${list[i].remindTime}',
					'${list[i].remindTimeType}',
					'${list[i].remindLocation}',
					'${remindPerson}',
					'${list[i].remindTag}',
					'1',
					${fatherId},
					${list[i].isMasterTask},
					${i}
				)`
				insertData(tablename, sql).then(res => {
					if(i == (list.length-1)) {
						transactionDB('commit').then(res2 => {
							resolve(true)
						})
					}
				}).catch(err => {
					transactionDB('rollback').then(res => {
						reject(false)
						return
					})
				})
			}
			
		})
	})
	
}

//整理数据
function appendData(data) {
	let list = Object.assign([], data)
	for(let i=0; i<list.length; i++) {
		list[i].remindTime = formatToTimeStamp(Number(list[i].remindTime))
		list[i].remindPerson = JSON.parse(list[i].remindPerson)
		list[i].expanded = false  //默认未展开
	}
	return list
}

//查询新添加的事项提醒任务并更新数据
function addNewRemindInfo(account, count) {
	return new Promise((resolve, reject) => {
		const tablename = remind_tablename + '_' + account
		const sql = `select * from ${tablename} order by create_time desc limit ${count}`
		selectData(tablename, sql).then(res => {
			resolve(res)
		})
	})
}



function myCycleTime(timeStamp=1591941896840, frequency='everyDay', id=1) {
	
	
	var _this = this
	
	console.log('开始定时', _this.globalData.remindTask)
	let intervalId = null
	switch(frequency) {
		case 'everyDay':
			intervalId =  setInterval(() => {
				let date = new Date()
				let currentTime = date.getTime()
				let differenceTime = Math.abs(currentTime-timeStamp)
				let lastTime = 0
				lastTime = differenceTime % 86400000 //取余数
				if(currentTime > timeStamp) {
					lastTime = 86400000 - lastTime
				}else {
					if(differenceTime > 14400000) { //大于4小时就没必要计时了
						clearInterval(intervalId)
						console.log('大于4小时不设置')
						return
					}
				}
				console.log(`lastTime: ${lastTime}; 还有${lastTime/1000}秒>>>${intervalId}`)
				if(lastTime <= 10000) {
					setTimeout(() => {
						clearInterval(intervalId)
						console.log('时间到了,清除定时器')
					}, lastTime)
				}
			}, 10000)
			// 86400000为24小时/一天的时间戳
			break
	}
	
}

export {
	insertRemindInfo,
	insertManyRemindInfo,
	getAllRemindInfos,
	appendData,
	addNewRemindInfo,
	myCycleTime
}

//#endif