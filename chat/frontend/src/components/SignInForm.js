import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import {useFormik} from 'formik' 
import {signUpSchema,loginSchema} from '../schema/auth.schema'
import { useNavigate } from "react-router-dom"
import { register } from "../features/user/authSlice";
import { loginUser } from "../features/user/authSlice";

// import Toast from "./Toast";
const SigninForm = ()=>{
  const {user,isLoading} = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const initialValues = {
    email:'',
    password:''
  }
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =  useFormik({
    initialValues,
    validationSchema:loginSchema,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
      dispatch(loginUser({email:values.email,password:values.password}))
      action.resetForm();
    },
  });


    return (
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Login User
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Email" name="email" value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}/>
                       {errors.email && touched.email ? (
                      <p className="text-[#FF0000]">{`*${errors.email}`}</p>
                    ) : null}
              <Input type="password" size="lg" label="Password" name="password" value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}/>
                        {errors.password && touched.password ? (
                      <p className="text-[#FF0000]">{`*${errors.password}`}</p>
                    ) : null}
            </div>
            {isLoading ? <Button type="submit"className="mt-6" fullWidth disabled>
              Login
            </Button>: <Button type="submit"className="mt-6" fullWidth>
            Login
            </Button>}
            
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
            <Link to="/register"> Sign Up</Link>   
              </a>
            </Typography>
          </form>
        </Card>
      );
}

export default SigninForm