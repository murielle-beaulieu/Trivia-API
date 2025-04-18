import { useState } from "react";
import { LoginData } from "../components/LoginForm/login-schema";
import LoginForm from "../components/LoginForm/LoginForm";
// import RegisterForm from "../components/RegisterForm/RegisterForm";
// import { RegisterData } from "../components/RegisterForm/register-schema";

import { useDispatch } from "react-redux";
import { setCredentials } from "../state/auth/authSlice";
import { useLoginMutation } from "../state/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function AuthPage() {
  const navigate = useNavigate();
  // option to login or to register
  const [authAction, setAuthAction] = useState("login");

  const [loginMutation] = useLoginMutation();
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

  // function handleRegister(data: RegisterData) {
  //   console.log(data);
  // }

  return (
    <>
      <NavBar>
        <button onClick={() => setAuthAction("login")}>login</button>
        <button onClick={() => setAuthAction("register")}>register</button>
      </NavBar>
      {authAction == "login" && (
        <div>
          <LoginForm onSubmit={handleLogin} />
        </div>
      )}
      {authAction == "register" && (
        <div>
          <h2>Register</h2>
          {/* <RegisterForm onSubmit={handleRegister} /> */}
        </div>
      )}
    </>
  );
}

export default AuthPage;
