export type IRoute = {
    name: string;
    path: string;
    key?: string;
    icon?: any;
    breadcrumb?: boolean;
    children?: IRoute[];
    component?: any;
    closable?: boolean;
    wild?: boolean;
}
