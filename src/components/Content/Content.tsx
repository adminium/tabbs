import classes from './style/content.module.less'
import React from "react";
import {Card} from "@douyinfe/semi-ui";

export function Content({children}: { children: any }) {
    return <Card className={classes.pageContent}
                 title='账单页面'
    >
        {children}
    </Card>
}
