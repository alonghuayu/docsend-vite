/*
 * @Author: withering 
 * @Date: 2021-10-25 10:09:58 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-25 12:01:35
 */
import { isProd } from "@/utils/env";

export const AUTO_CACHE_TIME = 60 * 60 * 24 * 7;

export const aesCipher = {
    key: 'CHAOSHIDAI_4396@1',
    iv: '@1_CHAOSHIDAI4396',
}

export const StorageIsAes = isProd();

export const getShortPrefix = (): string => {
    return process.env.VITE_GLOB_APP_SHORT_NAME ? process.env.VITE_GLOB_APP_SHORT_NAME : '';
}