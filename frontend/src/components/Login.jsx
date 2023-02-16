import { useFormik } from "formik";
import login from "../login.jfif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";
import useAuth from "../hooks/useAuth.js";

const SignUpForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      axios
        .post("/api/v1/login", values)
        .then((response) => {
          auth.logIn(response.data);
          console.log(auth.user);
        })
        .then(() => navigate("/"))
        .catch((err) => {
          if (err.response.status === 401) {
            setAuthFailed(true);
          }
          console.error(err);
        });
    },
  });
  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="col-12 col-md-6 mt-3 mt-mb-0"
    >
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="username"
          name="username"
          type="username"
          placeholder="Ваш ник"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
          required
        />
        <label htmlFor="email">Ваш ник</label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
          required
        />
        <label htmlFor="password">Пароль</label>
        {authFailed ? (
          <Form.Control.Feedback type="invalid" tooltip>
            Неверные имя пользователя или пароль
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
      <button
        type="submit"
        className="w-100 mb-3 btn btn-outline-primary"
        data-form-type="action,login"
        data-kwimpalastatus="dead"
      >
        Войти
      </button>
    </Form>
  );
};

const Login = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={login} alt="Войти"></img>
              </div>
              <SignUpForm />
            </div>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
