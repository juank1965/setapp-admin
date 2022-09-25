import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";
import MenuDown from "./MenuDown";
import { auth } from "../assets/firebase/configuracion";
import { useNavigate } from "react-router-dom";

function PanelDeControl() {
  let navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

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
