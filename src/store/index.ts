/*
 * @Author: withering 
 * @Date: 2021-10-20 18:14:42 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-20 18:46:24
 */

import { createStore, createLogger } from 'vuex';
import modules from '@/store/modules'
import { DStore } from './types'

const debug = process.env.NODE_ENV !== 'production';

const plugins = debug ? [createLogger()] : [];

const store = createStore<DStore>({
  plugins,
  modules
})

export default store;