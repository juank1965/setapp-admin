import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";
import MenuDown from "./MenuDown";

function PanelDeControl() {
  return (
    <div className="bodypanelcontrol">
      <MenuBar />
      <div className="bodypanel">
        <Outlet />
      </div>
      <MenuDown />
    </div>
  );
}

export default PanelDeControl;
