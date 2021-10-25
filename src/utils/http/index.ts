/*
 * @Author: withering 
 * @Date: 2021-10-25 14:15:13 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-25 17:46:21
 */
import { AxiosResponse } from 'axios';
import { RequestOptions, Result } from "./types";
import { VAxios } from "./axios";
import { AxiosTransform } from './axiosTransform'
import { ResultEnum } from '@/enums/httpEnum'
import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * 数据处理 请求配置等等
 */
const transform: AxiosTransform = {
    /**
     * @description 请求之前处理config 
     */
    beforeRequestHook: (config, options) => {
        return config;
    },

    /**
     * @description 处理请求数据
     */
    transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
        const { isReturnNativeResponse, isTransformRequestResult, isShowMessage, successMessageText, isShowSuccessMessage, errorMessageText, isShowErrorMessage } = options;
        const { data } = res;

        if (!data) {
            return Promise.reject(data)
        }

        // 是否返回原生响应头 比如：需要获取响应头时使用该属性
        if (isReturnNativeResponse) {
            return res;
        }

        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (!isTransformRequestResult) {
            return res.data;
        }

        //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
        const { code, result, message } = data;

        // 请求成功 -- 可以根据项目自信判断蔡成功
        const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
        // 是否显示提示信息
        if (isShowMessage) {
            if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
                // 是否显示自定义信息提示
                ElMessage.success(successMessageText || message || 'success')
            } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
                // 是否显示自定义信息提示
                ElMessage.error(message || errorMessageText || 'error')
            } else if (!hasSuccess && options.errorMessageMode === 'modal') {
                // errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
                ElMessageBox.confirm(message, 'Warning')
            }
        }

        // 下面可以做一些code 的状态判断，例如：
        if (code === ResultEnum.SUCCESS) {
            return result;
        }

        return data;
    },
    /**
     * @description 请求拦截器处理
     */
     requestInterceptors: (config) => {
        return config
    }
}

const Axios = new VAxios({
    timeout: 15 * 1000,
    // json
    // headers: { 'Content-Type': ContentTypeEnum.JSON },
    // form-data
    // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    // 数据处理
    transform,
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
        // 请求参数拼接到url
        joinParamsToUrl: false,
        // 格式化请求参数时间
        formatDate: true,
        // 是否处理请求结果
        isTransformRequestResult: true,
        // 是否返回原生响应头
        isReturnNativeResponse: false,
        // 是否显示提示信息
        isShowMessage: true,
        // 成功的文本信息
        successMessageText: "",
        // 是否显示成功信息
        isShowSuccessMessage: true,
        // 是否显示失败信息
        isShowErrorMessage: true,
        // 错误的文本信息
        errorMessageText: "",
        // 是否加入时间戳
        joinTime: true,
        // 忽略重复请求
        ignoreCancelToken: true,
        // 请求时是否 在header上传token
        withToken: true,
        // 是否加入url
        joinPrefix: true,
        // 接口地址， 不填则使用默认apiUrl
        apiUrl: '',
        // 错误消息提示类型
        errorMessageMode: 'none',
    },
    // withCredentials: true,
})

export default Axios;