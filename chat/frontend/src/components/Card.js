import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
  } from "@material-tailwind/react";
import SignupForm from "./SignupForm";

const CardItem = ()=>{

    return (
        <Card className="mt-6 w-auto">
          
        <CardBody>
<SignupForm/>
        </CardBody>

      </Card>
    )

}

export default CardItem