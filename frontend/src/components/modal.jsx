import * as yup from "yup";
import React, { useState, useRef, useEffect, useSelector } from "react";
import { Form, Button, Modal, Dropdown } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";
import { ModalHeader, ModalTitle } from "react-bootstrap";
import { useFormik } from "formik";
import { socketApi } from "../index.jsx";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AddChannelModal = (channelsNames) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const inputRef = useRef(null);

  // const validationSchema = (channels) =>
  //   yup.object.shape({
  //     name: yup.string().required().notOneOf(channels),
  //   });

  const f = useFormik({
    initialValues: { body: "" },
    onSubmit: async ({ body }) => {
      const channel = {
        name: body,
      };
      try {
        await socketApi.addChannel(channel);
        f.resetForm();
        handleClose();
        toast(t("toastify.addChannel"));
      } catch (err) {
        console.log(err);
      }
    },
  });

  //useEffect(() => inputRef.current.focus());

  return (
    <>
      <Button
        type="button"
        variant="group-vertical"
        className="p-0 text-primary"
        onClick={handleOpen}
      >
        <PlusSquare />
        <span className="visually-hidden">+</span>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>{t("modal.addChannel")}</ModalTitle>
        </ModalHeader>
        <Modal.Body>
          <Form onSubmit={f.handleSubmit}>
            <Form.Group>
              <Form.Control
                className="mb-2"
                ref={inputRef}
                onChange={f.handleChange}
                name="body"
                value={f.values.body}
                disabled={f.isSubmitting}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onCLick={handleClose} className="secondary">
            {t("modal.cancelButton")}
          </Button>
          <Button onClick={f.handleSubmit} className="primary">
            {t("modal.submitButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DropdownModals = ({ channelId }) => {
  const { t } = useTranslation();
  const [showDelete, setShowDelete] = useState(false);
  const [showRename, setShowRename] = useState(false);

  const handleOpenDelete = () => {
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleOpenRename = () => {
    setShowRename(true);
  };
  const handleCloseRename = () => {
    setShowRename(false);
  };

  const f = useFormik({
    initialValues: { body: "" },
    onSubmit: async ({ body }) => {
      const channel = {
        name: body,
        id: channelId,
      };
      try {
        await socketApi.renameChannel(channel);
        console.log("rename", channel);
        f.resetForm();
        handleCloseRename();
        toast(t("toastify.renameChannel"));
      } catch (err) {
        console.log(err);
        toast(t("toastify.unknownError"));
      }
    },
  });

  return (
    <>
      <Dropdown.Menu>
        <Dropdown.Item as="button" onClick={handleOpenDelete}>
          {t("modal.deleteButton")}
        </Dropdown.Item>
        <Modal show={showDelete} onHide={handleCloseDelete}>
          <ModalHeader closeButton>
            <ModalTitle>{t("modal.deleteChannel")}</ModalTitle>
          </ModalHeader>
          <Modal.Body>
            <p className="lead">{t("modal.confirmation")}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onCLick={handleCloseDelete} className="btn-secondary">
              {t("modal.cancelButton")}
            </Button>
            <Button
              onClick={() => {
                socketApi.removeChannel({ id: channelId });
                handleCloseDelete();
                toast(t("toastify.removeChannel"));
              }}
              className="btn-danger"
            >
              {t("modal.deleteButton")}
            </Button>
          </Modal.Footer>
        </Modal>
        <Dropdown.Item onClick={handleOpenRename}>Переименовать</Dropdown.Item>
        <Modal show={showRename} onHide={handleCloseRename}>
          <ModalHeader closeButton>
            <ModalTitle>{t("modal.renameChannel")}</ModalTitle>
          </ModalHeader>
          <Modal.Body>
            <Form onSubmit={f.handleSubmit}>
              <Form.Group>
                <Form.Control
                  className="mb-2"
                  onChange={f.handleChange}
                  name="body"
                  value={f.values.body}
                  disabled={f.isSubmitting}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onCLick={handleCloseRename} className="secondary">
              {t("modal.cancelButton")}
            </Button>
            <Button onClick={f.handleSubmit} className="primary">
              {t("modal.submitButton")}
            </Button>
          </Modal.Footer>
        </Modal>
      </Dropdown.Menu>
    </>
  );
};

export { AddChannelModal, DropdownModals };
