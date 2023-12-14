import React, { useEffect, useState, useContext } from "react";
import { MakeTables } from "../../components/MaterialTables/MakeTables";
import { useStyles } from "../../assets/styles/CustomStyles";
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import { Typography, Chip } from "@material-ui/core";
import {
  alertWarningError,
  notificacionEliminar,
} from "../../components/Notificaciones";
import AccesoDenegado from "../../components/AccesoDenegado";
import UserContext from "../../utils/user/UserContext";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid, Box } from "@material-ui/core";
import AvatarIcon from "../../assets/images/avatar.png";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const initFiltro = {
  fechaDesde: null,
  fechaHasta: null,
  idVisita: null,
  marcacion: "SALIDA",
  documento: null,
  idDependencia: null,
};


export default function ListasSalidasDia() {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    content: [],
  });

  const [isLoadingComercio, setIsLoadingComercio] = useState(false);
  const [quitarFitro, setQuitarFiltro] = useState(false);
  const [comercio, setComercio] = useState({});
  const [filtro, setFiltro] = useState(initFiltro);

  useEffect(() => {
    getPedido();
  }, []);


  const getFiltro = async (props) => {
    setData({ ...data, content: [] });
    setIsLoading(true);
    setQuitarFiltro(true);
    let url =
      "visitas/listar/";
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
    let url =
      "visitas/listar/";
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
    doc.text('SALIDAS REGISTRADAS HOY ', 60, 10); // Ajusta las coordenadas y el tamaño de fuente

    const tableData = data.content.map((row) => {
      return [
        row.idVisita,
        row.entrada || "-",
        row.salida || "-",
        row.nombre,
        row.apellido,
        row.documento,
        row.nacionalidad,
        row.dependencia,
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
    const fileName = `SALIDAS-REGISTRADAS-HOY_${dateTime}.pdf`;

    doc.save(fileName);

  };


  const title = (
    <>
      <Grid container spacing={3} style={{ padding: "15px 0px" }}>
  
      </Grid>
    </>
  );

  const columns = [
    {
      title: "ID Visita",
      field: "idVisita",
      width: "2%",
      // hidden: true,
    },
    {
      title: "Foto",
      field: "urlFoto",
      width: "5%",
      render: (rowData) => {
        if (rowData?.urlFoto === null) {
          return (
            <img
            style={{ height: 50, width: 45, borderRadius: "10%" }}
            src={`${AvatarIcon}`}
            />
          )
        } else {
          let imag = rowData?.foto?.split(",")
          return (
            < img
              style={{ height: 50,width: 45, borderRadius: "10%" }}
              src={`${rowData?.urlFoto}`}
              onError={(e) => {
                e.target.src = AvatarIcon; // Establece el AvatarIcon si la carga de la imagen falla
              }}
            />
          )
        }
      }
      // render: (rowData) => {
      //   if (rowData?.foto === null) {
      //     return (
      //       <img
      //         style={{ height: 40, borderRadius: "5%" }}
      //         src={`${logoW}`}
      //       />
      //     )
      //   } else {
      //     let imag = rowData?.foto?.split(",")
      //     return (
      //       < img
      //         style={{ height: 40, borderRadius: "5%" }}
      //         src={`${imag ? imag[0] : rowData?.urlFotos}`}
      //       />
      //     )
      //   }
      // }

    },
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
      width: "10%",
      render: rowData => rowData.nombre
    },
    {
      title: "Apellido",
      field: "apellido",
      width: "10%",
      render: rowData =>  rowData.apellido
    },
    {
      title: "Nro Documento",
      field: "documento",
      width: "5%",
    },
    {
      title: "Nacionalidad",
      field: "nacionalidad",
      width: "10%",
    },
    {
      title: "Dependencia",
      field: "dependencia",
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

  // const handleDetalle = (event, props) => {
  //   event.stopPropagation();
  //   history.push("./detalle/", props.data);

  // };

  const childrenAccions = (props) => {
    return (
      <>
{/* 
        <Box pl={1} pr={1}>
          <Chip
            onClick={(e) => handleDetalle(e, props)}
            label="Detalle"
            variant="outlined"
            color="primary"
          />
        </Box> */}

      </>
    );
  };

  return (
    <>
      {userContext.state.nombreUsu !== "" ? (
        <>
          <Grid container spacing={2} >
          
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <List >
                  <ListItem >
                      <ListItemText primary="SALIDAS REGISTRADAS HOY" secondary="Visualizá el detalle de todos las salidas de visitantes del dia" />
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
                  childrenAccions,
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
