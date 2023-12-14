import React, { useEffect, useState, useContext, useRef } from "react";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { MakeTables } from "../../components/MaterialTables/MakeTables";
import { useStyles } from "../../assets/styles/CustomStyles";
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import { Typography, Chip } from "@material-ui/core";
import {
  alertWarningError,
  notificacionEliminar,
  notificacionExitosa
} from "../../components/Notificaciones";
import AccesoDenegado from "../../components/AccesoDenegado";
import UserContext from "../../utils/user/UserContext";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";
import { Grid, Box, Select, FormControl, InputLabel, MenuItem, ListItemIcon } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { red } from "@material-ui/core/colors";
import swal from "sweetalert";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { notificacionAlerta } from "../../components/Notificaciones";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AvatarIcon from "../../assets/images/avatar.png";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const initFiltro = {
  fechaDesde: null,
  fechaHasta: null,
  idVisita: null,
  marcacion: null,
  documento: null,
  idDependencia: null,
};

const inicialValue = {
  codigoTarjeta: "",
  nombre: "",
  apellido: "",
  documento: "",
  tipoDocumento: "ID",
  fechaNacimiento: "",
  idDependencia: "",
  codigoNacionalidad: "PRY",
  nacionalidad: "PARAGUAYA",
  fechaNacimiento: "",
  fechaExpiracionDocumento: "",
  fechaEmision: "",
  sexo: "",
  estadoCivil: "",
  identityCardNumber: "",
  idPuesto: null,
  TransactionID: "1",
  ComputerName: "",
  UserName: "",
  SDKVersion: "",
  FileVersion: "",
  DeviceType: "",
  DeviceNumber: "",
  DeviceLabelNumber: ""
};

const inicialScannerValue = {

  nombre: null,
  apellido: null,
  documento: null,
  tipoDocumento: null,
  foto: null,
  imagenFrente: null,
  imagenDorso: null,
  codigoNacionalidad: null,
  Nacionalidad: "PARAGUAYA",
  fechaNacimiento: null,
  fechaExpiracionDocumento: null,
  fechaEmision: null,
  sexo: null,
  estadoCivil: null,
  identityCardNumber: null,
  info: {
    TransactionID: null,
    DateTime: null,
    ComputerName: null,
    UserName: null,
    SDKVersion: null,
    FileVersion: null,
    DeviceType: null,
    DeviceNumber: null,
    DeviceLabelNumber: null
  }
}

// Variables para almacenar valores temporales
const inicialDatosAdicionales = {
  idDependencia: "",
  codigoTarjeta: "",
};


