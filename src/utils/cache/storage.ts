/*
 * @Author: withering 
 * @Date: 2021-10-25 10:19:09 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-25 11:33:55
 */
import { encrypt, decrypt } from 'crypto-js/aes';
import { parse } from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import ECB from 'crypto-js/mode-ecb';
import md5 from 'crypto-js/md5';
import UTF8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import { aesCipher } from "@/settings/cacheSetting";
import { AUTO_CACHE_TIME } from "@/settings/cacheSetting";
import { isNullOrUnDef } from "@/utils/is"

interface aesOptionParams {
    key: string,
    iv: string,
}

class AesOptions {
    private key: any;
    private iv: any;

    constructor(opt: Partial<aesOptionParams> = {}) {
        const { key, iv } = opt;
        if (key) {
            this.key = parse(key);
        }
        if (iv) {
            this.iv = parse(iv);
        }
    }

    get getOptions() {
        return {
            mode: ECB,
            padding: pkcs7,
            iv: this.iv,
        }
    }

    encryptByAES(text: string) {
        return encrypt(text, this.key, this.getOptions).toString();
    }

    decryptByAES(text: string) {
        return decrypt(text, this.key, this.getOptions).toString(UTF8);
    }
}

export function encryptByBase64(text: string) {
    return UTF8.parse(text).toString(Base64);
}

export function decodeByBase64(text: string) {
    return Base64.parse(text).toString(UTF8);
}

export function encryptByMd5(password: string) {
    return md5(password).toString();
}

export interface CreateStorageParams extends aesOptionParams {
    prefixKey: string;
    storage: Storage;
    hasAes: boolean;
    timeout?: Nullable<number>;
}

export const createStorage = ({ prefixKey = '', storage = sessionStorage, key = aesCipher.key, iv = aesCipher.iv, timeout = null, hasAes = true }
    : Partial<CreateStorageParams> = {}) => {
    if (hasAes && [key.length, iv.length].some((item) => item !== 16)) {
        throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
    }

    const encryption = new AesOptions({ key, iv })

    const WebStorage = class WebStorage {
        private storage: Storage;
        private prefixKey?: string;
        private encryption: AesOptions;
        private hasAes: boolean;

        constructor() {
            this.storage = storage;
            this.prefixKey = prefixKey;
            this.encryption = encryption;
            this.hasAes = hasAes;
        }


        private getKey(key: string) {
            return `${this.prefixKey}${key}.`.toLowerCase()
        }
        set(key: string, value: any, expire: number | null = AUTO_CACHE_TIME) {
            const stringData = JSON.stringify({ value, time: Date.now(), expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null });
            const stringValue = this.hasAes ? this.encryption.encryptByAES(stringData) : stringData;
            this.storage.setItem(this.getKey(key), stringValue);
        }
        get(key: string, def: any = null): any {
            const val = this.storage.getItem(this.getKey(key));
            if (val) {
                try {
                    const defVal = this.hasAes ? this.encryption.decryptByAES(val) : val;
                    const data = JSON.parse(defVal);
                    const { value, expire } = data;
                    if (isNullOrUnDef(expire) || expire > new Date().getTime()) {
                        return value
                    }
                    this.remove(key)
                } catch (e) {
                    return def
                }
            } else {
                return def;
            }
        }
        remove(key: string) {
            this.storage.removeItem(this.getKey(key))
        }
        clear(): void {
            this.storage.clear()
        }
        setCookie(key: string, value: any, expire: number | null = AUTO_CACHE_TIME) {
            document.cookie = `${this.getKey(key)}=${value}; Max-Age=${expire}`;
        }
        getCookie(key: string): string {
            const cookieArr = document.cookie.split(';');
            for (let i = 0; i < cookieArr.length; i++) {
                const el = cookieArr[i];
                if (el[0] === this.getKey(key)) {
                    return el[1]
                }
            }
            return ''
        }
        removeCookie(key: string) {
            this.setCookie(key, 1, -1)
        }
        clearCookie(): void {
            const keys = document.cookie.match(/[^ =;]+(?==)/g);
            if (keys) {
                for (let i = 0; i < keys.length; i++) {
                    document.cookie = keys[i] + '=0;expire=' + new Date(0).toUTCString();
                }
            }
        }
    }

    return new WebStorage();
}
