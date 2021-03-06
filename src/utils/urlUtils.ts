/*
 * @Author: withering 
 * @Date: 2021-10-25 09:21:24 
 * @Last Modified by:   withering 
 * @Last Modified time: 2021-10-25 09:21:24 
 */
/**
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns {string} 拼接后的对象
 */

export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = '', url = '';
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    parameters = parameters.replace(/&$/, '');
    if (/\?$/.test(baseUrl)) {
        url = baseUrl + parameters;
    } else {
        url = baseUrl.replace(/\/?$/, '?') + parameters;
    }
    return url;
}