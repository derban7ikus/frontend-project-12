import React, { useEffect, useRef } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ArrowRightSquare } from "react-bootstrap-icons";
import { Formik, Field } from "formik";
import { socketApi } from "../index.jsx";
import useAuth from "../hooks/useAuth.js";
import { useTranslation } from "react-i18next";

const NewMessage = ({ channel }) => {
  const { t } = useTranslation();
  const {
    user: { user },
  } = useAuth();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [channel]);

  return (
    <Formik
      initialValues={{ body: "" }}
      onSubmit={async ({ body }, { resetForm, setSubmitting }) => {
        const message = {
          body,
          channelId: channel.id,
          username: user,
        };
        try {
          await socketApi.sendMessage(message);
          resetForm();
        } catch (err) {
          console.log(err);
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting, dirty, isValid }) => {
        const isInvalid = !dirty || !isValid;

        return (
          <Form
            noValidate
            className="py-1 border rounded-2"
            onSubmit={handleSubmit}
          >
            <InputGroup hasValidation={isInvalid}>
              <Field name="body">
                {({ field }) => (
                  <Form.Control
                    ref={inputRef}
                    {...field}
                    disabled={isSubmitting}
                    placeholder={t("mainPage.newMessage")}
                    className="border-0 p-0 ps-2"
                  />
                )}
              </Field>
              <Button
                variant="group-vertical"
                type="submit"
                disabled={isInvalid || isSubmitting}
              >
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">{"Отправлено"}</span>
              </Button>
            </InputGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewMessage;
