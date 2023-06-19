import CardItem from "../components/Card"
import { useDispatch, useSelector } from "react-redux"
const Register = ()=>{
    const store = useSelector(store =>store.user);
    {console.log(store,"store")}
    return (
        <div>
         
 <div className="flex justify-center items-center bg-black h-[50rem]">
            <CardItem/>
        </div>
        </div>
       
    )
}

export default Register