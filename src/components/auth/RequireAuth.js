import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from "../../core/hooks/useAuth";


const RequireAuth = ({shouldBeAuthenticated}) => {
    const { auth, isLoggedIn} = useAuth();
    const location = useLocation();
    // Check if the user is authenticated, if not, render the child components, otherwise, redirect to the login page
    return isLoggedIn === shouldBeAuthenticated
        ? <Outlet />
        : isLoggedIn //changed from user to accessToken to persist login after refresh
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
}

export default RequireAuth;
