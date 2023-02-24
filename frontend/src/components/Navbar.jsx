import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t("navbar.title")}
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
            {t("navbar.exitButton")}
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
