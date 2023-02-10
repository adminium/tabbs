import {Layout} from "@douyinfe/semi-ui";
import React from "react";
import classes from "./style/index.module.less";
import {useLocalStorageState} from "ahooks";

export function HeaderComponent() {

    const name = localStorage.getItem('name');
    return (<Layout.Header className={classes.header}>
        <span>商务面板 Pro</span>
        <span>
            {name}
        </span>
    </Layout.Header>)
}
