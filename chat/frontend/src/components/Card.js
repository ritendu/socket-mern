import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
  } from "@material-tailwind/react";
import SignupForm from "./SignupForm";
import SigninForm from "./SignInForm";
const CardItem = ({isSignup})=>{
console.log(isSignup,"isSignup")
    return (
     <Card className="mt-6 w-auto">
          
        <CardBody>
          {isSignup ? <SignupForm/>:<SigninForm/>}

        </CardBody>

      </Card>
       
    )

}

export default CardItem