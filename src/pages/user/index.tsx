import useUrlState from "@ahooksjs/use-url-state";
import {json, useParams} from "react-router";
import {useEffect} from "react";
import {useMount} from "ahooks";

export default ({$setTitle, $params, $key}: any) => {
    const [query] = useUrlState({
        user: undefined
    })
    const params = useParams();

    useMount(() => {
        $setTitle(`用户: ${$params.id}`)
    })


    return <div>
        用户: {JSON.stringify(params)}
        <p>Key: {$key}</p>
    </div>
}
