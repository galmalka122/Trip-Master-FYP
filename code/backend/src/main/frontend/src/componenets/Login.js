import axios from "axios";
import { useForm } from "react-hook-form";
import Card from "./Card";

export default function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    const res = await axios.post("/api/user/login", data, {
      withCredentials: true,
    });
    console.log(res.data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          aria-invalid={errors.username ? "true" : "false"}
          {...register("username", { required: true })}
        ></input>
        <label htmlFor="username">Username</label>

        {/* use aria-invalid to indicate field contain error */}
        <input
          id="username"
          aria-invalid={errors.username ? "true" : "false"}
          {...register("username", { required: true })}
        />
        <label htmlFor="password">Password</label>

        {/* use aria-invalid to indicate field contain error */}
        <input
          id="password"
          type="password"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", { required: true })}
        />

        {/* use role="alert" to announce the error message */}
        {errors.username && errors.username.type === "required" && (
          <span role="alert">This is required</span>
        )}
        {errors.password && errors.password.type === "required" && (
          <span role="alert">This is required</span>
        )}

        <input type="submit" />
      </form>
    </Card>
  );
}
