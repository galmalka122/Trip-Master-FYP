import { Outlet, Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/places">Search</Link>
          </li>
          <li>
            <Link to="/distance">Distance</Link>
          </li>
          <li>
            <Link to="/directions">Directions</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
