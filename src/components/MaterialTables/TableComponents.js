import React from "react";
import AddIcon from "@material-ui/icons/AddCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import { IconButton } from "@material-ui/core";
import { BotonVerde } from "../../assets/styles/StyledButtons";
import {
  Editar,
  Eliminar,
  Detalle,
  Desactivar,
  Activar
} from "../../assets/styles/StyledIcons";
import Tooltip from "@material-ui/core/Tooltip";
import { MTableToolbar } from "material-table";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import InfoIcon from "@material-ui/icons/Visibility";
import Slide from "@material-ui/core/Slide";
import BlockIcon from '@material-ui/icons/Block';
import FinalizarIcon from '@material-ui/icons/AssignmentTurnedIn';
import Search from '@material-ui/icons/Search';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Cancelar from '@material-ui/icons/Cancel';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { teal, grey,cyan, green } from '@material-ui/core/colors';


export default function TableComponent(props) {
  const {
    classes,
    toolTips,
    detalle,
    editar,
    eliminar,
    desactivar,
    activar,
    asignar,
    agregar,
    anular,
    cancelar,
    finalizar,
    masInfo,
    incluir,
    generar,
    childrenAccions,
    childrenToolbar,
    extraData,
  } = props;

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    Action: (props) => (
      <>
        {props.action.tooltip === "FreeActions-place-holder" && masInfo && (
          <>
            <Tooltip
              title={
                toolTips && toolTips.masInfo
                  ? toolTips.masInfo
                  : "Mas Información"
              }
              arrow
            >
              <IconButton
                aria-label="detalle"
                size="small"
                className={classes.iconButton}
                onClick={() => {
                  handleClickOpen();
                }}
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              onClose={handleClose}
              keepMounted
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle
                style={{ backgroundColor: "#EE273E", color: "#fff" }}
                id="alert-dialog-title"
              >
                MAS INFORMACIÓN
              </DialogTitle>
              <DialogContent>{masInfo(props)}</DialogContent>
            </Dialog>
          </>
        )}

        {props.action.tooltip === "place-holder" && (
          <>
            {editar && (
              <Tooltip
                title={toolTips && toolTips.editar ? toolTips.editar : "Editar"}
                arrow
              >
                <IconButton
                  aria-label="editar"
                  size="small"
                  className={classes.iconButton}
                  onClick={(event) => editar(event, props)}
                >
                  <Edit style={{ color: teal[600] }} />
                </IconButton>
              </Tooltip>
            )}

            {detalle && (
              <Tooltip
                title={
                  toolTips && toolTips.detalle ? toolTips.detalle : "Detalle"
                }
                arrow
              >
                <IconButton
                  aria-label="detalle"
                  size="small"
                  className={classes.iconButton}
                  onClick={(event) => detalle(event, props)}
                >
                  <InfoIcon style={{ color: cyan[800] }}/>
                </IconButton>
              </Tooltip>
            )}
            {desactivar && (
              <Tooltip
                title={
                  toolTips && toolTips.desactivar ? toolTips.desactivar : "Desactivar"
                }
                arrow
              >
                <IconButton
                  aria-label="desactivar"
                  size="small"
                  className={classes.iconButton}
                  onClick={(event) => desactivar(event, props)}
                >
                  <Desactivar />
                </IconButton>
              </Tooltip>
            )}
             {activar && (
              <Tooltip
                title={
                  toolTips && toolTips.activar ? toolTips.activar : "Activar"
                }
                arrow
              >
                <IconButton
                  aria-label="activar"
                  size="small"
                  className={classes.iconButton}
                  onClick={(event) => activar(event, props)}
                >
                  <Activar />
                </IconButton>
              </Tooltip>
            )}
               {asignar && (
              <Tooltip
                title={
                  toolTips && toolTips.asignar ? toolTips.asignar : "Asignar a cartera"
                }
                arrow
              >
                <IconButton
                  aria-label="asignar"
                  size="small"
                  className={classes.iconButton}
                  onClick={(event) => asignar(event, props)}
                >
                  <BusinessCenterIcon  style={{ color: cyan[600] }}/>
                </IconButton>
              </Tooltip>
            )}
            {agregar && (
              <Tooltip
                title={
                  toolTips && toolTips.agregar ? toolTips.agregar : "Agregar usuraio"
                }
                arrow
              >
                <IconButton
                  aria-label="agregar"
                  size="small"
                  className={classes.iconButton}
                  onClick={(event) => agregar(event, props)}
                >
                  <PersonAddIcon  style={{ color: green[600] }}/>
                </IconButton>
              </Tooltip>
            )}
            {anular && (
              <Tooltip
                title={
                  toolTips && toolTips.anular ? toolTips.anular : "Anular"
                }
                arrow
              >
                <IconButton
                  aria-label="anular"
                  size="small"
                  className={classes.iconButton}
                  onClick={(event) => anular(event, props)}
                >
                  <BlockIcon />
                </IconButton>
              </Tooltip>
            )}
            {cancelar && (
              <Tooltip
                title={
                  toolTips && toolTips.cancelar ? toolTips.cancelar : "Cancelar"
                }
                arrow
              >
                <IconButton
                  aria-label="cancelar"
                  size="small"
                  className={classes.iconButton}
                  onClick={(event) => cancelar(event, props)}
                >
                  <Cancelar />
                </IconButton>
              </Tooltip>
            )}
            {finalizar && (
              <Tooltip
                title={
                  toolTips && toolTips.finalizar ? toolTips.finalizar : "Finalizar contrato"
                }
                arrow
              >
                <IconButton
                  aria-label="finalizar"
                  size="small"
                  className={classes.iconButton}
                  onClick={(event) => finalizar(event, props)}
                >
                  <FinalizarIcon />
                </IconButton>
              </Tooltip>
            )}
            {eliminar && (
              <Tooltip
                title={
                  toolTips && toolTips.eliminar ? toolTips.eliminar : "Eliminar"
                }
                arrow
              >
                <IconButton
                  aria-label="eliminar"
                  size="small"
                  className={classes.iconButton}
                  onClick={(event) => eliminar(event, props)}
                >
                  <Delete  style={{ color: grey[600] }}/>
                </IconButton>
              </Tooltip>
            )}
            {childrenAccions && childrenAccions(props)}
          </>
        )}
      </>
    ),
    Toolbar: (props) => (
      <>
        <MTableToolbar {...props} />
        {incluir && (
          <BotonVerde
            className={classes.button}
          //  startIcon={<AddIcon />}
            onClick={() => incluir(props)}
          >
            INCLUIR
          </BotonVerde>
        )}
        {generar && (
          <BotonVerde
            className={classes.button}
            //startIcon={<SettingsIcon />}
            onClick={() =>
              generar.funcion ? generar.funcion(props) : generar(props)
            }
          >
            {generar.titulo ? generar.titulo : "GENERAR"}
          </BotonVerde>
        )}
        {childrenToolbar && childrenToolbar({ ...props, extraData })}
      </>
    ),
  };
}
