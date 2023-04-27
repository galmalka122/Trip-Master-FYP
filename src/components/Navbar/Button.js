import React from "react";
import "./Button.css"

function Button(props){
    return (<a className="btn btn-primary shadow" role="button" href={props.link}>{props.text}</a>)
}

export default Button;