import { useState } from "react";


const Rooms = ()=>{
    const [message,setMessage] = useState('');
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value
      setMessage(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

    }
    return (
        <div>
Messages

    <form onSubmit={handleSubmit}>
            <input type="text" name="message" onChange={handleChange}/>
            <input type="submit" value="submit message"/>
        </form>
        </div>
    )
}

export default Rooms