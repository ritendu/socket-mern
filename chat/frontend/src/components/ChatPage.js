import axios from 'axios'
import { useEffect, useState } from 'react';
const ChatPage = ()=>{
    // const [Loading,setLoading]= useState(true);
    // if(Loading){
    //     <div>Loading...</div>
    // }
    const [chats,setChats]= useState([]);
    const fetchChats = async()=>{
        const {data} = await axios.get('http://localhost:5000/api/chats');
        setChats(data)
        console.log(data);
    }
    useEffect(()=>{
        fetchChats()
    },[])
    return (
<div>{chats.map(chat=>{
    console.log(chat,"chat")
    return(
        <div key={chat._id}>{chat.chatName}</div>
    )
})}</div>
    )
}

export default ChatPage