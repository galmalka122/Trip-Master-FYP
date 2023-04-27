import React from "react";


const Navlink = (props)=>{
    return (<a className="nav-link" href={props.link}>{props.text}</a>)
}

export default Navlink;