import "./LoginForm.css";
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import isEmail from 'validator/lib/isEmail';
import { Password } from "primereact/password";
import {InputText} from "primereact/inputtext";
import { Divider } from 'primereact/divider';
import FormContainer from "../form/FormContainer";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import useAuth from "../../core/hooks/useAuth";
import {Message} from "primereact/message";
const DEFAULT_VALUES = { username: '', email: '', password:'', confirmPassword:'' };

function Register() {
    const { registerHandler } = useAuth();
    const navigate = useNavigate();
    const form = useForm({DEFAULT_VALUES});

    const [errMsg, setErrMsg] = useState(null);

    const onSubmit = async (data) => {
        setErrMsg(null);
        try {
            await registerHandler(data)
            navigate('/login')
        }
        catch (err) {
                setErrMsg('Invalid username or password');
            }
    };


    const validateEmail = (value) => {
        // Custom validation logic for email
        if (!value) {
            return 'Please enter your email.';
        }
        if (!isEmail(value)) {
            return 'Invalid email address.';
        }
        return true; // Validation passed
    };

    const footer = (
        <>
            <Divider />
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );

    // Watch the value of the password field
    const password = form.watch('password', '');

    const getFormErrorMessage = (name) => {
        return form.formState.errors[name] ? <small className="p-error">{form.formState.errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <FormContainer title="Register" image="/assets/img/login.png">
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-fluid">
                {errMsg && (<Message severity="error" text={errMsg} />)}{errMsg && (<Message severity="error" text={errMsg} />)}
                <Controller
                    name="username"
                    control={form.control}
                    rules={{ required: 'Please enter a username' ,pattern:{
                        value: /^[a-zA-Z0-9_]{5,20}$/, // Regex pattern for alphanumeric and underscore, 3-20 characters
                        message: 'Username must be alphanumeric and between 5-20 characters',
                    }}}
                    render={({ field, fieldState }) => (
                        <InputText
                            id={field.name}
                            value={field.value}
                            className={classNames({ 'p-invalid': fieldState.error })}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder="username"
                        />)}
                />
                {getFormErrorMessage('username')}
                <Controller
                    name="email"
                    control={form.control}
                    rules={{ required:'Please enter your email',validate:validateEmail }}
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
                    control={form.control}
                    rules={{ required:'Please enter a password',
                        pattern:{
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: 'Password is not strong enough.',
                    }
                    }}

                    render={({ field, fieldState }) => (
                        <Password
                            id={field.name}
                            value={field.value}
                            footer={footer}
                            placeholder="Password"
                            toggleMask
                            className={classNames({ 'p-invalid': fieldState.error })}
                            onChange={(e) => field.onChange(e.target.value)}
                        />)}
                />
                {getFormErrorMessage('password')}
                <Controller
                    name="confirmPassword"
                    control={form.control}
                    rules={{
                        required: 'Confirm Password is required',
                        validate: (value) =>
                            value === password || 'Passwords do not match',
                    }}
                    render={({ field, fieldState }) => (
                        <Password
                            id={field.name}
                            value={field.value}
                            placeholder="Confirm password"
                            className={classNames({ 'p-invalid': fieldState.error })}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabled={!password}
                        />)}
                />
                {getFormErrorMessage('confirmPassword')}
                <div className="flex justify-content-between gap-3">
                    <Button label="Reset" severity="info" outlined  type="reset" icon="pi pi-delete-left" onClick={form.reset} />
                    <Button label="Submit" severity="info" outlined  type="submit" icon="pi pi-check" />
                </div>
            </form>
            <p className="mt-3">
                Already registered?
                <span className="ml-2 ">
                            <Link to="/login">Sign In</Link>
                        </span>
            </p>
        </FormContainer>
    )
}

export default Register;