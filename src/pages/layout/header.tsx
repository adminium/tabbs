import {Button, Layout} from "@douyinfe/semi-ui";
import React from "react";
import classes from "./style/index.module.less";
import {useLocalStorageState} from "ahooks";
import {IconRefresh} from "@douyinfe/semi-icons";

export function HeaderComponent() {

    const name = localStorage.getItem('name');
    return (<Layout.Header className={classes.header}>
        <span style={{width: 240}}>Router</span>
    </Layout.Header>)
}
