import React from "react";
import Icon from "./Icon";


const Navbar = (props)=> {
   return (
       <nav id="mainNav" className="navbar navbar-light navbar-expand-md sticky-top navbar-shrink py-3">
        <div className="container">
            <Icon/>
            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"><span
                className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span>
            </button>
            <div id="navcol-1" className="collapse navbar-collapse">
                <ul className="navbar-nav mx-auto">
                    {props.links}
                </ul>
                {props.buttons}
            </div>
        </div>
    </nav>
   )

}
export default Navbar;