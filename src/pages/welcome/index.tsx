import {useNavigate} from "react-router";
import {Button} from "@douyinfe/semi-ui";
import {useMount} from "ahooks";

function Welcome() {

    const navigate = useNavigate();

    useMount(() => {
        console.log("mount welcome")
    })

    return <div>
        Welcome
        <Button onClick={() => {
            navigate('/home')
        }}>跳转到首页</Button>
    </div>
}

export default Welcome