export default function ListaAccesoVisitantesDos() {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    content: [],
  });
  const [dependenciaList, setDependenciaList] = useState({
    content: [],
  });
  const [isLoadingEstado, setIsLoadingEstado] = useState(false);
  const [isLoadingComercio, setIsLoadingComercio] = useState(false);
  const [quitarFitro, setQuitarFiltro] = useState(false);


  const [tipoDocumento, setTipoDocumento] = useState("");
  const [filtro, setFiltro] = useState(initFiltro);

  const [visitanteAcceso, setVisitanteAcceso] = useState(inicialValue);
  const [visita, setVisita] = useState(inicialScannerValue);

  const [isLoadingDependencia, setIsLoadingDependencia] = useState(false);
  const [dependencia, setDependencia] = useState({});
  const [socketConectado, setSocketConectado] = useState(true);

  useEffect(() => {
    getPedido();
    getDependencia();
    iniciarSocket()
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

  const getObtenerMarcación = async (idPuesto) => {
    setIsLoading(true);

    idPuesto = idPuesto || null;

    let url =
      "visitas/sdk-archivo/";
    try {
      const response = await axios.post(url, { idPuesto: idPuesto });
      let status = response.status;
      if (status === 200) {
        const pedidos = response.data;

        if (!pedidos.result.info || Object.keys(pedidos.result.info).length === 0) {
          // Si info no existe o es un objeto vacío, sal de la función ya que significa que no hay datos para leer
          setIsLoading(false);
          return;
        }
        setVisitanteAcceso((prevVisitanteAcceso) => {
          return {
            ...prevVisitanteAcceso,
            codigoTarjeta: pedidos?.result?.codigoTarjeta || prevVisitanteAcceso.codigoTarjeta,
            nombre: pedidos?.result?.nombre || prevVisitanteAcceso.nombre,
            apellido: pedidos?.result?.apellido || prevVisitanteAcceso.apellido,
            documento: pedidos?.result?.documento || prevVisitanteAcceso.documento,
            tipoDocumento: pedidos?.result?.tipoDocumento || "ID",
            fechaNacimiento: pedidos?.result?.fechaNacimiento || "",
            idDependencia: pedidos?.result?.idDependencia || prevVisitanteAcceso.idDependencia,
            codigoNacionalidad: pedidos?.result?.codigoNacionalidad || "",
            nacionalidad: pedidos?.result?.Nacionalidad || "",
            fechaExpiracionDocumento: pedidos?.result?.fechaExpiracionDocumento || "",
            fechaEmision: pedidos?.result?.fechaEmision || "",
            sexo: pedidos?.result?.sexo || "",
            estadoCivil: pedidos?.result?.estadoCivil || "",
            identityCardNumber: pedidos?.result?.identityCardNumber || "",
            TransactionID: pedidos?.result?.info?.TransactionID || "",
            DateTime: pedidos?.result?.info?.DateTime || "",
            ComputerName: pedidos?.result?.info?.ComputerName || "",
            UserName: pedidos?.result?.info?.UserName || "",
            SDKVersion: pedidos?.result?.info?.SDKVersion || "",
            FileVersion: pedidos?.result?.info?.FileVersion || "",
            DeviceType: pedidos?.result?.info?.DeviceType || "",
            DeviceNumber: pedidos?.result?.info?.DeviceNumber || "",
            DeviceLabelNumber: pedidos?.result?.info?.DeviceLabelNumber || "",
          };
        });

        setVisita(pedidos?.result,
        );

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

  const getLimpiarLecturaFisica = async () => {

    let url =
      "visitas/eliminar-archivos-sdk/";
    try {
      const response = await axios.post(url, initFiltro);
      let status = response.status;
      if (status === 200) {
      }
    } catch (error) {
      if (error.response) {
        alertWarningError(error.response);
      }
    }
  };

  const getDependencia = async () => {
    setIsLoadingDependencia(true);
    let url = "dependencias/listar/";
    try {
      const response = await axios.post(url);
      let status = response.status;
      if (status === 200) {
        const dependenciaResponse = response.data;
        setDependenciaList({ ...dependenciaList, content: dependenciaResponse?.result });
        console.log("esto hay en dependencia", dependenciaResponse?.result)
        setIsLoadingDependencia(false);
      }
    } catch (error) {
      setIsLoadingDependencia(false);
      if (error.response) {
        alertWarningError(error.response);
      }
    }
  };

  const onSelectDependencia = (e, value) => {
    console.log("esto hay en dependencia", dependencia)
    if (value && value?.idDependencia !== dependencia?.idDependencia) {
      setDependencia(value);
      let copyInput = { ...visitanteAcceso, idDependencia: value?.idDependencia };
      setVisitanteAcceso(copyInput);
    }

    if (value === null) {
      setDependencia({});
      let copyInput = { ...visitanteAcceso, idDependencia: 0 };
      setVisitanteAcceso(copyInput);
    }
  };


  const handleChangeNombre = (event) => {
    let copyInput = { ...visitanteAcceso, nombre: event.target.value };
    setVisitanteAcceso(copyInput);
  };

  const handleChangeApellido = (event) => {
    let copyInput = { ...visitanteAcceso, apellido: event.target.value };
    setVisitanteAcceso(copyInput);
  };

  const handleChangeNroDocumento = (event) => {
    let copyInput = { ...visitanteAcceso, documento: event.target.value };
    setVisitanteAcceso(copyInput);
  };

  const handleChangeCodigoTarjeta = (event) => {
    let copyInput = { ...visitanteAcceso, codigoTarjeta: event.target.value };
    setVisitanteAcceso(copyInput);
  };

    // Función para actualizar los valores de visitanteAcceso - DEPRECADO
    // const actualizarVisitanteAcceso = () => {
    //   setVisitanteAcceso({
    //     ...visitanteAcceso,
    //     idDependencia: datosAdicionales.idDependencia,
    //     codigoTarjeta: datosAdicionales.codigoTarjeta
    //   });
    // };



  const handleGuardar = async () => {

    //actualizarVisitanteAcceso();

    console.log("Datos DEPOIS de actualizar", visitanteAcceso);

    if (visitanteAcceso.idDependencia === "") {
      // Si el idDependencia está vacío, muestra un mensaje de error
      swal("Es necesario elegir una dependencia", {
        icon: "warning",
        buttons: false,
        timer: 1500,
      });
      return; // Detiene la ejecución de la función
    }

    if (visitanteAcceso.nombre === "") {
      // Si nombre está vacío, muestra un mensaje de error
      swal("Es necesario elegir el nombre", {
        icon: "warning",
        buttons: false,
        timer: 1500,
      });
      return; // Detiene la ejecución de la función
    }

    if (visitanteAcceso.apellido === "") {
      // Si apellido está vacío, muestra un mensaje de error
      swal("Es necesario ingresar el apellido", {
        icon: "warning",
        buttons: false,
        timer: 1500,
      });
      return; // Detiene la ejecución de la función
    }

    if (visitanteAcceso.documento === "") {
      // Si documentoestá vacío, muestra un mensaje de error
      swal("Es necesario ingresar el nro. de documento", {
        icon: "warning",
        buttons: false,
        timer: 1500,
      });
      return; // Detiene la ejecución de la función
    }

    setIsLoading(true);
    let url = "visitas/registrar-entrada/";

    try {
      const response = await axios.post(url, visitanteAcceso);
      let status = response.status;
      if (status === 200) {
        if (response.data?.ok) {
          getLimpiarLecturaFisica()
          setDependencia({})
          setTipoDocumento("")
          getPedido()
          setVisitanteAcceso(inicialValue)
          setVisita(inicialScannerValue)
          console.log("ESTO ES VISITA DESPUES DE BORRAR ", visita)
          setIsLoading(false);
          swal("¡OPERACIÓN EXITOSA!", {
            icon: "success",
            buttons: false,
            timer: 1500,
          });
          // history.goBack();

        } else {
          setIsLoading(false);
          notificacionAlerta(response.data?.message);
        }


      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        alertWarningError(error.response);
      }
    }
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




  //CAMBIOS PARA SOCKET

  const stompClientRef = useRef(null);

  const iniciarSocket = () => {
    console.log('Socket iniciando.');
    const socket = new SockJS('http://localhost:8087/ws'); // Reemplaza con tu URL y puerto
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    // Conectar al servidor
    stompClient.connect({}, (frame) => {
      console.log('Socket Conectado:', frame);


      // Inicia el intervalo de ping
      // const pingInterval = setInterval(() => {
      //   if (stompClientRef.current.connected) {
      //     stompClientRef.current.send('/app/ping');
      //   }
      // }, 5000); 



      // Suscribirse a un destino
      stompClient.subscribe('/topic/controlAccesoVisita', (message) => {
        console.log('Socket  Mensaje recibido:', message);
        procesarMensajeSocket(message)
      });
      setSocketConectado(true);
    });

  }

  const detenerSocket = () => {
    if (stompClientRef.current) {
      stompClientRef.current.disconnect(); // Cierra la conexión del socket
    }
    setSocketConectado(false); // Actualiza el estado para indicar que la conexión del socket está desactivada
  };


  const procesarMensajeSocket = (message) => {

    try {
      const contenido = JSON.parse(message.body);
      //atriburtos: correcto = S o N, conPayload = S o N, payload, idPuesto, fechaHora, 

      if (contenido.correcto != "S") {
        //alert("Error de contenido de mensaje de socket: ");
        return;
      }

      // swal("Información recibida. Fecha "+contenido.fechaHora, {
      //   icon: "success",
      //   buttons: false,
      //   timer: 2000
      // });

      if (contenido.conPayload == "S") {//ya trae la info en el  payload
        //se puede procesar para no llamar mas a la API
        getObtenerMarcación(Number(contenido.idPuesto));

      } else { //no trae, debe buscar en el API
        getObtenerMarcación(Number(contenido.idPuesto));
      }



    } catch (error) {
      alert("Error al procesar message de socket: " + error);
    }

  }

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

        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
              style={{ height: 50, width: 45, borderRadius: "10%" }}
              src={`${rowData?.urlFoto}`}
              onError={(e) => {
                e.target.src = AvatarIcon; // Establece el AvatarIcon si la carga de la imagen falla
              }}
            />
          )
        }
      }

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
      render: rowData => rowData.apellido
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
    {
      title: "Tarjeta Nro.",
      field: "codigoTarjeta",
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

  const marcarSalidaVisitante = async (props) => {
    setIsLoading(true);
    let url = "/visitas/salida"
    try {
      const response = await axios.post(url,
        {
          idVisita: props?.idVisita
        })

      let status = response.status;
      if (status === 200) {
        getPedido()()
        swal("¡OPERACIÓN EXITOSA!", {
          icon: "success",
          buttons: false,
          timer: 1500,
        });
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        alertWarningError(error.response);
      }
    }
  };

  const handleDarSalidaVisitante = (event, props) => {
    event.stopPropagation();
    swal({
      title: "¡ATENCIÓN!",
      text: `¿Deseas marcar la salida a ${props.data?.nombre} ${props.data?.apellido}?`,
      icon: "warning",
      buttons: true,
      buttons: ["Cancelar", "Confirmar"],
      confirmButtonColor: '#43a047'
    }).then((willDelete) => {
      if (willDelete) {
        marcarSalidaVisitante(props.data)
      }
    });
  };


  const childrenAccions = (props) => {
    return (
      <>
        {props.data?.salida == null ? (
          <>
            <Box pl={1} pr={1}>
              <Chip
                onClick={(e) => handleDarSalidaVisitante(e, props)}
                label="Dar salida"
                variant="contened"
                color="secondary"
              />
            </Box>
          </>
        ) : (
          <Box pl={1} pr={1}></Box>
        )}

      </>
    );
  };

  return (
    <>
      {userContext.state.nombreUsu !== "" ? (
        <>
          <Grid container alignItems="center">
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon style={{ color: socketConectado ? 'green' : 'red' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={socketConectado ? "CONTROL DE ACCESO VIA SCANNER" : "CONTROL DE ACCESO VIA CARGA MANUAL"}
                    secondary="Registra los accesos a las dependencias desde aquí"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Button
                style={{
                  marginRight: 5,
                  backgroundColor: socketConectado ? 'black' : 'green',
                }}
                color="primary"
                variant="contained"
                onClick={() => {
                  if (socketConectado) {
                    detenerSocket();
                  } else {
                    iniciarSocket();
                  }
                }}
              >
                {socketConectado ? 'Cargar Manualmente' : 'Usar Scanner'}
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 5 }}
                onClick={() => {
                  //handleGuardar();
                  getObtenerMarcación();
                }}
              >
                Obtener documentos
              </Button>

              {/* <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ marginRight: 5 }}
                  onClick={() => iniciarSocket()}
                  title="Actualizar conexión"
                >
                  Actualizar conexión
                </Button> */}
            </Grid>
          </Grid>


          <Card >
            <CardContent>

              <Grid container direction="row" justify="center" alignContent="center" spacing={3} style={{ paddingTop: 50 }}  >



                <Grid item xs={3}>
                  <Box mb={3} style={{ textAlign: "-webkit-center" }}>
                    {visita.foto && visita.info ? ( // Validar visita.foto y visita.info
                      <>
                        <img
                          alt="Foto"
                          src={visita.foto}
                          style={{
                            width: "50%", // Tamaño personalizado
                            height: "50%", // Tamaño personalizado
                          }}
                        />
                        <Typography variant="body1">Foto</Typography>
                      </>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, width: "100%", height: "100%", }}></div>

                      // se comenta a pedido de Alejandro, no quiere que se muestre un placeholder de documento
                      // <img
                      //   alt="Foto"
                      //   src={logoW} // Mostrar la imagen predefinida
                      //   style={{
                      //     width: "100%", // Tamaño personalizado
                      //     height: "100%", // Tamaño personalizado
                      //   }}
                      // />
                    )}
                  </Box>
                </Grid>


                <Grid item xs={3}>
                  <Box mb={3} style={{ textAlign: "-webkit-center" }}>
                    {visita.imagenFrente && visita.info ? ( // Validar visita.imagenFrente y visita.info
                      <>
                        <img
                          alt="Frente"
                          src={visita.imagenFrente}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                        <Typography variant="body1">Frente</Typography>
                      </>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, width: "100%", height: "100%", }}></div>

                      // se comenta a pedido de Alejandro, no quiere que se muestre un placeholder de documento
                      // <img
                      //   alt="Frente"
                      //   src={logoW}
                      //   style={{
                      //     width: "100%",
                      //     height: "100%",
                      //   }}
                      // />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={3}>
                  <Box mb={3} style={{ textAlign: "-webkit-center" }}>
                    {visita.imagenDorso && visita.info ? ( // Validar visita.imagenDorso y visita.info
                      <>
                        <img
                          alt="Dorso"
                          src={visita.imagenDorso}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                        <Typography variant="body1">Dorso</Typography>
                      </>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, width: "100%", height: "100%", }}></div>

                      // se comenta a pedido de Alejandro, no quiere que se muestre un placeholder de documento
                      // <img
                      //     alt="Frente"
                      //     src={logoW}
                      //     style={{
                      //       width: "100%",
                      //       height: "100%",
                      //     }}
                      //   />
                    )}
                  </Box>
                </Grid>

              </Grid>

              <Grid container direction="row" justify="center" alignContent="center" spacing={3} style={{ paddingTop: 50 }}>
                <Grid item xs={4} sm={4}>
                  <TextField
                    size="small"
                    autoFocus
                    variant="outlined"
                    id="documento"
                    name="documento"
                    label="Nro. Documento"
                    value={visitanteAcceso.documento}
                    onChange={(value) => handleChangeNroDocumento(value)}
                    type="number"
                    fullWidth
                  />
                 <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                    {((userContext.state.rol === "Administrador") || 
                      (userContext.state.rol === "Guardia" && userContext.state.marcacion === "Entrada")) ? (
                      <Button
                        style={{ width: '100%', backgroundColor: "rgb(139, 0, 139)" }}
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          handleGuardar();
                        }}
                      >
                        Procesar Entrada
                      </Button>
                    ) : (
                      <p>Debes marcar entrada para realizar registros de visitantes</p>
                    )}
                  </div>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                    size="small"
                    variant="outlined"
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={visitanteAcceso.nombre}
                    onChange={(value) => handleChangeNombre(value)}
                    type="text"
                    fullWidth
                    disabled={socketConectado}
                  />
                  <div style={{ marginTop: 10 }}></div>
                  <TextField
                    size="small"
                    variant="outlined"
                    id="apellido"
                    name="apellido"
                    label="Apellido"
                    value={visitanteAcceso.apellido}
                    onChange={(value) => handleChangeApellido(value)}
                    type="text"
                    fullWidth
                    disabled={socketConectado}
                  />
                  {/* Otros campos que desees */}
                  <div style={{ marginTop: 10 }}>
                    <FormControl variant="outlined" fullWidth size="small">
                      <InputLabel shrink={true}>Tipo Documento</InputLabel>
                      <Select
                        label="Tipo Documento"
                        value={!socketConectado ? tipoDocumento : visita.tipoDocumento || ""} // Valor condicional
                        onChange={(event) => {
                          if (!socketConectado) {
                            setTipoDocumento(event.target.value);
                          }
                        }}
                        disabled={socketConectado} // Deshabilita el campo si socketConectado es true
                      >
                        <MenuItem value="ID">C.I.N.</MenuItem>
                        <MenuItem value="PASAPORTE">PASAPORTE</MenuItem>
                        {/* Agrega más opciones según sea necesario */}
                      </Select>
                    </FormControl>
                  </div>

                  <Grid item sm={12} md={12} lg={12} xl={12} style={{ marginTop: 10 }}>
                    <Autocomplete
                      id="idDependencia"
                      
                      size="small"
                      value={dependenciaList?.content.includes(dependencia) ? dependencia : null}
                      onChange={onSelectDependencia}
                      options={dependenciaList?.content}
                      getOptionLabel={(option) =>
                        option.nombre ? option.nombre : ""
                      }
                      renderOption={(option) => (
                        <React.Fragment>{option?.nombre}</React.Fragment>
                      )}
                      isOptionDisabled={(option) => socketConectado}
                      loading={isLoadingDependencia}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Dependencia"
                          name="dependencia"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {isLoadingDependencia ? (
                                  <CircularProgress color="primary" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item sm={12} md={12} lg={12} xl={12} style={{ marginTop: 10 }}>
                        <TextField
                          size="small"
                          autoFocus
                          variant="outlined"
                          id="codigoTarjeta"
                          name="codigoTarjeta"
                          label="Código Tarjeta Visitante"
                          value={visitanteAcceso.codigoTarjeta}
                          onChange={(value) => handleChangeCodigoTarjeta(value)}
                          type="text"
                          fullWidth
                          // inputProps={{
                          //   min: "0", // Establecer el valor mínimo como 0
                          //   step: "1", // Aceptar solo pasos de 1 (enteros)
                          // }}
                        />
                      </Grid>

                </Grid>



              </Grid>




            </CardContent>

          </Card>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <List >
              <ListItem >
                <ListItemText primary="REGISTRO DE ACCESOS" secondary="Visualiza los accesos registrados" />
              </ListItem>
            </List>
          </Grid>

          <Grid container spacing={2} justify="center" alignItems="center">

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
                  childrenAccions
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
