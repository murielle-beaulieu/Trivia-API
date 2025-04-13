import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, schema } from "./login-schema";

interface LoginProps {
  onSubmit: (data: LoginData) => unknown;
}

function LoginForm({onSubmit}: LoginProps) {

    const { handleSubmit, register } = useForm<LoginData>({ resolver: zodResolver(schema) });

    
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Your email:</label>
                <input type="text" {...register("email")}/>
            </div>
            <div>
                <label>Your password:</label>
                <input type="password" {...register("password")}/>
            </div>
            <div>
                <button className="submit">Login</button>
            </div>
        </form>
        </>
    )
}

export default LoginForm;