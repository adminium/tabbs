import {IRoute} from "../types";
import lazyload from "./lazyload";
import {isArray} from "./is";
import {split} from "lodash";

export function flattenRoutes(routes: IRoute[]): IRoute[] {

    // 参考：https://cn.vitejs.dev/guide/features.html#glob-import
    // 此处 glob 会从当前文件 flattenRoutes.tsx 目录开始操作，故此处使用绝对路径，相对于项目根目录开始查找
    // 如果使用相对路径，应使用：../pages/**/[a-z[]*.tsx，并在后续做好对应判断
    const modules = import.meta.glob('/src/pages/**/[a-z[]*.tsx');
    const res: IRoute[] = [];
    const travel = (_routes: IRoute[]) => {
        _routes.forEach((route) => {
            if (route.key) {
                try {
                    if (route.key.indexOf(':') > -1) {
                        const items = split(route.key, '/')
                        console.log("split items:", items)
                        route.component = lazyload(modules[`/src/pages/${items[1]}/index.tsx`]);
                        res.push(route);
                    } else {
                        route.component = lazyload(modules[`/src/pages${route.key}/index.tsx`]);
                        res.push(route);
                    }
                } catch (e) {
                    console.error(`parse route: ${route.key} error:`, e);
                }
            }
            if (isArray(route.children) && route.children?.length) {
                travel(route.children);
            }
        });
    }

    travel(routes);

    return res
}
