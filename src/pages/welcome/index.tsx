import {useNavigate} from "react-router";
import {Button} from "@douyinfe/semi-ui";

function Welcome() {

    const navigate = useNavigate();

    return <div>
        Welcome
        <Button onClick={() => {
            navigate('/home')
        }}>跳转到首页</Button>
    </div>
}

export default Welcome
