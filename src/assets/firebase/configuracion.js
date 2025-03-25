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
// CONSTANTES PARA EL PROGRAMA DE REFERIDOS
const VIAJES = [import.meta.env.VITE_REFERIDOS_VIAJES];
const VALOR = [import.meta.env.VITE_REFERIDOS_VALOR];

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
    }
    actualizar(usuarios);
    localStorage.setItem("reservas", JSON.stringify(usuarios));
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
    }
    actualizar(usuarios);
    localStorage.setItem("reservas", JSON.stringify(usuarios));
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
    }
    actualizar(conductores);
    localStorage.setItem("conductores", JSON.stringify(conductores));
  });
};
// Metodo para obtener listado de Conductores Nuevos Registrados para envío de correo
export const getConductoresNuevos = (actualizar) => {
  const q = query(
    collection(db, "conductores"),
    where("validado", "==", false),
    where("fotosVehiculo", "==", false),
    where("documentosVehiculo", "==", false),    
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
    }
    actualizar(conductores);
  });
};
// Metodo para obtener listado de Conductores Registrados Sin Validar
export const getConductoresPorValidar = (actualizar) => {
  const q = query(
    collection(db, "conductores"),
    where("validado", "==", false),
    where("fotosVehiculo", "==", true),
    where("documentosVehiculo", "==", true),
    where("perfil", "==", true)
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
    }
    actualizar(conductores);
    localStorage.setItem("conductores", JSON.stringify(conductores));
  });
};
// Método para obtener listado de conductores con 100 viajes o más a los que no se les haya pagado la recompensa
export const getConductoresPorRecompensar = (actualizar) => {
  const q = query(
    collection(db, "conductores"),
    where("viajesRealizados", ">=", VIAJES),
    where("comisionPagadaAReferente", "==", false)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const conductores = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().referidoPor !== "setapp") {
        conductores.push(doc.data());
      }
    });
    if (conductores.length > 0) {
      conductores.sort(function (a, b) {
        if (a.referidoPor == b.referidoPor) {
          return 0;
        }
        if (a.referidoPor < b.referidoPor) {
          return -1;
        }
        return 1;
      });
    }
    actualizar(conductores);
    localStorage.setItem(
      "conductoresPorRecompensar",
      JSON.stringify(conductores)
    );
  });
};
// Validar el conductor al revisar sus documentos y fotos
export const validarConductor = async (id) => {
  const validarConductorRef = doc(db, "conductores", id);
  await updateDoc(validarConductorRef, {
    validado: true,
    documentosVehiculo: true,
    suspendido: false,
  });
};
// Validar al usuario Operador despues de enviar correo de bienvenida solicitando RUT
export const validarUsuario = async (id) => {
  const validarUsuarioRef = doc(db, "usuarios", id);
  await updateDoc(validarUsuarioRef, { nuevo: false });
};
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
    }
    actualizar(validar);
    localStorage.setItem("validar", JSON.stringify(validar));
  });
};

// PROBAR Metodo Validate --- valida el pago por epayco
export const validate = async (id, number) => {
  const validarRef = doc(db, "services", id);
  await updateDoc(validarRef, { epaycoNumber: number, estado: "reservado" });
};

// Metodo para obtener todos los servicios pagados por validar para guías
export const getForValidateGuias = (actualizar) => {
  const q = query(collection(db, "services"), where("estadoOfertaGuia", "==", "validar"));
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
    }
    actualizar(validar);
    localStorage.setItem("validarPagoGuia", JSON.stringify(validar));
  });
};

// PROBAR Metodo Validate --- valida el pago por epayco para Guías
export const validateGuias = async (id, number) => {
  const validarRef = doc(db, "services", id);
  await updateDoc(validarRef, { epaycoNumberGuia: number, estadoOfertaGuia: "reservado" });
};

