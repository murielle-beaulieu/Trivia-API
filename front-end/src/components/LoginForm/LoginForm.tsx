import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, schema } from "./login-schema";
import styles from "./LoginForm.module.scss";

interface LoginProps {
  onSubmit: (data: LoginData) => unknown;
}

function LoginForm({ onSubmit }: LoginProps) {
  const { handleSubmit, register, formState: {errors} } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
        <header className={styles.login_header}>
          <h2>Login</h2>
        </header>
        <div className={styles.field}>
          <label>Email:</label>
          <input type="text" {...register("email")} />
          {errors.email && (
						<small style={{ color: "red" }}>{errors.email.message}</small>
					)}
        </div>
        <div className={styles.field}>
          <label>Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && (
						<small style={{ color: "red" }}>{errors.password.message}</small>
					)}
        </div>
        <div className={styles.submit}>
          <button className="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
