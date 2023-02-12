import {Nav, Toast} from "@douyinfe/semi-ui";
import {useMemo} from "react";
import {routes} from "@/pages/routes";
import {SubNavProps} from "@douyinfe/semi-ui/lib/es/navigation/SubNav";
import NProgress from 'nprogress';
import {useNavigate} from "react-router";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import 'nprogress/nprogress.css';
import {IRoute} from "@/types";


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

export function LayoutNav({flattenRoutes, setActiveKey}: { flattenRoutes: IRoute[], setActiveKey: Function }) {

    const navigate = useNavigate();

    // TODO 需要一个递归转换菜单的函数
    const menus = useMemo(() => {
        const res: SubNavProps[] = [];
        flattenRoutes.map((item, index) => {
            if (!item.wild && !item.hidden) {
                res.push({
                    itemKey: item.key,
                    text: item.name,
                    icon: item.icon,
                })
            }
        })
        return res;
    }, [flattenRoutes]);


    return (
        <Nav
            style={{height: 'calc(100% - 45px)'}}
            items={menus}
            onSelect={data => {
            }}
            onClick={data => {
                // setActiveKey(data.itemKey);
                navigate(data.itemKey as string);
            }}
            footer={{
                collapseButton: true,
            }}
        />
    )
}