// Metodo getForAdvance -- Lista los servicios a los que se les puede pagar el anticipo a conductores
export const getForAdvance = (actualizar) => {
  const q = query(
    collection(db, "services"),
    //where("estado", "==", "confirmado"),
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
    }
    actualizar(validar);
    localStorage.setItem("validarAnticipoConductor", JSON.stringify(validar));
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
// Metodo getForAdvanceGuias -- Lista los servicios a los que se les puede pagar el anticipo a guías
export const getForAdvanceGuias = (actualizar) => {
  const q = query(
    collection(db, "services"),
    //where("estado", "==", "confirmado"),
    where("pagarAnticipoGuia", "==", true),
    where("anticipoGuiaPagado", "==", false)
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
    }
    actualizar(validar);
    localStorage.setItem("validarAnticipoGuia", JSON.stringify(validar));
  });
};
// PROBAR Metodo advanceGuia -- Registra la informacion del numero de transferencia con el que se paga el anticipo al guía
export const advanceGuia = async (id, number, valorPagado) => {
  const valorPagadoFormateado = new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 0,
  }).format(valorPagado);
  const advanceRef = doc(db, "services", id);
  await updateDoc(advanceRef, {
    transaccionPagoAnticipoGuiaNumero: number,
    anticipoGuiaPagado: true,
    valorAnticipoGuiaPagado: valorPagadoFormateado,
  });
};

//Metodo getForTotalPay -- Lista los servicios a los que se les puede pagar el saldo final a conductores
export const getForTotalPay = (actualizar) => {
  const q = query(
    collection(db, "services"),
    //where("estado", "==", "confirmado"),
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
    }
    actualizar(validar);
    localStorage.setItem("validarPagoFinalConductores", JSON.stringify(validar));
  });
};
//Metodo getForTotalPayGuia -- Lista los servicios a los que se les puede pagar el saldo final a Guías
export const getForTotalPayGuias = (actualizar) => {
  const q = query(
    collection(db, "services"),
    //where("estado", "==", "confirmado"),
    where("pagarSaldoGuia", "==", true),
    where("saldoGuiaPagado", "==", false)
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
    }
    actualizar(validar);
    localStorage.setItem("validarPagoFinalGuia", JSON.stringify(validar));
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
//  PROBAR Metodo totalPayGuias -- Registra la informacion del numero de transferencia con el que se cancela la totalidad del servicio al Guía
export const totalPayGuia = async (id, number, saldoPagado) => {
  const saldoPagadoFormateado = new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 0,
  }).format(saldoPagado);
  const pagoTotalRef = doc(db, "services", id);
  await updateDoc(pagoTotalRef, {
    transaccionPagoTotalGuiaNumero: number,
    saldoGuiaPagado: true,
    valorSaldoPagadoGuia: saldoPagadoFormateado,
  });
};
// Registrar pago de recompensa -- OJO REVISAR
export const totalPayReward = async (id, number, referente) => {
  //TODO - Con id busco el conductor actual y actualizo el campo comisionPagadaAReferente a true
  // actualizo el campo transaccionPagoRecompensaNumero con number
  const comisionPagadaRef = doc(db, "conductores", id);
  await updateDoc(comisionPagadaRef, {
    comisionesPagadasAReferente: true,
    transaccionPagoRecompensaNumero: number,
  });
  // con referente.id busco el conductor que refirió y actualizo campo comisionesTotalesPagadas
  const actualizarSaldoRef = doc(db, "conductores", referente.id);
  await updateDoc(actualizarSaldoRef, {
    comisionesTotalesPagadas: referente.comisionesTotalesPagadas + VALOR,
  });
};
// Obtener conductor a recompensar
export const conductorARecompensar = (codigo, referente) => {
  const q = query(collection(db, "conductores"), where("codigo", "==", codigo));
  const conductor = [];
  querySnapshot.forEach((doc) => {
    conductor.push(doc.data());
  });
  if (conductor.length > 0) {
    conductor.sort(function (a, b) {
      if (a.id == b.id) {
        return 0;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 1;
    });
  }
  referente(conductor);
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
    }
    actualizar(confirmados);
    localStorage.setItem("confirmados", JSON.stringify(confirmados));
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
    }
    actualizar(reservas);
    localStorage.setItem("reservas", JSON.stringify(reservas));
  });
};

