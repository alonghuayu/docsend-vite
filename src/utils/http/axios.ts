/*
 * @Author: withering 
 * @Date: 2021-10-25 14:15:30 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-25 16:41:17
 */
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { CreateAxiosOptions, RequestOptions, Result } from './types';
import { AxiosCanceler } from './axiosCancel'
import { isFunction } from '@/utils/is';
import { cloneDeep } from 'lodash-es'
import axios from 'axios';

export class VAxios {
    private axiosInstance: AxiosInstance;
    private options: CreateAxiosOptions;

    constructor(options: CreateAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    private getTransform() {
        const { transform } = this.options
        return transform
    }

    /**
     * @description: 拦截器配置
     */
    private setupInterceptors() {
        const transform = this.getTransform()
        if (!transform) {
            return
        }
        const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } = transform;
        const axiosCanceler = new AxiosCanceler();

        // ? 请求拦截器配置处理
        this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } = config;
            const ignoreCancel = ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken;
            !ignoreCancel && axiosCanceler.addPending(config);
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config, this.options);
            }
            return config;
        }, undefined)

        // ? 请求拦截器错误捕获
        requestInterceptorsCatch &&
            isFunction(requestInterceptorsCatch) &&
            this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

        // ? 响应结果拦截器处理
        this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
            res && axiosCanceler.removePending(res.config);
            if (responseInterceptors && isFunction(responseInterceptors)) {
                res = responseInterceptors(res);
            }
            return res;
        }, undefined);

        // ? 响应结果拦截器错误捕获
        responseInterceptorsCatch &&
            isFunction(responseInterceptorsCatch) &&
            this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
    }

    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let conf: AxiosRequestConfig = cloneDeep(config);
        const transform = this.getTransform();
        const { requestOptions } = this.options;
        const opt: RequestOptions = Object.assign({}, requestOptions, options);
        const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {}
        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt)
        }
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<Result>>(conf)
                .then((res: AxiosResponse<Result>) => {
                    // ? 请求是否被取消
                    const isCancel = axios.isCancel(res)
                    if (transformRequestHook && isFunction(transformRequestHook) && !isCancel) {
                        const ret = transformRequestHook(res, opt)
                        // ret !== undefined ? resolve(ret) : reject(new Error('request error!'));
                        return resolve(ret)
                    }
                    reject(res as unknown as Promise<T>)
                })
                .catch((e: Error | AxiosError) => {
                    if (requestCatchHook && isFunction(requestCatchHook)) {
                        reject(requestCatchHook(e, opt));
                        return
                    }
                    reject(e)
                })
        })
    }
}