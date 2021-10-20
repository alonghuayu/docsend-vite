/*
 * @Author: withering 
 * @Date: 2021-10-20 18:14:20 
 * @Last Modified by:   withering 
 * @Last Modified time: 2021-10-20 18:14:20 
 */
import type { ComputedRef, Ref } from 'vue';

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};
