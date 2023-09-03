import { useEffect, useState } from "react";
import Avatarr from '../components/Avatar';
import { data } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { getUsers,createRoom,getRooms } from "../features/user/userSlice";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
const Dashboard = ()=>{
  const {users,rooms} = useSelector(state=>state.getUser);

  const dispatch = useDispatch();
  const [name,setName] = useState('');
  const [user,setUser]= useState(null);
    useEffect(()=>{
    
dispatch(getUsers())
// dispatch(getRooms())
    },[rooms])
useEffect(()=>{
  let user = localStorage.getItem('user');
  user = JSON.parse(user);
  setName(user.fullName)
  setUser(user)
  dispatch(getRooms())
},[])
    const handleChange = (item)=>{
(async()=>{
await dispatch(createRoom({user:item}))
await dispatch(getRooms())
// await dispatch(getUsers())
})()
    }
    console.log(user,"user")
    return (
        <div>
     {/* This is an example component */}
<div className="container mx-auto shadow-lg rounded-lg">
         {/* headaer */}
    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div className="font-semibold text-2xl">GoingChat</div>
 
      {/* <div
        className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
      >
        RA
      </div> */}
      <Avatarr name={name}/>
    </div>
    {/* end header */}
    {/* Chatting */}
    <div className="flex flex-row justify-between bg-white">
     
      {/* chat list */}
      <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
        {/* search compt  */}
        <div className="border-b-2 py-4 px-2">
          <input
            type="text"
            placeholder="search chatting"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          />
          
        </div>
        
      {/* end search compt  */}
        {/* user list */}
        
        {rooms.length!==0 && user!==null ?rooms.map((item,index)=>{
          const {members} = item
        const data = members.filter(item=>item._id!==user._id)
          return (
            
            <div 
            className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer"
            key={index}
          >
            <div className="w-1/4">
            <Avatarr name={data[0].fullName}/>
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">{data[0].fullName}</div>
              <span className="text-gray-500">Pick me at 9:00 Am</span>
            </div>
          </div>
            
          
          )
        }):<div>No Chat Rooms</div>}
   

        {/* end user list */}
      </div>
      {/* end chat list */}
      {/* message */}  
      <div className="w-full px-5 flex flex-col justify-between">
        <div>Hello</div>
        <div className="flex flex-col mt-5">
          <div className="flex justify-end mb-4">
            <div
              className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
            >
              Welcome to group everyone !
            </div>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
          </div>
          <div className="flex justify-start mb-4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div
              className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              at praesentium, aut ullam delectus odio error sit rem. Architecto
              nulla doloribus laborum illo rem enim dolor odio saepe,
              consequatur quas?
            </div>
          </div>
          <div className="flex justify-end mb-4">
            <div>
              <div
                className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Magnam, repudiandae.
              </div>

              <div
                className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis, reiciendis!
              </div>
            </div>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
          </div>
          <div className="flex justify-start mb-4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div
              className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
            >
              happy holiday guys!
            </div>
          </div>
        </div>
        <div className="py-5">
          <input
            className="w-full bg-gray-300 py-5 px-3 rounded-xl"
            type="text"
            placeholder="type your message here..."
          />
        </div>
      </div>
      {/* end message  */}
      <div className="w-2/5 border-l-2 px-5">
        <div className="flex flex-col">
        <Card className="w-96">
      <List>
        {users.map((item)=>{
return (
<ListItem onClick={()=>handleChange(item)}>
<ListItemPrefix>
<Avatarr name={item.fullName}/>
</ListItemPrefix>
<div>
<Typography variant="h6" color="blue-gray">
{item.fullName}
</Typography>
<Typography variant="small" color="gray" className="font-normal">
Software Engineer @ Material Tailwind
</Typography>
</div>
</ListItem>
)
})}
        {/* <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="candice" src="/img/face-1.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Tania Andrew
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Software Engineer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="alexander" src="/img/face-2.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Alexander
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Backend Developer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="emma" src="/img/face-3.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Emma Willever
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              UI/UX Designer @ Material Tailwind
            </Typography>
          </div>
        </ListItem> */}
      </List>
    </Card>
          </div>
        </div>
      </div>
    </div>
</div>
    
    )
}

export default Dashboard
