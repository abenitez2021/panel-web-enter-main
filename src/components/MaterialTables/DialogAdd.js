import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { BotonGris, BotonVerde } from "../../assets/styles/StyledButtons";
import { Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
// import { dialogoStyles } from "../../assets/styles/CustomStyles";

export function DialogAdd(props) {
  /**
   * @param {boolean} open muestra el dialogo en pantalla
   * @param {boolean} onClose muestra el dialogo en pantalla
   * @param {object} onSetData usamos si el dialogo tiene formulario, por este parametro le enviamos al padre los datos insertado
   */
  const {
    classes,
    open,
    onClose,
    mode,
    defaultValues,
    agregar,
    modificar,
    children,
  } = props;

  // const classesDefault = dialogoStyles();

  const {
    register,
    handleSubmit,
    control,
    errors,
    clearErrors,
    setValue,
    getValues,
  } = useForm({
    defaultValues: defaultValues,
  });

  const myOnClose = () => {
    onClose();
  };

  const onSubmit = (data) => {
    const submit =
      mode === "U"
        ? (data) => {
            modificar(data, defaultValues.nroItem);
          }
        : mode === "I"
        ? (data) => {
            agregar(data);
          }
        : () => {};
    submit(data);
    // }
    return onClose();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      onClose={onClose}
      // style={{ minHeight: "80vh", maxHeight: "80vh" }}
    >
      <DialogTitle
        style={{ backgroundColor: "#EE273E", color: "#fff" }}
        id="alert-dialog-title"
      >
        {mode === "U" ? "MODIFICAR ITEM" : "INCLUIR NUEVO ITEM"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          {children({
            classes,
            mode,
            register,
            control,
            errors,
            clearErrors,
            setValue,
            getValues,
          })}
        </DialogContent>
        <DialogActions>
          <Grid>
            <BotonVerde type="submit">
              GUARDAR
            </BotonVerde>
            <BotonGris  onClick={myOnClose}>
              SALIR
            </BotonGris>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export function useDialogAdd(props) {
  const { open, mode, defaultValues } = props || {};
  const [dialog, setDialog] = React.useState({
    open: open ? open : false,
    mode: mode ? mode : "I",
    defaultValues: defaultValues ? defaultValues : undefined,
  });

  function OpenClose(open) {
    if (open !== undefined) {
      setDialog({ ...dialog, open: open });
    } else {
      setDialog({ ...dialog, open: dialog.open === false ? true : false });
    }
  }
  function setMode(mode) {
    if (mode !== undefined) {
      setDialog({ ...dialog, open: true, mode: mode });
    }
  }
  function setDefaultValues(props) {
    const mode = props.mode || "I";
    const defaultValues = props.defaultValues || {};
    setDialog({
      ...dialog,
      defaultValues: defaultValues,
      mode: mode,
      open: true,
    });
  }
  const handleClose = () => {
    setDialog({
      open: false,
      mode: "",
      data: "",
    });
  };

  return {
    open: dialog.open,
    mode: dialog.mode,
    defaultValues: dialog.defaultValues,
    OpenClose: OpenClose,
    setMode: setMode,
    setDefaultValues: setDefaultValues,
    handleCloseDialog: handleClose,
    dialog: dialog,
    setDialog: setDialog,
  };
}
