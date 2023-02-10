import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import InnerException from "./pages/exception/500";
import Layout from "./pages/layout";


const router = createBrowserRouter([
    {path: "/*", caseSensitive: false, element: <Layout/>, errorElement: <InnerException/>},

]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <RouterProvider router={router}/>
    </>,
)
