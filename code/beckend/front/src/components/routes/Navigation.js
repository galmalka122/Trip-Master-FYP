import React from "react";
import { Outlet} from "react-router-dom";
import NavButton from "../navbar/NavButton";
import Navlink from "../navbar/Navlink";
import NavLogo from "../navbar/NavLogo";
import {useNavigate} from "react-router";
import {Container, Nav, Navbar} from "react-bootstrap";
import useAuth from "../../core/hooks/useAuth";
/**
 * This is the AppNavbar component that displays the navigation bar of the application. It includes the logo,
 * links to different pages, and authentication buttons depending on whether the user is logged in or not.
 *
 * @returns {JSX.Element} A navbar component.
 */
const Navigation = () => {
    const { auth, isLoggedIn, logoutHandler} = useAuth();
    const navigate = useNavigate();
    const onLogoutClick = async (e)=>{
        e.preventDefault();
        await logoutHandler();
        navigate('/');
    }
    const links = [
        {to:"/", text:"Home", requireAuth: null},
        {to:"/members/trips", text:"Your trips", requireAuth: true},
    ]

    const authLinks = [
        {to:"/register", text:"Sign up", requireAuth: false},
        {to:"/login", text:"Login", requireAuth: false}
    ]

    const navLinks = links.map((link, index) => (
        <Navlink to={link.to} key={`link-${link.to}`} requireAuth={link.requireAuth}>
            {link.text}
        </Navlink>
    ))

    const authNavLinks = authLinks.map((link, index) => (
        <Navlink to={link.to} key={`link-${link.to}`} requireAuth={link.requireAuth}>
            {link.text}
        </Navlink>));

    return (
        <>
            <Navbar bg="light" expand="lg" sticky="top" className="text-xl">
                <Container fluid>
                    <NavLogo/>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                        <Nav key={"nav-1"} className="me-auto">
                            {navLinks}
                        </Nav>
                        <Nav key={"nav-2"}>
                            {authNavLinks}
                            {isLoggedIn && (
                            <>
                                <Navbar.Text key="user-email">{auth?.email}</Navbar.Text>
                                <NavButton variant="secondary" onClick={onLogoutClick} key="logout-button">
                                    Logout
                                </NavButton>
                            </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
};

export default Navigation;
