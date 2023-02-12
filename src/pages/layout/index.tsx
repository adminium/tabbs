import {Routes, Route, RouterProvider, createBrowserRouter, Link, useLocation, matchPath} from "react-router-dom";
import React, {forwardRef, useEffect, useMemo, useState} from "react";
import {routes} from "../routes";
import {prepareRoutes} from "@/utils/prepareRoutes";
import {IRoute} from "@/types";
import classes from './style/index.module.less'
import {LayoutNav} from "@/pages/layout/nav";
import {Button, Layout, TabPane, Toast} from '@douyinfe/semi-ui';
import {HeaderComponent} from "@/pages/layout/header";
import {generatePath, useNavigate} from "react-router";
import NProgress from "nprogress";
import {IconRefresh} from "@douyinfe/semi-icons";
import {useMount} from "ahooks";
import {cloneDeep, keyBy} from "lodash";
import {ReactSortable} from "react-sortablejs";
import {v4 as uuidv4} from 'uuid';

const {Sider, Content} = Layout;

const CustomComponent = forwardRef<HTMLDivElement, any>((props, ref) => {
    return <div className={classes.tabs} ref={ref}>{props.children}</div>;
});

function LayoutPage() {
    const [flattenRoutes] = useState(prepareRoutes(routes));
    const [tabs, setTabs] = useState([] as IRoute[]);
    const [activeKey, setActiveKey] = useState('console');
    const location = useLocation();
    const navigate = useNavigate();


    useMount(() => {
        console.debug(flattenRoutes)
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


    // Tab 设置 Title 回调
    const $setTitle = (key: string) => {
        return (title: string) => {
            console.log('设置 Title', key, title)
            setTabs(prev => {
                const next = [...prev]
                for (let i = 0; i < next.length; i++) {
                    if (next[i].key == key) {
                        next[i].name = title;
                        break
                    }
                }
                return next;
            })
        }
    }


    useEffect(() => {
        if (!flattenRoutes) {
            return
        }
        const tab = tabs.find(item => item.key == location.pathname);
        console.log('Location 变化了', tab)
        if (tab) {
            setActiveKey(tab.key as string);
            console.log('找到了')
        } else {
            const route = flattenRoutes.find(item => {
                if (item.key == location.pathname) {
                    return true
                } else if (matchPath(item.path as string, location.pathname)) {
                    return true
                }
                return false
            });
            if (route) {
                let key: string;
                setTabs(prev => {
                    const next = [...prev]
                    if (route.wild) {
                        const newRoute = cloneDeep(route);
                        newRoute.$params = matchPath(route.path as string, location.pathname)?.params
                        newRoute.key = location.pathname;
                        newRoute.path = location.pathname;
                        newRoute.wild = false;
                        newRoute.elem = route.component.render({
                            $setTitle: $setTitle(newRoute.key as string),
                            $key: newRoute.key,
                            $params: newRoute.$params,
                        })
                        next.push(newRoute)
                        key = newRoute.key
                        console.log("New Route", newRoute)
                    } else {
                        next.push(route)
                        key = route.key as string;
                        route.elem = route.component.render({
                            $setTitle: $setTitle(route.key as string),
                            $key: route.key,
                            $params: route.$params,
                        })
                    }
                    return next
                });

                NProgress.start();
                route.component.preload().then(() => {
                    setActiveKey(key)
                    NProgress.done()
                })
            } else {
                Toast.error({content: '页面未找到'})
            }
        }
    }, [location.pathname])


    return <Layout className={classes.layout}>
        <HeaderComponent/>
        <Layout>
            <Sider style={{height: '100vh'}}>
                <LayoutNav
                    flattenRoutes={flattenRoutes}
                    setActiveKey={setActiveKey}
                />
            </Sider>
            <Content style={{background: '#f7f7f7'}}>
                <RenderTabs tabs={tabs}
                            setTabs={setTabs}
                            activeKey={activeKey}
                            setActiveKey={setActiveKey}
                />
                <div>
                    {tabs.map((route: IRoute, index: number) => {
                        return (
                            <div
                                key={route.key}
                                style={{display: route.key == activeKey ? 'block' : 'none'}}
                            >
                                {route.elem}
                            </div>
                        )
                    })}
                </div>
            </Content>
        </Layout>
    </Layout>
}


interface iCard {
    id: string,
    name: string,
    icon: any,
}

function RenderTabs({tabs, setTabs, activeKey, setActiveKey}: {
    tabs: IRoute[], setTabs: Function, activeKey: string, setActiveKey: Function
}) {

    const [cards, setCards] = useState([] as iCard[]);
    const navigate = useNavigate();
    useEffect(() => {
        let list: iCard[] = [];
        tabs.map(item => {
            list.push({
                id: item.key as string,
                name: item.name,
                icon: item.icon,
            })
        })
        setCards(list)
        console.log("RenderTabs 变化了", tabs)
    }, [tabs])

    return <ReactSortable tag={CustomComponent} list={cards} setList={setCards}>
        {cards.map((item) => (
            <div className={[classes.tab, item.id == activeKey ? classes.active : ''].join(' ')}
                 key={item.id}
                 onClick={() => {
                     // setActiveKey(item.id);
                     navigate(item.id);
                 }}
            >
                {item.icon && <span className={classes.icon}>{item.icon}</span>}
                {item.name}
            </div>
        ))}
    </ReactSortable>
}

export default LayoutPage;

