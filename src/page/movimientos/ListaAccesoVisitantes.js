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
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircle";

import TextField from "@material-ui/core/TextField";
import { Grid, Box, Select , FormControl,InputLabel,MenuItem} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {red} from "@material-ui/core/colors";
import swal from "sweetalert";
import TypographyBold from "../../components/TypographyBold";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EventIcon from "@material-ui/icons/Event";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import ReplayIcon from '@material-ui/icons/Replay';
import logoW from '../../assets/images/ci_frontal.png'
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from "@material-ui/core/CardContent";
import { notificacionAlerta } from "../../components/Notificaciones";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AvatarIcon from "../../assets/images/avatar.png";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

const initFiltro = {
  fechaDesde: null,
  fechaHasta: null,
  idVisita: null,
  marcacion: null,
  documento: null,
  idDependencia: null,
};

const inicialValue = {
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
        FileVersion:null,
        DeviceType: null,
        DeviceNumber: null,
        DeviceLabelNumber:null
    }
}

export default function ListaAccesoVisitantes() {
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

  useEffect(() => {
    getPedido();
    getDependencia();
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

  const getObtenerMarcación = async () => {
    setIsLoading(true);
    let url =
      "visitas/sdk-archivo/";
    try {
      const response = await axios.post(url, {idPuesto: null});
      let status = response.status;
      if (status === 200) {
        const pedidos = response.data;
        setVisitanteAcceso({
          ...visitanteAcceso,
          nombre: pedidos?.result?.nombre || "",
          apellido: pedidos?.result?.apellido || "",
          documento: pedidos?.result?.documento || "",
          tipoDocumento: pedidos?.result?.tipoDocumento || "ID",
          fechaNacimiento: pedidos?.result?.fechaNacimiento || "",
          idDependencia: pedidos?.result?.idDependencia || "",
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
      let copyInput = { ...visitanteAcceso, idTipoDocumento: 0 };
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


  const handleGuardar = async () => {
    setIsLoading(true);
    let url = "visitas/registrar-entrada/";

    try {
      const response = await axios.post(url, visitanteAcceso);
      let status = response.status;
      if (status === 200) {
        if (response.data?.ok) {
          getPedido()
          setVisitanteAcceso(inicialValue)
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
              style={{ height: 50,width: 45, borderRadius: "10%" }}
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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <List >
                  <ListItem >
                      <ListItemText primary="CONTROL DE ACCESO A VISITANTES" secondary="Registra los accesos a las dependencias desde aquí" />
                  </ListItem>
              </List>
          </Grid>
          
        
          <Card >
            <CardContent>

              <Grid container direction="row" justify="center" alignContent="center" spacing={3} style={{ paddingTop: 50 }}  >
                
                <Grid item xs={3}>
                  <Box mb={3} style={{ textAlign: "-webkit-center" }}>
                    <img alt="Foto" src={ visita?.foto === null ? logoW : visita?.foto } 
                                    style= {{
                                    width: visita?.foto === null ? "100%" : "50%",
                                    height: visita?.foto === null ? "100%" : "50%",
                                    }} />
                    <Typography variant="body1">Foto</Typography>
                  </Box>
                </Grid>

                <Grid item xs={3}>
                  <Box mb={3} style={{ textAlign: "-webkit-center" }}>
                    <img alt="Frente" src={visita?.imagenFrente === null ? logoW : visita?.imagenFrente} style={{ width: "100%", height: "100%" }} />
                    <Typography variant="body1">Frente</Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box mb={3} style={{ textAlign: "-webkit-center" }}>
                    <img alt="Dorso" src={visita?.imagenDorso === null ? logoW : visita?.imagenDorso} style={{ width: "100%", height: "100%" }} />
                    <Typography variant="body1">Dorso</Typography>
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
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<SearchIcon />}
                        onClick={() => {
                         
                        }}
                      >
                        Buscar
                      </Button>
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
                    />
                    {/* Otros campos que desees */}
                    <div style={{ marginTop: 10 }}>
                      <FormControl variant="outlined" fullWidth size="small">
                        <InputLabel>Tipo Documento</InputLabel>
                        <Select
                          label="Tipo Documento"
                          value={tipoDocumento}
                          onChange={(event) => setTipoDocumento(event.target.value)}
                        >
                          <MenuItem value="C.I.N.">C.I.N.</MenuItem>
                          <MenuItem value="PASAPORTE">PASAPORTE</MenuItem>
                          {/* Agrega más opciones según sea necesario */}
                        </Select>
                      </FormControl>
                    </div>
                   
                    <Grid item sm={12} md={12} lg={12} xl={12} style={{ marginTop: 10 }}>
                        <Autocomplete
                          id="idDependencia"
                          size="small"
                          value={dependencia || ""}
                          onChange={onSelectDependencia}
                          options={dependenciaList?.content}
                          getOptionLabel={(option) =>
                            option.nombre ? option.nombre : ""
                          }
                          renderOption={(option) => (
                            <React.Fragment>{option?.nombre}</React.Fragment>
                          )}
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

                  </Grid>

                  
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleGuardar();
                      }}
                    >
                      Procesar Entrada
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      style={{ margin: 10 }}
                      onClick={() => {
                        //handleGuardar();
                        getObtenerMarcación();
                      }}
                    >
                      Recuperar Lectura de documento
                    </Button>
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
