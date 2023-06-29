// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// Importamos todo lo relativo a la autenticacion
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
// Importamos todo lo relativo a la base de datos
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
// TODO: Falta traer lo relativo al Storage

// Configuracion del proyecto
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// inicializamos la base de datos
export const db = getFirestore(app);
// inicializamos la autenticacion
export const auth = getAuth(app);
// TODO: Falta inicializar el Storage si es requerido
// Creamos las instancias de los proveedores de autenticacion

// Metodo para obtener usuario de la BD
export const getUsuario = async (id) => {
  const docRef = doc(db, "admin", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return data;
};
// Metodo para obtener listado de Nuevos Operadores Registrados
export const getUsuariosNuevos = (actualizar) => {
  const q = query(
    collection(db, "usuarios"),
    where("perfil", "==", true),
    where("nuevo", "==", true)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const usuarios = [];
    querySnapshot.forEach((doc) => {
      usuarios.push(doc.data());
    });
    if (usuarios.length > 0) {
      usuarios.sort(function (a, b) {
        if (a.nombre == b.nombre) {
          return 0;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 1;
      });
      actualizar(usuarios);
      localStorage.setItem("reservas", JSON.stringify(usuarios));
    }
  });
};
// Metodo para obtener listado de Operadores Registrados
export const getUsuarios = (actualizar) => {
  const q = query(
    collection(db, "usuarios"),
    where("perfil", "==", true),
    where("nuevo", "==", false)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const usuarios = [];
    querySnapshot.forEach((doc) => {
      usuarios.push(doc.data());
    });
    if (usuarios.length > 0) {
      usuarios.sort(function (a, b) {
        if (a.nombre == b.nombre) {
          return 0;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 1;
      });
      actualizar(usuarios);
      localStorage.setItem("reservas", JSON.stringify(usuarios));
    }
  });
};
// Metodo para obtener listado de Conductores Registrados
export const getConductores = (actualizar) => {
  const q = query(
    collection(db, "conductores"),
    where("validado", "==", true),
    where("documentosVehiculo", "==", true),
    where("fotosVehiculo", "==", true)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const conductores = [];
    querySnapshot.forEach((doc) => {
      conductores.push(doc.data());
    });
    if (conductores.length > 0) {
      conductores.sort(function (a, b) {
        if (a.nombre == b.nombre) {
          return 0;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 1;
      });
      actualizar(conductores);
      localStorage.setItem("conductores", JSON.stringify(conductores));
    }
  });
};
// Metodo para obtener listado de Conductores Registrados Din Validar
export const getConductoresPorValidar = (actualizar) => {
  const q = query(
    collection(db, "conductores"),
    where("validado", "==", false),
    where("documentosVehiculo", "==", true),
    where("fotosVehiculo", "==", true)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const conductores = [];
    querySnapshot.forEach((doc) => {
      conductores.push(doc.data());
    });
    if (conductores.length > 0) {
      conductores.sort(function (a, b) {
        if (a.nombre == b.nombre) {
          return 0;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 1;
      });
      actualizar(conductores);
      localStorage.setItem("conductores", JSON.stringify(conductores));
    }
  });
};
// Validar el conductor al revisar sus documentos y fotos
export const validarConductor = async(id) =>{
  const validarConductorRef = doc(db, "conductores", id);
  await updateDoc(validarConductorRef, { validado: true });
}
// Validar al usuario Operador despues de enviar correo de bienvenida solicitando RUT
export const validarUsuario = async(id) =>{
  const validarUsuarioRef = doc(db, "usuarios", id);
  await updateDoc(validarUsuarioRef, { nuevo: false });
}
// Metodo para obtener todos los servicios por validar
export const getForValidate = (actualizar) => {
  const q = query(collection(db, "services"), where("estado", "==", "validar"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const validar = [];
    querySnapshot.forEach((doc) => {
      validar.push(doc.data());
    });
    if (validar.length > 0) {
      validar.sort(function (a, b) {
        if (a.fechaSalida == b.fechaSalida) {
          return 0;
        }
        if (a.fechaSalida < b.fechaSalida) {
          return -1;
        }
        return 1;
      });
      actualizar(validar);
      localStorage.setItem("validar", JSON.stringify(validar));
    }
  });
};

// PROBAR Metodo Validate --- valida el pago por epayco
export const validate = async (id, number) => {
  const validarRef = doc(db, "services", id);
  await updateDoc(validarRef, { epaycoNumber: number, estado: "reservado" });
};
// Metodo getForAdvance -- Lista los servicios a los que se les puede pagar el anticipo a conductores
export const getForAdvance = (actualizar) => {
  const q = query(
    collection(db, "services"),
    where("estado", "==", "confirmado"),
    where("pagarAnticipoConductor", "==", true),
    where("anticipoConductorPagado", "==", false)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const validar = [];
    querySnapshot.forEach((doc) => {
      validar.push(doc.data());
    });
    if (validar.length > 0) {
      validar.sort(function (a, b) {
        if (a.fechaSalida == b.fechaSalida) {
          return 0;
        }
        if (a.fechaSalida < b.fechaSalida) {
          return -1;
        }
        return 1;
      });
      actualizar(validar);
      localStorage.setItem("validar", JSON.stringify(validar));
    }
  });
};
// PROBAR Metodo advance -- Registra la informacion del numero de transferencia con el que se paga el anticipo
export const advance = async (id, number, valorPagado) => {
  const valorPagadoFormateado = new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 0,
  }).format(valorPagado);
  const advanceRef = doc(db, "services", id);
  await updateDoc(advanceRef, {
    transaccionPagoAnticipoNumero: number,
    anticipoConductorPagado: true,
    valorAnticipoPagado: valorPagadoFormateado,
  });
};
//Metodo getForTotalPay -- Lista los servicios a los que se les puede pagar el saldo final a conductores
export const getForTotalPay = (actualizar) => {
  const q = query(
    collection(db, "services"),
    where("estado", "==", "confirmado"),
    where("pagarSaldoConductor", "==", true),
    where("saldoConductorPagado", "==", false)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const validar = [];
    querySnapshot.forEach((doc) => {
      validar.push(doc.data());
    });
    if (validar.length > 0) {
      validar.sort(function (a, b) {
        if (a.fechaSalida == b.fechaSalida) {
          return 0;
        }
        if (a.fechaSalida < b.fechaSalida) {
          return -1;
        }
        return 1;
      });
      actualizar(validar);
      localStorage.setItem("validar", JSON.stringify(validar));
    }
  });
};
//  PROBAR Metodo totalPay -- Registra la informacion del numero de transferencia con el que se cancela la totalidad del servicio al conductor
export const totalPay = async (id, number, saldoPagado) => {
  const saldoPagadoFormateado = new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 0,
  }).format(saldoPagado);
  const pagoTotalRef = doc(db, "services", id);
  await updateDoc(pagoTotalRef, {
    transaccionPagoTotalNumero: number,
    saldoConductorPagado: true,
    valorSaldoPagado: saldoPagadoFormateado,
  });
};

