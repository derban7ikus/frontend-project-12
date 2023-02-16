import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        {auth.user ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              auth.logOut();
              navigate("/");
            }}
          >
            Выйти
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
