import { useState } from "react";
import { LoginData } from "../components/LoginForm/login-schema";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { RegisterData } from "../components/RegisterForm/register-schema";

function AuthPage() {
  // option to login or to register
  const [authAction, setAuthAction] = useState("login");

  function handleLogin(data: LoginData) {
    console.log(data);
  }

  function handleRegister(data: RegisterData) {
    console.log(data);
  }

return (
    <>
    <div>
        <button onClick={() => setAuthAction("login")}>login</button>
        <button onClick={() => setAuthAction("register")}>register</button>
    </div>
    {authAction == "login" &&
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
    }
    {authAction == "register" && 
    <div>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleRegister} />
    </div>
    }
    </>

  );
}

export default AuthPage;
