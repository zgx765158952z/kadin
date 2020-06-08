"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = require("utility");
var helper_1 = require("./helper");
var pkg = require('../package.json');
var Queue = []; // 消息队列
var Pool = {}; // Promise池
var IsOpen = false; // 是否打开,socket只会open一次哦
var IsClose = false; // 是否是主动关闭
var heartTimer = null; // 心跳句柄
var reConnectTimer = null; // 重连句柄
var IsLogin = false; // 是否登录,区别IsOpen
var PromiseWebSocket = /** @class */ (function () {
    function PromiseWebSocket(config) {
        var _this = this;
        this.config = __assign({
            debug: process.env.NODE_ENV === "development",
            isReconnect: true,
            isHeartData: true,
            heartTime: 3000,
            reConnectTime: 3000
        }, config);
        // 初始化
        this.initSocket = function (success, fail) {
            if (IsLogin) {
                _this.config.debug && console.log("%c [uni-socket-promise] %c 已经登录了", 'color:red;', 'color:#000;');
                typeof success === "function" && success(_this);
                return;
            }
            // @ts-ignore
            uni.connectSocket({
                url: _this.config.url,
                method: _this.config.method,
                header: _this.config.header,
                protocols: _this.config.protocols,
                success: function () {
                    _this.config.debug && console.log("%c [uni-socket-promise] %c 连接成功", 'color:red;', 'color:#000;');
                    typeof success === "function" && success(_this);
                },
                fail: function (err) {
                    _this.config.debug && console.log("%c [uni-socket-promise] %c 连接失败", 'color:red;', 'color:#000;');
                    typeof fail === "function" && fail(err, _this);
                },
                complete: function () {
                    console.log("%c " + pkg.name + "@v" + pkg.version + " %c \u6B22\u8FCE\u4F7F\u7528,\u6EE1\u610F\u7684\u8BDD\u6253\u4E2A\u8D4F\u5457 https://gitee.com/okcoder/uni-socket-promise %c", 'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff', 'background:transparent');
                }
            });
        };
        // 发送socket消息
        this.send = function (event, data) {
            if (typeof _this.config.onSendMessageBefore === 'function') {
                var res = _this.config.onSendMessageBefore({ event: event, data: data });
                event = res.event;
                data = res.data;
            }
            var uuid = utility_1.md5(event + (helper_1.isJson(data) ? JSON.stringify(data) : data));
            return new Promise(function (resolve, reject) {
                // 一摸一样的请求只响应第一次
                // 过滤了socket队列,否则队列重发送消息无法收到
                if (!Pool[uuid]) {
                    Pool[uuid] = { data: data, resolve: resolve, reject: reject, event: event };
                }
                if (!IsOpen) {
                    // 加入队列
                    Queue.push({ uuid: uuid, event: event, data: data });
                    _this.config.debug && console.log("%c [uni-socket-promise] %c 加入消息队列", 'color:red;', 'color:#000;', event, data);
                }
                else {
                    _this.config.debug && console.log("%c [uni-socket-promise] %c 发送消息:", 'color:red;', 'color:#000;', event, data);
                    // @ts-ignore
                    _this._sendSocketMessage({ event: event, data: data });
                    typeof _this.config.onSendMessageAfter === 'function' && _this.config.onSendMessageAfter({ event: event, data: data });
                }
            });
        };
        // 主动关闭
        this.close = function (option) {
            // 目前还不清楚Z主动退出socket会不会导致open关闭 暂时默认不关闭
            // IsOpen = false;
            IsLogin = false;
            // 主动退出
            IsClose = true;
            if (_this.config.isHeartData) {
                _this.config.debug && console.log("%c [uni-socket-promise] %c 关闭心跳", 'color:red;', 'color:#000;');
                _this._clearHeart();
            }
            // @ts-ignore
            uni.closeSocket(option);
            _this.config.debug && console.log("%c [uni-socket-promise] %c 主动退出", 'color:red;', 'color:#000;');
        };
        // 监听socket是否打开成功
        // @ts-ignore
        uni.onSocketOpen(function (header) {
            _this.config.debug && console.log("%c [uni-socket-promise] %c socket打开成功", 'color:red;', 'color:#000;');
            typeof _this.config.onSocketOpen === "function" && _this.config.onSocketOpen(header);
            IsOpen = true;
            IsLogin = true;
            // 判断是否需要发送心跳包
            if (_this.config.isHeartData) {
                _this.config.debug && console.log("%c [uni-socket-promise] %c 开始心跳", 'color:red;', 'color:#000;');
                _this._clearHeart();
                _this._startHeart();
            }
            var _loop_1 = function (i) {
                _this.config.debug && console.log("%c [uni-socket-promise] %c 发送队列消息:" + Queue[i].event, 'color:red;', 'color:#000;');
                var uuid = Queue[i].uuid;
                _this.send(Queue[i].event, Queue[i].data).then(function (response) {
                    Pool[uuid].resolve(response);
                });
            };
            // 发送消息队列消息
            for (var i = 0; i < Queue.length; i++) {
                _loop_1(i);
            }
            Queue = [];
        });
        // @ts-ignore
        uni.onSocketMessage(function (e) {
            if (typeof _this.config.onSocketMessageBefore === 'function') {
                return _this.config.onSocketMessageBefore(e);
            }
            var json = helper_1.isJson(e.data);
            var uuid = json['event'];
            if (!json || !uuid || !Pool[uuid])
                return;
            _this.config.debug && console.log("%c [uni-socket-promise] %c 收到消息:", 'color:red;', 'color:#000;', json['data']);
            var data = json['data'] || null;
            if (typeof _this.config.onSocketMessageAfter === 'function') {
                data = _this.config.onSocketMessageAfter(data);
            }
            Pool[uuid].resolve(data);
        });
        // 监听socket被关闭
        // @ts-ignore
        uni.onSocketClose(function (res) {
            _this.config.debug && console.log("%c [uni-socket-promise] %c 连接被关闭", 'color:red;', 'color:#000;', res);
            typeof _this.config.onSocketClose === 'function' && _this.config.onSocketClose(res);
            IsLogin = false;
            // 停止心跳检查
            if (_this.config.isHeartData) {
                _this.config.debug && console.log("%c [uni-socket-promise] %c 关闭心跳", 'color:red;', 'color:#000;');
                _this._clearHeart();
            }
            if (!IsClose && _this.config.isReconnect) {
                // 断线重连
                _this._reConnectSocket();
            }
        });
        // 监听socket错误
        // @ts-ignore
        uni.onSocketError(function (res) {
            _this.config.debug && console.log("%c [uni-socket-promise] %c socket出错", 'color:red;', 'color:#000;', res);
            // 目前还不清楚socket出错会不会导致open关闭 暂时默认不关闭
            //IsOpen = false; 
            IsLogin = false;
            if (_this.config.isReconnect) {
                _this.initSocket();
            }
            typeof _this.config.onSocketError === "function" && _this.config.onSocketError(res);
        });
    }
    // 发送socket消息
    PromiseWebSocket.prototype._sendSocketMessage = function (option) {
        return new Promise(function (resolve, reject) {
            // @ts-ignore
            uni.sendSocketMessage({
                data: JSON.stringify(option),
                success: function (res) { return resolve(res); },
                fail: function (fail) { return reject(fail); }
            });
        });
    };
    // socket 重连
    PromiseWebSocket.prototype._reConnectSocket = function () {
        var _this = this;
        if (!IsLogin) {
            reConnectTimer = setInterval(function () {
                _this.config.debug && console.log("%c [uni-socket-promise] %c 重新连接:", 'color:red;', 'color:#000;');
                _this.initSocket(function (e) {
                    if (e.config.isSendHeart) {
                        e.config.debug && console.log("%c [uni-socket-promise] %c 开始心跳:", 'color:red;', 'color:#000;');
                        e._clearHeart();
                        e._startHeart();
                    }
                    clearInterval(reConnectTimer);
                    reConnectTimer = null;
                }, function (err, e) {
                    e.config.debug && console.log("%c [socket] %c 重新连接失败", 'color:red;', 'color:#000;');
                });
            }, this.config.reConnectTime);
        }
    };
    // 清理心跳
    PromiseWebSocket.prototype._clearHeart = function () {
        clearInterval(heartTimer);
        heartTimer = null;
    };
    // 开始心跳
    PromiseWebSocket.prototype._startHeart = function () {
        heartTimer = setInterval(function () {
            // @ts-ignore
            uni.sendSocketMessage({
                data: 'ping'
            });
        }, this.config.heartTime);
    };
    return PromiseWebSocket;
}());
exports.default = PromiseWebSocket;
