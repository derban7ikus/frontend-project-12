import { Formik, useField, ErrorMessage, Form } from "formik";
import login from "../login.jfif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";
import { useTranslation } from "react-i18next";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const InputValidation = object().shape({
    name: string()
      .min(3, t("errors.nameLengthError"))
      .max(20, t("errors.nameLengthError"))
      .required(t("errors.requiredField")),
    password: string()
      .min(6, t("errors.passwordLengthError"))
      .required(t("errors.requiredField")),
    confirmPassword: string()
      .required(t("errors.confirmPasswordRequired"))
      .oneOf([ref("password")], t("errors.confirmPasswordFail")),
  });

  const Input = ({ name, label, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const { handleBlur } = helpers;
    return (
      <div className="form-floating mb-3">
        <input
          className={`form-control ${
            meta.error && meta.touched ? "is-invalid" : ""
          }`}
          {...field}
          {...props}
          onBlur={handleBlur}
          placeholder={label}
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
                <img src={login} alt={t("registrationPage.title")}></img>
              </div>
              <Formik
                initialValues={{ name: "", password: "", confirmPassword: "" }}
                onSubmit={handleSubmit}
                validationSchema={InputValidation}
              >
                {() => {
                  return (
                    <Form className="w-50">
                      <h1 className="text-center mb-4">
                        {t("registrationPage.title")}
                      </h1>
                      <Input name="name" label={t("registrationPage.name")} />
                      <Input
                        name="password"
                        label={t("registrationPage.password")}
                        type="password"
                      />
                      <Input
                        name="confirmPassword"
                        label={t("registrationPage.confirmPassword")}
                        type="password"
                      />
                      <button
                        type="submit"
                        className="w-100 mb-3 btn btn-outline-primary"
                        data-form-type="action,login"
                        data-kwimpalastatus="dead"
                      >
                        {t("registrationPage.button")}
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
