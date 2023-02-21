import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
const System = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //   if (!isLoggedIn) {
  //     return <Navigate to="/login" />;
  //   }

  useEffect(() => {
    dispatch(actions.getCategory());
  }, [isLoggedIn]);
  return (
    <div className="flex h-screen w-screen bg-white ">
      {isShowSidebar && <Sidebar />}
      <div className="flex flex-col w-full overflow-auto">
        <Header setIsShowSidebar={setIsShowSidebar} />
        <div className="p-9 bg-slate-200 flex-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
