/*
 * @Author: withering 
 * @Date: 2021-10-20 18:14:13 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-20 18:46:17
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

declare module 'virtual:*' {
  const result: any;
  export default result;
}

