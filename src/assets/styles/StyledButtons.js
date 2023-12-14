import React from "react";
import Button from "@material-ui/core/Button";
import { useStyles } from "../styles/CustomStyles";

export function BotonVerde({
  children,
  type,
  onClick,
  startIcon,
  variant,
  style,
  size,
  className,
  disabled
}) {
  const classes = useStyles();
  return (
    <Button
      variant={variant ? variant : "outlined"}
      style={style ? style : { backgroundColor: "#43a047", color: "#fff" }}
      size={size ? size : "small"}
      type={type ? type : "button"}
      className={className ? className : ""}
      startIcon={startIcon ? startIcon : ""}
      disabled = {disabled ? disabled : false}
      onClick={
        onClick || type === "submit"
          ? onClick
          : () => {
              alert("El botón no cuenta con ninguna acción.");
            }
      }
    >
      {children}
    </Button>
  );
}

export function BotonGris({
  children,
  type,
  onClick,
  startIcon,
  variant,
  style,
  size,
  className,
  disabled
}) {
  const classes = useStyles();
  return (
    <Button
      variant={variant ? "outlined" : "outlined"}
      style={style ? style : { color: "#fff", backgroundColor: "#616161" }}
      size={size ? size : "small"}
      type={type ? type : "button"}
      className={className ? className : ""}
      startIcon={startIcon ? startIcon : ""}
      disabled = {disabled ? disabled : false}
      onClick={
        onClick || type === "submit"
          ? onClick
          : () => {
              alert("El botón no cuenta con ninguna acción.");
            }
      }
    >
      {children}
    </Button>
  );
}
