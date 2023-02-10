import React from "react";
import {useRouteError} from "react-router";

function InnerException() {
    const error = useRouteError();
    console.error("inner error:", error);
    return <div>
        500 内部错误
    </div>
}

export default InnerException;
