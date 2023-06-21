import { useEffect } from "react"
import CardItem from "../components/Card"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Progress from "../components/Progress";

const Login = ()=>{
    const {token,isLoading} = useSelector((store)=>store.user);
    const navigate = useNavigate()
useEffect(()=>{
   const token = localStorage.getItem('token');
   if(token!==null){
  
        navigate('/')
 
    
   }
},[token])

    return (
        <div>
         {!isLoading ?  <div className="flex justify-center items-center bg-black h-[50rem]">
            <CardItem isSignup={false}/>
        </div>: <Progress/>}

        </div>
       
    )
}

export default Login