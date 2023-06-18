import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({children })=>{
    const isLoggedIn = false;
    useEffect(()=>{
        console.log('Hello World..')
    },[])
if (!isLoggedIn) {
    return <Navigate to="/login" replace /> 
}
return children;
    };


export default Protected