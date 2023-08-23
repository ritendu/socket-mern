import { useState } from "react"
import { loginUser } from "../features/user.slice";
import { useDispatch } from "react-redux";
const Login = ()=>{
    const [userData,setUser] = useState({email:'',password:''});
    const dispatch = useDispatch();
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value
        setUser({...userData,[name]:value})
    }
const handleSubmit = (event)=>{
event.preventDefault();
dispatch(loginUser(userData));
}
    return (
        <div>
   <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={userData.email} onChange={handleChange}/>
        <br/><br/>
        <input type="password" name="password" value={userData.password} onChange={handleChange}/>
        <br/><br/>
        <input type="submit" value="submit"/>
    </form>
        </div>
     
    )
}

export default Login