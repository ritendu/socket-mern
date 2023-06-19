
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({children })=>{
    const isLoggedIn = false;
  
if (!isLoggedIn) {
    return <Navigate to="/login" replace /> 
}
return children;
    };


export default Protected