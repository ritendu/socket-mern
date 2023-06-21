import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const  Logout = ()=>{
    
    const navigate = useNavigate()
    useEffect(()=>{
        const getToken = localStorage.getItem("token");
         
        localStorage.removeItem("user");
        localStorage.removeItem("token");
navigate('/login')
    },[])
  
}

export default Logout