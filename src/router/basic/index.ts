/*
 * @Author: withering 
 * @Date: 2021-10-20 18:13:08 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-20 18:48:32
 */
import type { AppRouteRecordRaw } from '@/router/types';
// import { PageEnum } from "@/enums/pageEnum"

const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Home',
    redirect: '/login',
    meta: {
        title: 'Home',
    },
};
const LoginRoute: AppRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
        title: 'routes.basic.login',
    },
}

export const basicRoutes = [
    LoginRoute,
    RootRoute,
]