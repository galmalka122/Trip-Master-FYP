import React from "react";
import {LinkContainer} from 'react-router-bootstrap'
import { Nav } from "react-bootstrap";
import useAuth from "../../core/hooks/useAuth";
/**
 * A reusable navigation link component
 * @param {string} to - The link to navigate to
 * @param {JSX.Element} children - The link to navigate to
 * @returns {JSX.Element} - A navigation link component
 */
const Navlink = ({ to, children ,requireAuth}) => {
    const {isLoggedIn} = useAuth();
    return (requireAuth === null || requireAuth === isLoggedIn) && (<LinkContainer to={to}>
            <Nav.Link>
                {children}
            </Nav.Link>
        </LinkContainer>
    );
};

export default Navlink;
