import React, {useEffect} from "react";
import {useMount} from "ahooks";

function Home() {

    useMount(() => {
        console.log("I'm Home Page!")
    })

    useEffect(() => {
        console.log("I'm Home Page! from useEffect")
    }, [])

    return <div>
        欢迎使用 Pro 版本!
    </div>
}

export default Home;
