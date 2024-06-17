import React from "react";


const User = React.lazy(() => import("./View/User"));
const Home = React.lazy(() => import("./CommomLayout/Home"));
const CreateUser = React.lazy(() => import("./View/CreateUser"));
const Video = React.lazy(() => import("./View/Video"));

const routes = [
    { path: "/user", name: "User", element2: User },
    { path: "/home", name: "home", element2: Home },
    {path:"/createUser",name:"createUser",element2:CreateUser},
    {path:"/video",name:"video",element2:Video},
   
]

export default routes;