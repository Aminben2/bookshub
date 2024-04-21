import React from "react";
import { logout } from "../store/AuthSlice";
import { switchTheme } from "../store/ModeSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../partials/Header/Header";

function RootLayout() {
  const dispatch = useDispatch();

  const isDarkMOde = useSelector((state) => state.theme);
  const user = useSelector((state) => state.auth);

  const switchMode = () => {
    dispatch(switchTheme());
  };
  return (
    <div
      className={`root-layout h-screen scroll-smooth ${
        isDarkMOde ? "dark" : ""
      }`}
    >
      <Header isDarkMOde={isDarkMOde} user={user} />
      <Outlet />
    </div>
  );
}

export default RootLayout;
