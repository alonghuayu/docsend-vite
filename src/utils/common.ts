/*
 * @Author: withering 
 * @Date: 2021-10-25 09:21:17 
 * @Last Modified by:   withering 
 * @Last Modified time: 2021-10-25 09:21:17 
 */
/**
 * @description 打开新的窗口
 * @param url 需要跳转的url
 * @param opt 参数
 */
export function openWindow(url: string, opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
    const feature: string[] = [];

    noopener && feature.push('noopener=yes');
    noreferrer && feature.push('noreferrer=yes');

    window.open(url, target, feature.join(','));
}