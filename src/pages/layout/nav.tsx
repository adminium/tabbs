import {Nav, Toast} from "@douyinfe/semi-ui";
import {useMemo} from "react";
import {routes} from "@/pages/routes";
import {SubNavProps} from "@douyinfe/semi-ui/lib/es/navigation/SubNav";
import NProgress from 'nprogress';
import {useNavigate} from "react-router";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import 'nprogress/nprogress.css';


function clickNavItem(navigate: NavigateFunction, key: string) {
    const route: any = routes.find(item => item.key == key);
    if (!route?.component) {
        Toast.error({content: '访问页面不存在'})
    } else {
        NProgress.start();
        route.component.preload().then(() => {
            navigate(`/${key}`)
            NProgress.done()
        })
    }
}

export function LayoutNav() {

    const navigate = useNavigate();

    // TODO 需要一个递归转换菜单的函数
    const menus = useMemo(() => {
        const res: SubNavProps[] = [];
        routes.map((item, index) => {
            res.push({
                itemKey: item.key,
                text: item.name,
                icon: item.icon,
            })
        })
        return res;
    }, []);


    return (
        <Nav
            style={{height: '100%'}}
            items={menus}
            onSelect={data => console.log('trigger onSelect: ', data)}
            onClick={data => clickNavItem(navigate, data.itemKey as string)}
        />
    )
}
