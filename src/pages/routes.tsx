import {IconBell, IconCreditCard, IconHome, IconSafe} from "@douyinfe/semi-icons";
import {IRoute} from "@/types";

export const routes: IRoute[] = [
    {name: "工作台", path: "/console", icon: <IconHome/>, closable: false},
    {name: "首页", path: "/home", icon: <IconBell/>, closable: true},
    {name: "欢迎", path: "/welcome", icon: <IconBell/>, closable: true},
    {name: "用户", path: "/user/:id", icon: <IconBell/>, closable: true},
]