// Metodo para obtener todos los servicios de transporte Pendientes 
export const getForPedidosPendientes = (actualizar) => {
  const pedidos = []
  const qp = query(
    collection(db, "services"),
    where("estado", "==", "pendiente")
  );
  const qv = query(
    collection(db, "services"),
    where("estado", "==", "validar")
  );
  const unsubscribep = onSnapshot(qp, (querySnapshot) => {    
    querySnapshot.forEach((doc) => {
      pedidos.push(doc.data());
    });    
  });
  const unsubscribev = onSnapshot(qv, (querySnapshot) => {    
    querySnapshot.forEach((doc) => {
      pedidos.push(doc.data());
    });    
  });
  if (pedidos.length > 0) {
    pedidos.sort(function (a, b) {
      if (a.fechaSalida == b.fechaSalida) {
        return 0;
      }
      if (a.fechaSalida < b.fechaSalida) {
        return -1;
      }
      return 1;
    });
  }
  actualizar(pedidos);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
};

// Metodo para obtener todos los servicios Finalizados
export const getForFinalizados = (actualizar) => {
  const q = query(
    collection(db, "services"),
    where("estado", "==", "finalizado")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const finalizados = [];
    querySnapshot.forEach((doc) => {
      finalizados.push(doc.data());
    });
    if (finalizados.length > 0) {
      finalizados.sort(function (a, b) {
        if (a.fechaSalida == b.fechaSalida) {
          return 0;
        }
        if (a.fechaSalida < b.fechaSalida) {
          return -1;
        }
        return 1;
      });
    }
    actualizar(finalizados);
    localStorage.setItem("finalizados", JSON.stringify(finalizados));
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

// Métodos para gestionar los Guías Turísticos

// Obtener la lista de gúias registrados
export const getGuias = (actualizar) => {
  const q = query(
    collection(db, "guias"),
    where("validado", "==", true),
    where("documentosGuia", "==", true),    
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const guias = [];
    querySnapshot.forEach((doc) => {
      guias.push(doc.data());
    });
    if (guias.length > 0) {
      guias.sort(function (a, b) {
        if (a.nombre == b.nombre) {
          return 0;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 1;
      });
    }
    actualizar(guias);
    localStorage.setItem("guiasRegistrados", JSON.stringify(guias));
  });
};
// Metodo para obtener listado de Guías Nuevos Registrados para envío de correo
export const getGuiasNuevos = (actualizar) => {
  const q = query(
    collection(db, "guias"),
    where("validado", "==", false),   
    where("perfil", "==", false)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const guias = [];
    querySnapshot.forEach((doc) => {
      guias.push(doc.data());
    });
    if (guias.length > 0) {
      guias.sort(function (a, b) {
        if (a.nombre == b.nombre) {
          return 0;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 1;
      });
    }
    actualizar(guias);
  });
};
// Metodo para obtener listado de Guias Registrados Sin Validar
export const getGuiasPorValidar = (actualizar) => {
  const q = query(
    collection(db, "guias"),
    where("validado", "==", false),    
    where("perfil", "==", true)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const guias = [];
    querySnapshot.forEach((doc) => {
      guias.push(doc.data());
    });
    if (guias.length > 0) {
      guias.sort(function (a, b) {
        if (a.nombre == b.nombre) {
          return 0;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 1;
      });
    }
    actualizar(guias);
    localStorage.setItem("guiasPorValidar", JSON.stringify(guias));
  });
};
// Validar al Guía al revisar sus documentos y fotos
export const validarGuia = async (id) => {
  const validarGuiaRef = doc(db, "guias", id);
  await updateDoc(validarGuiaRef, {
    validado: true,
    documentosGuia: true,
    suspendido: false,
  });
};