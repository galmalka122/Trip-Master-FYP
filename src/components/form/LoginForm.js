import React, {useState} from 'react';
import FormContainer from "./FormContainer";
import Input from "./Input";


function LoginForm(props) {
    const inputs = [
        <Input label={"Email"} type={"text"} inputMode={"email"}/>,
        <Input label={"Password"} type={"text"} inputMode={"password"}/>
    ]
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    return (
        <FormContainer/>
    );
}

export default LoginForm;