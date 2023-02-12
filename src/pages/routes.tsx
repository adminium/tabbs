import {IconBell, IconCreditCard, IconHome, IconSafe} from "@douyinfe/semi-icons";
import {IRoute} from "@/types";

export const routes: IRoute[] = [
    {name: "工作台", key: "/console", icon: <IconHome/>, closable: false},
    {name: "首页", key: "/home", icon: <IconBell/>, closable: true},
    {name: "欢迎", key: "/welcome", icon: <IconBell/>, closable: true},
    {name: "用户", key: "/user/:id", icon: <IconBell/>, closable: true},
]
