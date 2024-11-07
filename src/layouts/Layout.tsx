import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <header className="header">
        {location.pathname !== "/" && (
          <Link to="/" className="links arrow">
            &#8592;
          </Link>
        )}
      </header>

      <Outlet />
    </>
  );
};

export default Layout;
