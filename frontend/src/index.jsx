import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import reducer, { actions } from "./slices/index.js";
import { configureStore } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const store = configureStore({
  reducer,
});

const socket = io();
const socketApi = {
  sendMessage: async (payload) => await socket.emit("newMessage", payload),
  addChannel: async (payload) => await socket.emit("newChannel", payload),
  removeChannel: async (payload) => await socket.emit("removeChannel", payload),
  renameChannel: async (payload) => {
    console.log("renaming", payload);
    await socket.emit("renameChannel", payload);
  },
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { socketApi };
