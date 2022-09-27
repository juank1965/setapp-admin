import React from "react";
import { AccountProfile } from "./AccountProfile";
import { PerfilUsuario } from "./PerfilUsuario";

function Perfil() {
  return (
    <div className="bodypanel bodycontent">
      <h2>Cuenta</h2>
      <div>
        <div>
          <AccountProfile />
        </div>
        <div>
          <PerfilUsuario />
        </div>
      </div>
    </div>
  );
}

export default Perfil;
