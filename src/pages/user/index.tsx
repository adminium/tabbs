import useUrlState from "@ahooksjs/use-url-state";
import {json, useParams} from "react-router";
import {useEffect} from "react";

export default ({$setTitle}: any) => {
    const [query] = useUrlState({
        user: undefined
    })
    const params = useParams();

    useEffect(()=>{
        $setTitle(`用户: ${JSON.stringify(params)}`)
    },[params])

    console.log('Params', params)
    return <div>
        用户: {JSON.stringify(params)}
    </div>
}
