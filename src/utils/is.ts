/*
 * @Author: withering 
 * @Date: 2021-10-25 09:21:20 
 * @Last Modified by:   withering 
 * @Last Modified time: 2021-10-25 09:21:20 
 */
const toString = Object.prototype.toString;

/**
 * 
 * @description  判断值是否is某个类型
 * @returns type 类型
 */
export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`;
}

/**
 * 
 * @description  判断值是否有类型
 */
export function isDef<T = unknown>(val?: T): val is T {
    return typeof val !== 'undefined';
}

/**
 * 
 * @description  判断值是否undefined
 */
export function isUnDef<T = unknown>(val?: T): val is T {
    return !isDef(val);
}

/**
 * 
 * @description  判断值是否object类型
 */
export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object');
}

/**
 * 
 * @description  判断值是否为空
 */
export function isEmpty<T = unknown>(val: T): val is T {
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0;
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }

    return false;
}

/**
 * 
 * @description  判断值是否时间类型
 */
export function isDate(val: unknown): val is Date {
    return is(val, 'Date');
}

/**
 * 
 * @description  判断值是否null类型
 */
export function isNull(val: unknown): val is null {
    return val === null;
}

/**
 * 
 * @description  判断值是否null和undefined
 */
export function isNullAndUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) && isNull(val);
}

/**
 * 
 * @description  判断值是否null或者undefined
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) || isNull(val);
}

/**
 * 
 * @description  判断值是否number类型
 */
export function isNumber(val: unknown): val is number {
    return is(val, 'Number');
}

/**
 * 
 * @description  判断值是否promise类型
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * 
 * @description  判断值是否字符串类型
 */
export function isString(val: unknown): val is string {
    return is(val, 'String');
}

/**
 * 
 * @description  判断值是否function类型
 */
export function isFunction(val: unknown): val is Function {
    return typeof val === 'function';
}

/**
 * 
 * @description  判断值是否Boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean');
}

/**
 * 
 * @description  判断值是否正则
 */
export function isRegExp(val: unknown): val is RegExp {
    return is(val, 'RegExp');
}

/**
 * 
 * @description  判断值是否数组
 */
export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val);
}

/**
 * 
 * @description  判断值是否为浏览器
 */
export function isWindow(val: any): val is Window {
    return typeof window !== 'undefined' && is(val, 'Window');
}

/**
 * 
 * @description  判断值是否dom节点
 */
export function isElement(val: unknown): val is Element {
    return isObject(val) && !!val.tagName;
}

/**
 * 
 * @description  判断值是否Map类型
 */
export function isMap(val: unknown): val is Map<any, any> {
    return is(val, 'Map');
}

/**
 * 
 * @description  判断值是否服务端
 */
export const isServer = typeof window === 'undefined';

/**
 * 
 * @description  判断值是否客户端
 */
export const isClient = !isServer;

/**
 * 
 * @description  判断值是否url链接
 */
export function isUrl(path: string): boolean {
    const reg =
        /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
}
