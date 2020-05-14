"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 是否是json字符串 如果是直接返回json对象
 * @param str
 */
exports.isJson = function (str) {
    if (typeof str === 'object')
        return str;
    try {
        var obj = JSON.parse(str);
        // tslint:disable-next-line:no-extra-boolean-cast
        return !!(typeof obj === 'object' && obj) ? obj : false;
    }
    catch (e) {
        return false;
    }
};
