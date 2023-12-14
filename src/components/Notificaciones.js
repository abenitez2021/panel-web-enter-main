import SweetAlert from "sweetalert2";
import React from "react";

export function notificacionEliminar(info, url) {
  SweetAlert.fire({
    title: "¡ATENCIÓN!",
    text: info,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#43a047",
    cancelButtonColor: "#616161",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.value) {
      SweetAlert.fire({
        title: "¡OPERACIÓN EXITOSA!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    
  });
}

export function notificacionError(error) {
  SweetAlert.fire({
    icon: "error",
    title: "¡OCURRIO UN ERROR!",
    text: error,
    customClass: { zIndex: 10000 },
  });
}

export function notificacionExitosa(info, url) {
  SweetAlert.fire({
    icon: "success",
    title: "¡OPERACIÓN EXITOSA!",
    text: info,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#43a047",
  }).then(function () {
    if (url) {
      window.location.href = url;
    }
  });
}

export function notificacionAlerta(info) {
  SweetAlert.fire({
    icon: "warning",
    iconColor: "#43a047",
    title: "¡ATENCIÓN!",
    text: info,
    showCloseButton: true,
    showConfirmButton:false

  })
}

export function notificacionWarning(info, url) {
  SweetAlert.fire({
    icon: "warning",
    
    title: "¡ATENCIÓN!",
    text: info,
    showCloseButton: true,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#43a047",
  }).then(function () {
    if (url) {
      window.location.href = url;
    }
  });
}

export function notificacionExitosaV2({ text, afterWork }) {
  SweetAlert.fire({
    icon: "success",
    title: "¡OPERACIÓN EXITOSA!",
    text: text ? text : "Incluido Exitosamente",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#43a047",
  }).then(function () {
    afterWork();
  });
}

export function alertaAceptarCancelar({ text }) {
  return SweetAlert.fire({
    title: "¡ATENCIÓN!",
    iconColor: "#43a047",
    showCancelButton: true,
    text: text,
    icon: "warning",
    confirmButtonColor: "#0c1139",
    cancelButtonColor: "#43a047",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  });
}

export function alertWarningError({ data }) {
  const level = data.level;
  const content = document.createElement("div");
  const list = document.createElement("ul");
  const mensaje = document.createElement("p");

  content.style.cssText = "text-align: left";
  mensaje.style.cssText = "font-weight: bold; text-align: center";
  content.appendChild(mensaje);
  content.appendChild(list);

  mensaje.append(data.message);
  data.errors && data.errors.map((item) => {
    var x = document.createElement("li");
    var t = document.createTextNode(item);
    x.append(t);
    list.appendChild(x);
  });

  return SweetAlert.fire({
    title: level === "WARNING" ? "¡ATENCIÓN!" : "¡OCURRIO UN ERROR!",
    showCancelButton: true,
    html: content,
    icon: level === "WARNING" ? "warning" : "error",
    cancelButtonColor: "#43a047",
    showConfirmButton: false,
    cancelButtonText: "OK",
  });
}
