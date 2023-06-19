import { useEffect } from "react";
const Dashboard = ()=>{
    useEffect(()=>{
        console.log('Hello World..')
    },[])
    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard
