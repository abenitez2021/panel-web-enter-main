import React, { useEffect, useState, useContext } from "react";
import { MakeTables } from "../../components/MaterialTables/MakeTables";
import { useStyles } from "../../assets/styles/CustomStyles";
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import {
  alertWarningError
} from "../../components/Notificaciones";
import AccesoDenegado from "../../components/AccesoDenegado";
import UserContext from "../../utils/user/UserContext";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircle";

import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

import {
  red,
} from "@material-ui/core/colors";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import logoW from '../../assets/images/ci_frontal.png'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AvatarIcon from "../../assets/images/avatar.png";
import { Chip, Box } from "@material-ui/core";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const initFiltro = {
  fechaDesde: null,
  fechaHasta: null,
  idRol: null,
  marcacion: null,
  idDependencia: null,
};



export default function ListaAccesoUsuarios() {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    content: [],
  });
  const [isLoadingEstado, setIsLoadingEstado] = useState(false);
  const [isLoadingComercio, setIsLoadingComercio] = useState(false);
  const [quitarFitro, setQuitarFiltro] = useState(false);


  const [comercio, setComercio] = useState({});
  const [dashboard, setDashboard] = useState({});
  const [listComercio, setListComercio] = useState([]);

  const [estado, setEstado] = useState({});
  const [listEstado, setListEstado] = useState([]);
  const [filtro, setFiltro] = useState(initFiltro);

  useEffect(() => {
    getPedido();
  }, []);


  const getFiltro = async (props) => {
    setData({ ...data, content: [] });
    setIsLoading(true);
    setQuitarFiltro(true);


    let url =
      "marcacion/listar";
    try {
      const response = await axios.post(url, filtro);
      let status = response.status;
      if (status === 200) {
        const filtroResponse = response.data;
        console.log(filtroResponse);
        setData({
          ...data,
          content: filtroResponse?.result,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        alertWarningError(error.response);
      }
    }
  };


  const getPedido = async () => {
    setIsLoading(true);
    setQuitarFiltro(false);
    setFiltro(initFiltro);
    setComercio({})
    setEstado({})
    let url =
      "marcacion/listar";
    try {
      const response = await axios.post(url, initFiltro);
      let status = response.status;
      if (status === 200) {
        const pedidos = response.data;
        setData({
          ...data,
          content: pedidos?.result,
        });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        alertWarningError(error.response);
      }
    }
  };

  const handleExportPDF = () => {
    console.log("esto es data.content ", data.content);
    const doc = new jsPDF();

    // Obtén la fecha y hora actual
    const dateTime = new Date().toLocaleString().replace(/:|\s|,|-/g, '_'); // Formatea la fecha y hora para que sea adecuada como nombre de archivo


     // Título sobre el head
    doc.setFontSize(16);
    doc.text('REGISTRO DE MARCACIONES ', 60, 10); // Ajusta las coordenadas y el tamaño de fuente

    const tableData = data.content.map((row) => {
      return [
        row.idMarcacion,
        row.entrada || "-",
        row.salida || "-",
        row.nombre,
        row.apellido,
        row.documento,
        row.celular,
        row.rol,
        // Eliminamos row.urlFoto de aquí
      ];
    });
  
    const tableHeader = columns
      .filter((column) => column.title !== 'Foto') // Eliminamos la columna 'urlFoto'
      .map((column) => column.title);
  
    doc.autoTable({
      head: [tableHeader], // Usamos tableHeader en lugar de columns
      body: tableData,
    });

    const fileName = `REGISTRO-DE-MARCACIONES_${dateTime}.pdf`;

    doc.save(fileName);
  };



  const handleFechaDesde = (event) => {
    if (event.target.value === "") {
      let copyInput = { ...filtro, fechaDesde: "" };
      setFiltro(copyInput);
    } else {
      let copyInput = { ...filtro, fechaDesde: event.target.value };
      setFiltro(copyInput);
    }


  };

  const handleFechaHasta = (event) => {
    if (event.target.value === "") {
      let copyInput = { ...filtro, fechaHasta: "" };
      setFiltro(copyInput);
    } else {
      let copyInput = { ...filtro, fechaHasta: event.target.value };
      setFiltro(copyInput);
    }
  };

  const title = (
    <>
      <Grid container spacing={3} style={{ padding: "15px 0px" }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            variant="outlined"
            id="fecha"
            name="fecha"
            label="Desde"
            type="date"
            size="small"
            onChange={(e) => handleFechaDesde(e)}
            defaultValue={filtro.fechaDesde}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            variant="outlined"
            id="fecha"
            name="fecha"
            label="Hasta"
            type="date"
            size="small"
            onChange={(e) => handleFechaHasta(e)}
            defaultValue={filtro.fechaHasta}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={6}md={6} lg={6} xl={6}>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            //style={{ color: lightGreen[700] }}
            startIcon={<AddIcon />}
            onClick={() => getFiltro()}
          >
            Filtrar
          </Button>
          {quitarFitro && (
            <Tooltip title="Quitar filtros" arrow>
              <IconButton
                aria-label="detalle"
                size="small"
                className={classes.iconButton}
                onClick={() => {

                  getPedido();
                }}
              >
                <CloseIcon style={{ color: red[600] }} />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
    </>
  );

  const columns = [
    {
      title: "ID Marcación",
      field: "idMarcacion",
      width: "2%",
      // hidden: true,
    },// se oculta la foto de usuario
    // {
    //   title: "Foto",
    //   field: "foto",
    //   width: "5%",
    //   render: (rowData) => {
    //     if (rowData?.foto === null) {
    //       return (
    //         <img
    //           style={{ height: 40, borderRadius: "5%" }}
    //           src={`${logoW}`}
    //         />
    //       )
    //     } else {
    //       let imag = rowData?.foto?.split(",")
    //       return (
    //         < img
    //           style={{ height: 40, borderRadius: "5%" }}
    //           src={`${imag ? imag[0] : rowData?.urlFotos}`}
    //           onError={(e) => {
    //             e.target.src = AvatarIcon; // Establece el AvatarIcon si la carga de la imagen falla
    //           }}
    //         />
    //       )
    //     }
    //   }

    // },
    {
      title: "Entrada",
      field: "entrada",
      width: "2%",
      render: rowData => rowData.entrada || "-"

    },
    {
      title: "Salida",
      field: "salida",
      width: "2%",
      render: rowData => rowData.salida || "-"

    },
    {
      title: "Nombre",
      field: "nombre",
      width: "5%",
      render: rowData => rowData.nombre
    },
    {
      title: "Apellido",
      field: "apellido",
      width: "5%",
      render: rowData =>  rowData.apellido
    },
    {
      title: "Nro Documento",
      field: "documento",
      width: "5%",
    },
    {
      title: "Celular",
      field: "celular",
      width: "10%",
    },
    {
      title: "Rol",
      field: "rol",
      width: "10%",
    },
    
  ];
  const options = {
    filtering: false,
    exportButton: false,
    exportAllData: false,
    headerStyle: { position: "sticky", top: 0 },
    maxBodyHeight: "65vh",
    paging: true,
    // searchFieldAlignment:"left",
    //    showTitle:false,
    draggable: false,
    rowStyle: {
      fontSize: "small",
    },
  };
  const actions = [
    {
      icon: "save",
      tooltip: "place-holder",
      onClick: (event, rowData) => alert("You saved " + rowData.name),
      hidden: true,
    },
    {
      icon: "save",
      tooltip: "FreeActions-place-holder",
      isFreeAction: true,
      onClick: (event, rowData) => alert("You saved " + rowData.name),
      hidden: true,
    },
  ];


  return (
    <>
      {userContext.state.nombre !== "" ? (
        <>
            <Grid container spacing={2} justify="center" alignItems="center">

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <List >
                  <ListItem >
                      <ListItemText primary="CONTROL DE ACCESO A USUARIOS" secondary="Visualizá los historicos de accesos de los usuarios del sistema" />
                  </ListItem>
              </List>
              {userContext.state.rol === "Administrador" && (
                <Box pl={1} pr={1}>
                  <Chip
                    onClick={() => handleExportPDF()}
                    label="Exportar Datos"
                    variant="outlined"
                    color="primary"
                  />
                </Box> 
              )}
            </Grid>


            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <MakeTables
                isLoading={isLoading}
                title={title}
                columns={columns}
                data={data.content}
                actions={actions}
                classes={classes}
                options={options}
                componentsAssets={{
                  classes,
                  //  detalle,
                  //eliminar,
                  //agregar,
                  //childrenAccions,
                  // childrenToolbar,
                }}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <AccesoDenegado />
      )}
    </>
  );
}
