import { Formik, useField, ErrorMessage, Form } from "formik";
import login from "../login.jfif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth.js";
import { object, string, ref } from "yup";

const InputValidation = object().shape({
  name: string()
    .min(3, "От 3 до 20 символов")
    .max(20, "От 3 до 20 симоволов")
    .required("Обязательное поле"),
  password: string()
    .min(6, "Не менее 6 символов")
    .required("Обязательное поле"),
  confirmPassword: string()
    .required("Подтвердите пароль")
    .oneOf([ref("password")], "Пароли должны совпадать"),
});

const Input = ({ name, label, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="form-floating mb-3">
      <input
        className={`form-control ${
          meta.error && meta.touched ? "is-invalid" : ""
        }`}
        {...field}
        {...props}
      />
      <label className="form-label" htmlFor={field.name}>
        {label}
      </label>
      <ErrorMessage
        className="invalid-tooltip"
        name={field.name}
        component="div"
      />
    </div>
  );
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const handleSubmit = async ({ name, password }) => {
    try {
      await axios
        .post("/api/v1/signup", { username: name, password })
        .then((r) => {
          console.log(r);
          if (r.status === 201) {
            navigate("/");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={login} alt="Войти"></img>
              </div>
              <Formik
                initialValues={{ name: "", password: "", confirmPassword: "" }}
                onSubmit={handleSubmit}
                validationSchema={InputValidation}
              >
                {() => {
                  return (
                    <Form className="w-50">
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <Input name="name" label="Имя пользователя" />
                      <Input name="password" label="Пароль" type="password" />
                      <Input
                        name="confirmPassword"
                        label="Подтвердите пароль"
                        type="password"
                      />
                      <button
                        type="submit"
                        className="w-100 mb-3 btn btn-outline-primary"
                        data-form-type="action,login"
                        data-kwimpalastatus="dead"
                      >
                        Зарегистрироваться
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          <div className="card-footer p-4">
            <div className="text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
