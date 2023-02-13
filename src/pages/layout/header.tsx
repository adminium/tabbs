import {Breadcrumb, Button, Layout} from "@douyinfe/semi-ui";
import React from "react";
import classes from "./style/index.module.less";
import {IconArticle, IconHome, IconRefresh} from "@douyinfe/semi-icons";

export function HeaderComponent() {

    const name = localStorage.getItem('name');
    return (<Layout.Header className={classes.header}>
        <Breadcrumb>
            <Breadcrumb.Item icon={<IconHome/>}></Breadcrumb.Item>
            <Breadcrumb.Item icon={<IconArticle/>}>首页设置</Breadcrumb.Item>
            {/*<Breadcrumb.Item>With Icon</Breadcrumb.Item>*/}
        </Breadcrumb>
    </Layout.Header>)
}
