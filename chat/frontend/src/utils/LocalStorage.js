export const LocalStorage ={
    storeItem:(user)=>{
        localStorage.setItem("user", JSON.stringify(user.data));
        localStorage.setItem("token", JSON.stringify(user.tokens));
    },
getItem:()=>{
   const token = JSON.parse(localStorage.getItem("token"));
   return token
}

}