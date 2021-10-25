/*
 * @Author: withering 
 * @Date: 2021-10-25 14:16:31 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-25 16:43:01
 */
import { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axiosTransform'

type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
    // 请求参数拼接到url
    joinParamsToUrl?: boolean;
    // 格式化请求参数时间
    formatDate?: boolean;
    //  是否处理请求结果
    isTransformRequestResult?: boolean;
    // 是否返回原生响应头
    isReturnNativeResponse?: boolean;
    // 是否显示提示信息
    isShowMessage?: boolean;
    // 成功的文本信息
    successMessageText?: string;
    // 是否显示成功信息
    isShowSuccessMessage?: boolean;
    // 是否显示失败信息
    isShowErrorMessage?: boolean;
    // 错误的文本信息
    errorMessageText?: string;
    // 是否加入时间戳
    joinTime?: boolean;
    // 忽略重复请求
    ignoreCancelToken?: boolean;
    // 请求时是否 在header上传token
    withToken?: boolean;
    // 是否加入url
    joinPrefix?: boolean;
    // 接口地址， 不填则使用默认apiUrl
    apiUrl?: string;
    // 错误消息提示类型
    errorMessageMode?: ErrorMessageMode;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
    prefixUrl?: string;
    transform?: AxiosTransform;
    requestOptions?: RequestOptions;
}

export interface Result<T = any> {
    code: number;
    type?: 'success' | 'error' | 'warning';
    message: string;
    result?: T;
}