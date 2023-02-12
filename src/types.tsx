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
    wild?: boolean;     // 路由是否为参数匹配
    hidden?: boolean;   // 不在导航栏显示
    pin?: boolean;      // 固定在导航栏显示
    multiple?: boolean  // 支持多实例显示
};
