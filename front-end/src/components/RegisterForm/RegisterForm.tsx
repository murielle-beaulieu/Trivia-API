import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, schema } from "./register-schema";

interface RegisterProps {
  onSubmit: (data: RegisterData) => unknown;
}

function RegisterForm({onSubmit}: RegisterProps) {

    const { handleSubmit, register } = useForm<RegisterData>({ resolver: zodResolver(schema) });
    
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
                <label>Your first name:</label>
                <input type="text" {...register("firstName")}/>
            </div>
            <div>
                <label>Your last name:</label>
                <input type="text" {...register("lastName")}/>
            </div>
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

export default RegisterForm;