import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import useAuth from "../../core/hooks/useAuth";


/**
 * This Component response on weether to display child component, or to redirect 
 * to the error page, by the user's authentication. 
 */
const RequireAuth = ({shouldBeAuthenticated}) => 
{
    // The user's auth parameters.
    const { auth, isLoggedIn} = useAuth();
    
    const location = useLocation();

    // Check if the user is authenticated
    return isLoggedIn === shouldBeAuthenticated
        ? <Outlet />
        : isLoggedIn //changed from user to accessToken to persist login after refresh
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
}

export default RequireAuth;
