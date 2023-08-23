import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../features/user.slice";
import { useNavigate } from "react-router-dom";
const Register = ()=>{
    const {isLoading,user} = useSelector(store=>store.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData,setUser] = useState({fullName:'',email:'',password:''});
    useEffect(()=>{
const user = localStorage.getItem('user');
if(user){
navigate('/dashboard')
}
    },[user])
const handleChange=(e)=>{
    console.log(e.target.value,"????")
    const name = e.target.name;
    const value = e.target.value
    setUser({...userData,[name]:value})
}
const handleSubmit = (event)=>{
    event.preventDefault()
    dispatch(registerUser(userData))
    setUser({email:'',fullName:'',password:''})
}
return (
    <div>
<form onSubmit={handleSubmit}>
    <input type="text" name="fullName" value={userData.fullName} onChange={handleChange}/>
    <br/><br/>
    <input type="email" name="email" value={userData.email} onChange={handleChange}/>
    <br/><br/>
    <input type="password" name="password" value={userData.password} onChange={handleChange}/>
    <br/><br/>
    <input type="submit" value="submit"/>
</form>
    </div>

)
}

export default Register