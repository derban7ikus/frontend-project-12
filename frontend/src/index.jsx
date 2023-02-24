import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import reducer, { actions } from "./slices/index.js";
import { configureStore } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import resources from "./locales/index.js";

const store = configureStore({
  reducer,
});

const socket = io();
const socketApi = {
  sendMessage: async (payload) => await socket.emit("newMessage", payload),
  addChannel: async (payload) => await socket.emit("newChannel", payload),
  removeChannel: async (payload) => await socket.emit("removeChannel", payload),
  renameChannel: async (payload) => await socket.emit("renameChannel", payload),
};

socket.on("newMessage", (payload) => {
  store.dispatch(actions.addMessage({ message: payload }));
});
socket.on("newChannel", (payload) => {
  store.dispatch(actions.addChannel({ channel: payload }));
});
socket.on("removeChannel", (payload) => {
  store.dispatch(actions.removeChannel({ id: payload }));
});
socket.on("renameChannel", (payload) => {
  store.dispatch(actions.renameChannel(payload));
  console.log("renamed", payload);
});

const app = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "ru",
  });
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </React.StrictMode>
  );
};

app();

export { socketApi };
