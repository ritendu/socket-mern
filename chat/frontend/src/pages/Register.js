import { useEffect } from "react"
import CardItem from "../components/Card"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
const Register = ()=>{
    const {token} = useSelector((store)=>store.user);
    const navigate = useNavigate()
useEffect(()=>{
   const token = localStorage.getItem('token');
   if(token!==null){
    navigate('/')
   }
},[token])
    return (
        <div>
         
 <div className="flex justify-center items-center bg-black h-[50rem]">
            <CardItem isSignup={true}/>
        </div>
        </div>
       
    )
}

export default Register