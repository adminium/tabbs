import {Nav, Toast} from "@douyinfe/semi-ui";
import React, {useMemo} from "react";
import {routes} from "@/pages/routes";
import {SubNavProps} from "@douyinfe/semi-ui/lib/es/navigation/SubNav";
import NProgress from 'nprogress';
import {useNavigate} from "react-router";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import 'nprogress/nprogress.css';
import {IRoute} from "@/types";
import {NavItemPropsWithItems} from "@douyinfe/semi-ui/lib/es/navigation";
import classes from "./style/index.module.less";
import {IconGift} from "@douyinfe/semi-icons";


function clickNavItem(navigate: NavigateFunction, key: string) {
    navigate(`${key}`)
    // const route: any = routes.find(item => item.key == key);
    // if (!route?.component) {
    //     Toast.error({content: '访问页面不存在'})
    // } else {
    //     NProgress.start();
    //     route.component.preload().then(() => {
    //         navigate(`${key}`)
    //         NProgress.done()
    //     })
    // }
}

function parseRoute(route: IRoute): NavItemPropsWithItems {

    const item: NavItemPropsWithItems = {
        disabled: false,
        icon: route.icon,
        // level: number;
        // link: route.path,
        text: route.name,
        itemKey: route.path,
        items: []
    }

    if (route.children && route.children.length > 0) {
        for (let i = 0; i < route.children.length; i++) {
            item.items?.push(parseRoute(route.children[i]))
        }
    }
    return item
}

export function LayoutNav({flattenRoutes}: { flattenRoutes: IRoute[] }) {

    const navigate = useNavigate();
    const items = useMemo(() => {
        const res: NavItemPropsWithItems[] = [];
        routes.map(item => {
            res.push(parseRoute(item))
        })
        return res;
    }, []);


    return <div style={{height: '100%'}}>
        <div className={classes.navHeader}>
            <IconGift size={'large'} style={{color: '#0064fa', marginRight: 8}}/> Router
        </div>
        <Nav style={{height: 'calc(100% - 45px)'}}
             items={items}
             onSelect={data => {
             }}
             onClick={data => {
                 const item = flattenRoutes.find(item => item.path == data.itemKey);
                 if (!item) {
                     Toast.error({content: '组件未找到'})
                 } else if (!item.children) {
                     navigate(data.itemKey as string);
                 }
             }}
             footer={{
                 collapseButton: true,
             }}
        />
    </div>
}
