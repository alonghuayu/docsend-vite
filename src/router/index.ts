/*
 * @Author: withering 
 * @Date: 2021-10-20 18:12:58 
 * @Last Modified by:   withering 
 * @Last Modified time: 2021-10-20 18:12:58 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { basicRoutes } from '@/router/basic/index'

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);


// app router
export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router
