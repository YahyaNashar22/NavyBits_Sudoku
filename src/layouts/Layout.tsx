import { Link, Outlet, useLocation } from "react-router-dom";
import { useGameLogicStore } from "../../store";

const Layout = () => {
  const { clearValues } = useGameLogicStore();
  const location = useLocation();
  return (
    <>
      <header className="header">
        {location.pathname !== "/" && (
          <Link to="/" className="links arrow" onClick={clearValues}>
            &#8592;
          </Link>
        )}
      </header>

      <Outlet />
    </>
  );
};

export default Layout;
