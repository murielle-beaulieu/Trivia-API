import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../state/auth/authSlice";
import { useLoginMutation, useRegisterMutation } from "../state/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { LoginData } from "../components/LoginForm/login-schema";
import LoginForm from "../components/LoginForm/LoginForm";
import { RegisterData } from "../components/RegisterForm/register-schema";
import RegisterForm from "../components/RegisterForm/RegisterForm";

function AuthPage() {
  const navigate = useNavigate();
  const [authAction, setAuthAction] = useState("login");

  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  
  const dispatch = useDispatch();

  let token = null;

  async function handleLogin(data: LoginData) {
    console.log(data);
    try {
      const userData = await loginMutation({
        email: data.email,
        password: data.password,
      }).unwrap();
      token = userData.token;
      console.log(token);
      // setCredentials should give back the JWT
      dispatch(setCredentials({ token }));
      navigate("/user");
    } catch (e) {
      console.log(e + " dw, you'll get there!");
    }
  }

  async function handleRegister(data: RegisterData) {
    console.log(data);
    try {
      const registerData = await registerMutation({
        firstName: data.firstName,
        gamerTag: data.gamerTag,
        email: data.email,
        password: data.password
      }).unwrap();
      token = registerData.token;
      console.log("yes you can");
    }  catch (e) {
      console.log(e + " dw, you'll get there!");
    }
  }

  return (
    <>
      <NavBar>
        { authAction == "register" ? <button onClick={() => setAuthAction("login")}>login</button> : 
        <button onClick={() => setAuthAction("register")}>register</button> }
      </NavBar>
      {authAction == "login" && (
        <div>
          <LoginForm onSubmit={handleLogin} />
        </div>
      )}
      {authAction == "register" && (
        <div>
          <RegisterForm onSubmit={handleRegister} />
        </div>
      )}
    </>
  );
}

export default AuthPage;