// Metodo para obtener todos los servicios Confirmados
export const getForConfirmados = (actualizar) => {
  const q = query(
    collection(db, "services"),
    where("estado", "==", "confirmado")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const confirmados = [];
    querySnapshot.forEach((doc) => {
      confirmados.push(doc.data());
    });
    if (confirmados.length > 0) {
      confirmados.sort(function (a, b) {
        if (a.fechaSalida == b.fechaSalida) {
          return 0;
        }
        if (a.fechaSalida < b.fechaSalida) {
          return -1;
        }
        return 1;
      });
      actualizar(confirmados);
      localStorage.setItem("confirmados", JSON.stringify(confirmados));
    }
  });
};

// Metodo para obtener todos los servicios Reservados
export const getForReservas = (actualizar) => {
  const q = query(
    collection(db, "services"),
    where("estado", "==", "reservado")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const reservas = [];
    querySnapshot.forEach((doc) => {
      reservas.push(doc.data());
    });
    if (reservas.length > 0) {
      reservas.sort(function (a, b) {
        if (a.fechaSalida == b.fechaSalida) {
          return 0;
        }
        if (a.fechaSalida < b.fechaSalida) {
          return -1;
        }
        return 1;
      });
      actualizar(reservas);
      localStorage.setItem("reservas", JSON.stringify(reservas));
    }
  });
};

// Metodo para salir de la aplicacion
export const salir = async () => {
  await signOut(auth)
    .then(() => {
      localStorage.removeItem("usuario");
    })
    .catch((error) => {
      console.log(error);
    });
};
