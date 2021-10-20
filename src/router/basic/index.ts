import type { AppRouteRecordRaw } from '@/router/types';
// import { PageEnum } from "@/enums/pageEnum"

const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Home',
    // redirect: PageEnum.BASE_HOME,
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
    RootRoute,
    LoginRoute
]