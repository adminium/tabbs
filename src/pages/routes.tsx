import {IconBell, IconCreditCard, IconHome, IconSafe} from "@douyinfe/semi-icons";
import {IRoute} from "@/types";

export const routes: IRoute[] = [
    {name: "工作台", path: "/console", icon: <IconHome/>, pin: true},
    {
        name: "首页", path: "/home", icon: <IconBell/>, children: [
            {name: "首页设置", path: '/home/setting'}
        ]
    },
    {name: "欢迎", path: "/welcome", icon: <IconBell/>},
    {
        name: "用户", path: "/user/:id", icon: <IconBell/>
    },
]
