import React from 'react';

/**
 * The ErrorPage component is responsible for rendering the 404 error page
 * in case a user navigates to a non-existent page.
 *
 * @returns {JSX.Element} - An error page component.
 */
function ErrorPage() {

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"><span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                </p>
                <a href="/" className="btn btn-primary">Fly Home</a>
            </div>
        </div>
    );
}

export default ErrorPage;
