import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, schema } from "./register-schema";
import styles from "./RegisterForm.module.scss";

interface RegisterProps {
  onSubmit: (data: RegisterData) => unknown;
}

function RegisterForm({onSubmit}: RegisterProps) {

    const { handleSubmit, register, formState: {errors} } = useForm<RegisterData>({ resolver: zodResolver(schema) });
    
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.register_form}>
        <header className={styles.register_header}><h2>Register</h2></header>
            <div className={styles.field}>
                <label>Your first name:</label>
                <input type="text" {...register("firstName")}/>
                {errors.firstName && (
						<small style={{ color: "red" }}>{errors.firstName.message}</small>
					)}
            </div>
            <div className={styles.field}>
                <label>Your Username :</label>
                <input type="text" {...register("gamerTag")}/>
                {errors.gamerTag && (
						<small style={{ color: "red" }}>{errors.gamerTag.message}</small>
					)}
            </div>
            <div className={styles.field}>
                <label>Your email:</label>
                <input type="text" {...register("email")}/>
                {errors.email && (
						<small style={{ color: "red" }}>{errors.email.message}</small>
					)}
            </div>
            <div className={styles.field}>
                <label>Your password:</label>
                <input type="password" {...register("password")}/>
                {errors.password && (
						<small style={{ color: "red" }}>{errors.password.message}</small>
					)}
            </div>
            <div className={styles.submit}>
                <button className="submit">Register</button>
            </div>
        </form>
        </>
    )
}

export default RegisterForm;