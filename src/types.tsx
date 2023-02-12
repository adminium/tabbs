export type IRoute = {
    name: string;
    key: string;
    icon?: any;
    breadcrumb?: boolean;
    children?: IRoute[];
    component?: any;

    closable?: boolean;
}
