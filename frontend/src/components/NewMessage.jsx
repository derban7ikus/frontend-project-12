import * as yup from "yup";
import React, { useEffect, useRef } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ArrowRightSquare } from "react-bootstrap-icons";
import { useFormik } from "formik";
import { socketApi } from "../index.jsx";
import useAuth from "../hooks/useAuth.js";

const NewMessage = ({ channel }) => {
  const {
    user: { user },
  } = useAuth();
  const inputRef = useRef(null);

  const f = useFormik({
    initialValues: { body: "" },
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId: channel.id,
        username: user,
      };
      try {
        await socketApi.sendMessage(message);
        console.log(message);
        f.resetForm();
      } catch (err) {
        console.log(err);
      }
      f.setSubmitting(false);
    },
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [channel]);

  const isInvalid = !f.dirty || !f.isValid;

  return (
    <Form
      noValidate
      className="py-1 border rounded-2"
      onSubmit={f.handleSubmit}
    >
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          ref={inputRef}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.body}
          name="body"
          aria-label={"Новое сообщение"}
          disabled={f.isSubmitting}
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" type="submit" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{"Отправлено"}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessage;
