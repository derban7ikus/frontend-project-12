import { Formik, Form, Field, ErrorMessage } from "formik";
import login from "../login.jfif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth.js";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        setAuthFailed(false);
        try {
          const response = await axios.post("/api/v1/login", values);
          auth.logIn(response.data);
          navigate("/");
        } catch (err) {
          if (err.response.status === 401) {
            setAuthFailed(true);
          }
          console.error(err);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t("loginPage.title")}</h1>
          <div className="form-floating mb-3">
            <Field
              id="username"
              name="username"
              type="text"
              placeholder={t("loginPage.username")}
              className="form-control"
              required
            />
            <label htmlFor="username">{t("loginPage.username")}</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              id="password"
              name="password"
              type="password"
              placeholder={t("loginPage.password")}
              className="form-control"
              required
            />
            <label htmlFor="password">{t("loginPage.password")}</label>
            {authFailed && (
              <ErrorMessage name="password" className="invalid-feedback">
                {t("errors.loginError")}
              </ErrorMessage>
            )}
          </div>
          <button
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
            disabled={isSubmitting}
            data-form-type="action,login"
            data-kwimpalastatus="dead"
          >
            {t("loginPage.button")}
          </button>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={login} alt={t("loginPage.title")}></img>
              </div>
              <SignUpForm />
            </div>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>{t("loginPage.message")}</span>{" "}
              <a href="/signup">{t("loginPage.registrationLink")}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
