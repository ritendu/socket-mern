import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getUsers,createRoom } from "../features/user.slice";
import { useNavigate } from "react-router-dom";
const socket = io.connect("http://localhost:4000");

const Dashboard = ()=>{
    const {users,room} = useSelector(state=>state.user);
    console.log(room,"users")
    const [message,setMessage] = useState('')
    const [dataMessage, setDataMessage] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(()=>{
       const user = JSON.parse(localStorage.getItem('user'))
        dispatch(getUsers({userId:user._id}))
       socket.on ('receive_message',data=>{
        setDataMessage(data)
       })
    },[socket])
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value
setMessage(e.target.value)
    }
    const handleSubmit = (e)=>{
e.preventDefault();
socket.emit('message',{message:message,roomId:123});
    }
const createRoomUser = (receiver)=>{
console.log()
    
const user = JSON.parse(localStorage.getItem('user'));
(async()=>{
const value = await dispatch(createRoom({userId:user._id,receiverId:receiver._id}));
if(value.type==='user/createRoom/fulfilled'){
    navigate('/rooms')
}
})()

}
    return (
       <div>
        {users.length>0 &&  users.map((item)=>{
            return <button onClick={()=>createRoomUser(item)}>{item.fullName}</button>
        })}
        {/* <form onSubmit={handleSubmit}>
            <input type="text" name="message" onChange={handleChange}/>
            <input type="submit" value="submit message"/>
        </form> */}
       </div>
    )
}

export default Dashboard