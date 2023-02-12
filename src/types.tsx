export type IRoute = {
    elem?: any;
    $params?: any;
    name: string;
    path: string;
    key?: string;
    icon?: any;
    breadcrumb?: boolean;
    children?: IRoute[];
    component?: any;
    wild?: boolean;     // 是否是多子页面路由
    hidden?: boolean;   // 不在导航栏显示
    pin?: boolean;      // 固定在导航栏显示
} ;
