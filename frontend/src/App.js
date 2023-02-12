import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthContext from './context/index.js';
import useAuth from "./hooks/useAuth.js";
import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Main from "./components/Main.jsx";
import Login from "./components/Login.jsx";
import ErrorPage from './components/error-page.jsx';
import reducer, { actions } from "./slices/index.js";
import { configureStore } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const AuthContextProvider = ({ children }) => {
  const authData = JSON.parse(localStorage.getItem('user'));
  const [ user, setUser ] = useState(authData ? { user: authData.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };
  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return userData.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };
  return (
    <AuthContext.Provider value={{ user, logIn, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  )
};

const AuthOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={'/login'} />;
};

function App() {
  const store = configureStore({
    reducer,
  });
  const socket = io();

  socket.on("newMessage", (payload) => {
    console.log("yeah");
    store.dispatch(actions.addMessage({ payload }));
  });

  socket.on("error", (error) => {
    console.log(error);
  });
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Navbar />
          <Routes>
            <Route path='/' element={<AuthOutlet />}>
              <Route path='' element={<Main />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
