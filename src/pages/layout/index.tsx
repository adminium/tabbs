import {Routes, Route, RouterProvider, createBrowserRouter, Link, useLocation, matchPath} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import {routes} from "../routes";
import {flattenRoutes} from "@/utils/flattenRoutes";
import {IRoute} from "@/types";
import classes from './style/index.module.less'
import {LayoutNav} from "@/pages/layout/nav";
import {Button, Layout, TabPane, Tabs, Toast} from '@douyinfe/semi-ui';
import {HeaderComponent} from "@/pages/layout/header";
import {generatePath, useNavigate} from "react-router";
import NProgress from "nprogress";
import {IconRefresh} from "@douyinfe/semi-icons";
import {useMount} from "ahooks";
import {cloneDeep} from "lodash";

const {Sider, Content} = Layout;

function LayoutPage() {
    const [flattenRoutesMemo] = useState(flattenRoutes(routes));
    const [tabs, setTabs] = useState([] as IRoute[]);
    const [activeKey, setActiveKey] = useState('console');
    const location = useLocation();
    const navigate = useNavigate();


    useMount(() => {
        console.debug(flattenRoutesMemo)
    })

    const close = (key: string) => {
        setTabs(prev => {
            const next = [...prev]
            for (let i = 0; i < next.length; i++) {
                if (next[i].key == key) {
                    next.splice(i, 1)
                }
            }
            return next
        });
    }

    const open = (path: string) => {

    }

    useEffect(() => {
        if (!flattenRoutesMemo) {
            return
        }
        const tab = tabs.find(item => item.key == location.pathname);
        if (tab) {
            setActiveKey(tab.key as string);
        } else {
            let clone = false;
            const route = flattenRoutesMemo.find(item => {
                if (item.key == location.pathname) {
                    return true
                } else if (matchPath(item.key as string, location.pathname)) {
                    clone = true;
                    return true
                }
                return false
            });
            console.log('Clone', clone)
            if (route) {
                setTabs(prev => {
                    const next = [...prev]
                    if (clone) {
                        const c = cloneDeep(route);
                        c.key = location.pathname
                        next.push(c)
                        setActiveKey(c.key);
                    } else {
                        next.push(route)
                        setActiveKey(route.key as string);
                    }
                    return next
                });
                NProgress.start();
                route.component.preload().then(() => {
                    NProgress.done()
                })
            } else {
                Toast.error({content: '页面未找到'})
            }
        }
    }, [location])


    return <Layout className={classes.layout}>
        <HeaderComponent/>
        <Layout>
            <Sider style={{height: '100vh'}}><LayoutNav/></Sider>
            <Content style={{background: '#f7f7f7'}}>
                <Tabs type='card'
                      tabPaneMotion={false}
                      lazyRender={true}
                      activeKey={activeKey}
                      onTabClick={key => {
                          navigate(key)
                      }}
                      onTabClose={key => close(key)}
                      style={{background: '#fff'}}
                      tabBarExtraContent={<div style={{
                          background: '#eee',
                          width: 120,
                          height: 38,
                          display: 'flex',
                          alignItems: 'center',
                      }}>
                          <Button size='small' type='tertiary'><IconRefresh/></Button>
                      </div>}
                >
                    {tabs.map((route: IRoute, index: number) => {
                        return (
                            <TabPane key={index} tab={route.name} itemKey={route.key}/>
                        )
                    })}
                </Tabs>
                <Routes>
                    {tabs.map((route: IRoute, index: number) => {
                        return (
                            <Route
                                key={route.key}
                                path={route.path}
                                element={route.component.render()}
                            />
                        )
                    })}
                </Routes>
            </Content>
        </Layout>
    </Layout>
}

export default LayoutPage;

