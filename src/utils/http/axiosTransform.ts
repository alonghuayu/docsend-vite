/*
 * @Author: withering 
 * @Date: 2021-10-25 14:16:44 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-25 17:33:52
 */

/**
 * 数据处理类,可根据项目配置
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, Result, CreateAxiosOptions } from './types'

export abstract class AxiosTransform {
    /**
     * @description: 请求之前处理配置
     */
    beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

    /**
     * @description: 请求成功处理
     */
    transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

    /**
     * @description: 请求失败处理
     */
    requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

    /**
     * @description: 请求之前的拦截器
     */
    requestInterceptors?: (config: AxiosRequestConfig, options: CreateAxiosOptions) => AxiosRequestConfig

    /**
     * @description: 请求之后的拦截器
     */
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

    /**
     * @description: 请求之前的拦截器错误处理
     */
    requestInterceptorsCatch?: (error: Error) => void

    /**
     * @description: 请求之后的拦截器错误处理
     */
    responseInterceptorsCatch?: (error: Error) => void
}