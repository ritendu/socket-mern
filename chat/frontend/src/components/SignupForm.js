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
import {signUpSchema} from '../schema/auth.schema'
import { useNavigate } from "react-router-dom"
import { register } from "../features/user/authSlice";
import { registerUser } from "../features/user/authSlice";

// import Toast from "./Toast";
const SignupForm = ()=>{
  const {user,isLoading} = useSelector((store)=>store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const initialValues = {
    fullName:'',
    email:'',
    password:'',
    confirm_password:''
  }
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =  useFormik({
    initialValues,
    validationSchema:signUpSchema,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
      dispatch(registerUser({fullName:values.fullName,email:values.email,password:values.password}))
      action.resetForm();
    },
  });


    return (
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Name" name="fullName" value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}/>
                  {errors.fullName && touched.fullName ? (
                      <p className="text-[#FF0000]">{`*${errors.fullName}`}</p>
                    ) : null}
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
              <Input type="password" size="lg" label="Confirm Password" name="confirm_password" value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}/>
                       {errors.confirm_password && touched.confirm_password ? (
                      <p className="text-[#FF0000]">{`*${errors.confirm_password}`}</p>
                    ) : null}
            </div>
            {isLoading ? <Button type="submit"className="mt-6" fullWidth disabled>
              Register
            </Button>: <Button type="submit"className="mt-6" fullWidth>
              Register
            </Button>}
            
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
            <Link to="/login"> Sign In</Link>   
              </a>
            </Typography>
          </form>
        </Card>
      );
}

export default SignupForm