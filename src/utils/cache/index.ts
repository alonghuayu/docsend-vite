/*
 * @Author: withering 
 * @Date: 2021-10-25 09:21:32 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-25 13:35:37
 */
import { createStorage as create, CreateStorageParams } from "./storage"
import { AUTO_CACHE_TIME, StorageIsAes, getShortPrefix } from "@/settings/cacheSetting";

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
    return {
        hasAes: StorageIsAes,
        storage,
        prefixKey: getShortPrefix(),
        ...options
    }
}

export const createStorage = (storage: Storage = localStorage, options: Options = {}) => {
    return create(createOptions(storage, options));
}

export const createSessionStorage = (options: Options = {}) => {
    return createStorage(sessionStorage, { ...options, timeout: AUTO_CACHE_TIME })
}

export const createLocalStorage = (options: Options = {}) => {
    return createStorage(localStorage, { ...options, timeout: AUTO_CACHE_TIME })
}