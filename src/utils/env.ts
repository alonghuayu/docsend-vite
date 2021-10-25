/*
 * @Author: withering 
 * @Date: 2021-10-25 11:40:34 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-25 11:46:54
 */

export const devMode = 'development';

export const prodMode = 'production';

export function getEnv() {
    return process.env.NODE_ENV;
}

export function isDev(): boolean {
    return getEnv() === devMode;
}

export function isProd(): boolean {
    return getEnv() === prodMode;
}