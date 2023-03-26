import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <button className="navbar-brand" href="#">
          Navbar
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mx-lg-auto ">
            <li className="nav-item">
              <Link to="/">
                <button className="nav-link bg-transparent border-0 d-inline-block text-dark">
                  Home
                </button>
              </Link>
            </li>
            <li className="nav-item px-lg-1">
              <Link to="/places">
                <button className="nav-link bg-transparent border-0 d-inline-block text-dark">
                  Search
                </button>
              </Link>
            </li>
            <li className="nav-item pe-1">
              <Link to="/distance">
                <button className="nav-link bg-transparent border-0 d-inline-block text-dark">
                  Distance
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/test">
                <button className="nav-link bg-transparent border-0 d-inline-block text-dark">
                  Test
                </button>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav d-flex">
            <li className="nav-item pe-1">
              <Link to="/login">
                <button className="nav-link bg-transparent border-0 d-inline-block text-dark">
                  Login
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup">
                <button className="nav-link bg-transparent border-0 d-inline-block text-dark">
                  Sign up
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
