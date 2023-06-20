
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({children })=>{
const token = localStorage.getItem('token');

if (token===null) {
    return <Navigate to="/login" replace /> 
}
return children;
    };


export default Protected