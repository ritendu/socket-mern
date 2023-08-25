import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../features/user.slice";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:4000");
const Rooms = ()=>{
    const {room} = useSelector(state=>state.user);
 const dispatch = useDispatch()
    const [message,setMessage] = useState('');
    const [data,setData] = useState('')
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value
      setMessage(e.target.value)
    }
useEffect(()=>{
  socket.on('receive_message',data=>{
    console.log('Inside Room')
    console.log(data,"??????")
    setData(data.message)
  })
},[socket])

    const handleSubmit = (e)=>{
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'))
        
        socket.emit('create-room',{message:message,roomId:room._id,room:room});
        dispatch(createMessage({message:message,roomId:"64e8a344d1e5e25622b0fc7f"}))
        socket.emit('send_message',{message:message,roomId:"64e8a344d1e5e25622b0fc7f",room:room})
    }
    return (
        <div>
Messages
<br/>
<br/>
{data}
    <form onSubmit={handleSubmit}>
            <input type="text" name="message" onChange={handleChange}/>
            <input type="submit" value="submit message"/>
        </form>
        </div>
    )
}

export default Rooms