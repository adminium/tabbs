import React, {useEffect} from "react";
import {useMount} from "ahooks";
import {Link, matchPath, resolvePath} from "react-router-dom";
import {generatePath} from "react-router";

function Home(props: any) {


    useMount(() => {
        console.log('Props', props)
        console.log("I'm Home Page!")
    })

    useEffect(() => {
        console.log('match:', matchPath('/user/:id', '/user/1'))
    }, [])

    return <div>
        欢迎使用 Pro 版本!
        <Link to={'/user/tom'}>Tom</Link>
        <Link to={'/user/jack'}>Jack</Link>
    </div>
}

export default Home;
