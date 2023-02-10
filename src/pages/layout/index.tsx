import {Routes, Route, RouterProvider, createBrowserRouter, Link} from "react-router-dom";
import React, {useMemo, useState} from "react";
import {routes} from "../routes";
import {flattenRoutes} from "@/utils/flattenRoutes";
import {IRoute} from "@/types";
import classes from './style/index.module.less'
import {LayoutNav} from "@/pages/layout/nav";
import {Layout} from '@douyinfe/semi-ui';
import {HeaderComponent} from "@/pages/layout/header";

const {Sider, Content} = Layout;

function LayoutPage() {
    const [_routes] = useState(routes);
    const _flattenRoutes: IRoute[] = useMemo(() => flattenRoutes(_routes), [_routes]);

    return <Layout className={classes.layout}>
        <HeaderComponent/>
        <Layout>
            <Sider style={{height: '100vh'}}><LayoutNav/></Sider>
            <Content style={{background: '#f7f7f7', padding: 20}}>
                <Routes>
                    {_flattenRoutes.map((route: IRoute, index: number) => {
                        return (
                            <Route key={route.key}
                                   path={`/${route.key}`}
                                   element={route.component.render()}
                            />
                        )
                    })}
                    {/*<Route path='welcome' element={<Welcome/>}/>*/}
                </Routes>
            </Content>
        </Layout>
        {/*<RouterProvider router={router}/>*/}
    </Layout>
}

export default LayoutPage;

