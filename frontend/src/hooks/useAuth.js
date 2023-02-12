import AuthContext from "../context/index.js";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export default useAuth;
