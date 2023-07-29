import React from "react";
import {Button, Nav} from "react-bootstrap";

/**
 * A button that serves as a navigation link using React Router's Link component
 *
 * @param {string} variant - The path to the target page
 * @param {function} onClick - The text content of the button
 * @param {JSX.Element} children - The text content of the button
 * @returns {JSX.Element} - A nav button component.
 */
function NavButton({ variant, onClick,  children }){
    return (
        <Nav.Item>
                <Button variant={variant} onClick={onClick}>
                    {children}
                </Button>
        </Nav.Item>
    )
}

export default NavButton;
