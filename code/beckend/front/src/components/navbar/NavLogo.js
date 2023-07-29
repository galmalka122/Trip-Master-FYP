import React from "react";
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSuitcase} from "@fortawesome/free-solid-svg-icons";
/**
 * Component that renders the navigation logo.
 */
const NavLogo = ()=>{
    return (
        <LinkContainer key={"brand"} to="/">
            <Navbar.Brand>
                <div className="d-flex justify-content-center align-items-center me-2 ">
            <span className="bg-transparent bs-icon-circle shadow bs-icon mr-1 ">
                <FontAwesomeIcon icon={faSuitcase} mask="fa-regular fa-circle" style={{color:"#3763f4"}}/>
            </span>
                    <span>TripMaster</span>
                </div>
            </Navbar.Brand>
        </LinkContainer>
    )
}

export default NavLogo;