import './LoginForm.css';
import { useState} from "react";
import FormContainer from "../form/FormContainer";
import {Controller, useForm} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../core/hooks/useAuth';
import {Message} from "primereact/message";
/**
 * The Login component renders a form to allow users to log in
 * It uses the AuthContext to check if the user is already authenticated and to update the context after a successful login.
 * The form consists of two input fields, email and password, and a submit button.
 * When the user submits the form, it sends a POST request to the server to authenticate the user.
 * The form also displays error messages to the user in case of invalid credentials or other errors.
 * Once the user is authenticated, it redirects the user to the home page.
 *
 * @returns {JSX.Element} - Rendered component with login form UI
 */
function Login() {
    const { loginHandler } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const defaultValues = {  email: '', password:'', persist: false };
    const { handleSubmit, control, formState: { errors }, reset } = useForm({defaultValues});

    const [errMsg, setErrMsg] = useState(null);

    const from = location.state?.from?.pathname || "/";
    const to = from === '/login' ? '/' : from;

    const onSubmit = async (data) => {
        setErrMsg(null);
        try {
            await loginHandler(data);
            navigate(to, { replace: true });
        }
        catch (err) {
                setErrMsg('Invalid username or password');
        }

    };


    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <FormContainer title="Login" image="/assets/img/login.png">
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                {errMsg && (<Message severity="error" text={errMsg} />)}
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Please enter your email." }}
                    render={({ field, fieldState }) => (
                        <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({ 'p-invalid': fieldState.error })}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder="Email"
                        />)}
                />
                {getFormErrorMessage('email')}
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Please enter your password.' }}
                    render={({ field, fieldState }) => (
                        <Password
                            id={field.name}
                            value={field.value}
                            placeholder="Password"
                            toggleMask
                            feedback={false}
                            className={classNames({ 'p-invalid': fieldState.error })}
                            onChange={(e) => field.onChange(e.target.value)}
                        />)}
                />
                {getFormErrorMessage('password')}
                <Controller
                    name="persist"
                    control={control}
                    render={({ field }) => (

                        <div className="text-color-secondary mb-3">
                            <label htmlFor={field.name}>
                                <Checkbox
                                    inputId={field.name}
                                    checked={field.value}
                                    inputRef={field.ref}
                                    onChange={(e) => field.onChange(e.checked)}
                                />
                                <span className="ml-2">Remember me on this machine</span>
                            </label>
                        </div>)}
                />
                <div className="flex justify-content-between gap-3">
                    <Button label="Reset" severity="info" outlined  type="reset" onClick={reset} icon="pi pi-delete-left" />
                    <Button label="Submit" severity="info" outlined  type="submit" icon="pi pi-check" />
                </div>
            </form>
            <p className="mt-3">
                Not registered?
                <span className="ml-2 ">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </FormContainer>
    )
}

export default Login;
