import { FormProvider, useForm } from 'react-hook-form';
import Input from "../../common/Input";
import { Checkbox, FormControlLabel } from "@mui/material";
import ActionButton from "../../common/ActionButton";
import "./styles.css";
import { AuthService } from "../../services/loginService";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type loginForm = {
  email: string,
  password: string,
}

export const DefaultLogin: loginForm = {
  email: "",
  password: "",
}

function Login() {
  const navigate = useNavigate()
  const { setIsAuthenticated }: any = useUserContext()
  const authenticationService = new AuthService();

  const methods = useForm({
    defaultValues: DefaultLogin
  })

  const handleSubmit = async (data: any) => {
    const getlogindetails = await authenticationService.login(data)
    if (getlogindetails?.token) {
      localStorage.setItem("token", getlogindetails?.token)
      toast.success('Login success')
      setIsAuthenticated(getlogindetails)
      navigate("/movie")
    } else {
      toast.error(getlogindetails?.message || 'Something went wrong')
    }
  }

  return (
    <FormProvider {...methods}>
      <form className="login-container" onSubmit={methods.handleSubmit(data => handleSubmit(data))}>
        <div className='address-and-contact-form'>
          <h1>Sign In </h1>
          <div className='extra-fields'>
            <Input
              name='email'
              placeholder='Email'
              rules={{
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
            />
            <Input
              name='password'
              type="password"
              placeholder='Password'
              rules={{
                required: "This field is required"
              }}
            />

          </div>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
          <ActionButton text={"Login"} />
        </div>
      </form>
    </FormProvider>
  );
}

export default Login;
