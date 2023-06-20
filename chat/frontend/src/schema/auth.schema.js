import * as Yup from "yup";

export const signUpSchema = Yup.object({
  fullName: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password").matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    'Password must contain at least 8 characters, one letter, and one number'
  ),
  confirm_password: Yup.string()
    .required('Please enter confirm password')
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password").matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    'Password must contain at least 8 characters, one letter, and one number'
  ),
 
});