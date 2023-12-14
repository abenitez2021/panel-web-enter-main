import React, { useEffect, useState, useContext, useRef } from "react";
import { MakeTables } from "../../components/MaterialTables/MakeTables";
import { useStyles } from "../../assets/styles/CustomStyles";
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import {
  alertWarningError,
} from "../../components/Notificaciones";
import AccesoDenegado from "../../components/AccesoDenegado";
import UserContext from "../../utils/user/UserContext";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid, Box } from "@material-ui/core";

import AvatarIcon from "../../assets/images/avatar.png";
import logoW from '../../assets/images/ci_frontal.png'
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { Typography, Chip } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Select , FormControl,InputLabel,MenuItem} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { notificacionAlerta } from "../../components/Notificaciones";
import swal from "sweetalert";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import CircularProgress from "@material-ui/core/CircularProgress";

const initFiltro = {
  idRol: null,
  estado: null,
  
};

const inicialValue = {
  documento: "",
  password: "",
  nombre: "",
  apellido: "",
  idRol: "",
  idTipoDocumento: 1,
  tipoDocumento: "ID",
  email: "",
  celular: "",
  telefono: "",
  codigoNacionalidad: "PRY",
  nacionalidad: "PARAGUAYA",
  fechaNacimiento: "",
  fechaExpiracionDocumento: "",
  fechaEmision: "",
  sexo: "",
  estadoCivil: ""
};

const inicialScannerValue = {
 
  nombre: null,
  apellido: null,
  documento: null,
  password: "",
  idRol: "",
  email: "",
  idTipoDocumento: 1,
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

// Variables para almacenar valores temporales
const inicialDatosAdicionales = {
  password: "",
  correo: "",
  celular: "",
  idRol: ""
};


export default function ListaUsuarioGuardias() {
  
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    content: [],
  });
  const [dependenciaList, setDependenciaList] = useState({
    content: [],
  });
  const [isLoadingComercio, setIsLoadingComercio] = useState(false);
  const [quitarFitro, setQuitarFiltro] = useState(false);
  const [comercio, setComercio] = useState({});
  const [filtro, setFiltro] = useState(initFiltro);

  const [visitanteAcceso, setVisitanteAcceso] = useState(inicialValue);
  const [visita, setVisita] = useState(inicialScannerValue);
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [tipoRol, setTipoRol] = useState("");
  const [isLoadingDependencia, setIsLoadingDependencia] = useState(false);
  const [rol, setRol] = useState({});
  const [socketConectado, setSocketConectado] = useState(true);
  const [datosAdicionales, setDatosAdicionales] = useState(inicialDatosAdicionales);


  

  useEffect(() => {
    getPedido();
    getRoles();
    //iniciarSocket()
  }, []);


  const getPedido = async () => {
    setIsLoading(true);
    setQuitarFiltro(false);
    setFiltro(initFiltro);
    setComercio({})
    let url =
      "usuarios/listar/";
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

  const getRoles = async () => {
    setIsLoadingDependencia(true);
    let url = "rolespantallas/rol-listar/";
    try {
      const response = await axios.post(url);
      let status = response.status;
      if (status === 200) {
        const dependenciaResponse = response.data;
        setDependenciaList({ ...dependenciaList, content: dependenciaResponse?.result });
        console.log("esto hay en roles", dependenciaResponse?.result)
        setIsLoadingDependencia(false);
      }
    } catch (error) {
      setIsLoadingDependencia(false);
      if (error.response) {
        alertWarningError(error.response);
      }
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


  // Funciones para manejar los cambios en los campos
    const handleChangePassword = (event) => {
      setDatosAdicionales({ ...datosAdicionales, password: event.target.value });
    };
    
    const handleChangeCorreo = (event) => {
      setDatosAdicionales({ ...datosAdicionales, correo: event.target.value });
    };
    
    const handleChangeCelular = (event) => {
      setDatosAdicionales({ ...datosAdicionales, celular: event.target.value });
    };
  

  const onSelectRol = (e, value) => {
    console.log("esto hay en rol", rol)
    if (value && value?.idRol !== rol?.idRol) {
      setRol(value);
      datosAdicionales.idRol = value?.idRol;
      let copyInput = { ...datosAdicionales, idRol: value?.idRol };
      setDatosAdicionales(copyInput);
    }

    if (value === null) {
      setRol({});
      let copyInput = { ...datosAdicionales, idRol: 0 };
      setDatosAdicionales(copyInput);
      //datosAdicionales.idRol = value?.idRol;
      // let copyInput = { ...visitanteAcceso, idRol: 0 };
      // setVisitanteAcceso(copyInput);
    }
  };

  // Función para actualizar los valores de visitanteAcceso
    const actualizarVisitanteAcceso = () => {
      setVisitanteAcceso({
        ...visitanteAcceso,
        password: datosAdicionales.password,
        email: datosAdicionales.correo,
        celular: datosAdicionales.celular,
        idRol: datosAdicionales.idRol
      });
    };


  const handleGuardar = async () => {

    actualizarVisitanteAcceso();

    if (visitanteAcceso.documento === "") {
      // Si documentoestá vacío, muestra un mensaje de error
      swal("Es necesario ingresar el nro. de documento", {
        icon: "warning",
        buttons: false,
        timer: 1500,
      });
      return; // Detiene la ejecución de la función
    }

    if (visitanteAcceso.password === "") {
      // Si el password está vacío, muestra un mensaje de error
      swal("Es necesario ingresar un password", {
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

    if (visitanteAcceso.idRol === "") {
      // Si documentoestá vacío, muestra un mensaje de error
      swal("Es necesario ingresar un rol", {
        icon: "warning",
        buttons: false,
        timer: 1500,
      });
      return; // Detiene la ejecución de la función
    }




    setIsLoading(true);
    let url = "auth/registro/";

    try {
      const response = await axios.post(url, visitanteAcceso);
      let status = response.status;
      if (status === 200) {
        if (response.data?.ok) {
          getLimpiarLecturaFisica()
          setTipoDocumento("")
          setTipoRol("")
          getPedido()
          setVisitanteAcceso(inicialValue)
          setVisita(inicialScannerValue)
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


  //CAMBIOS PARA SOCKET

  const stompClientRef = useRef(null);

  const iniciarSocket=()=>{
    console.log('Socket iniciando.');
    const socket = new SockJS('http://localhost:8087/ws'); // Reemplaza con tu URL y puerto
      const stompClient = Stomp.over(socket);
      stompClientRef.current = stompClient;
      
      // Conectar al servidor
      stompClient.connect({}, (frame) => {
        console.log('Socket Conectado:', frame);


        // Suscribirse a un destino
        stompClient.subscribe('/topic/controlAccesoVisita', (message) => {
          console.log('Socket  Mensaje recibido:', message);
          procesarMensajeSocket(message)
        });

     
      });
  
  }

  const detenerSocket = () => {
    if (stompClientRef.current) {
      stompClientRef.current.disconnect(); // Cierra la conexión del socket
    }
    setSocketConectado(false); // Actualiza el estado para indicar que la conexión del socket está desactivada
  };
  

  const procesarMensajeSocket=(message)=>{

    try {
      const contenido = JSON.parse(message.body);
      //atriburtos: correcto = S o N, conPayload = S o N, payload, idPuesto, fechaHora, 

      if(contenido.correcto!="S"){
        //alert("Error de contenido de mensaje de socket: ");
        return;
      }

      // swal("Información recibida. Fecha "+contenido.fechaHora, {
      //   icon: "success",
      //   buttons: false,
      //   timer: 2000
      // });

      if(contenido.conPayload=="S"){//ya trae la info en el  payload
        //se puede procesar para no llamar mas a la API
        getObtenerScaneado(Number(contenido.idPuesto));

      }else{ //no trae, debe buscar en el API
        getObtenerScaneado(Number(contenido.idPuesto));
      }


      
    } catch (error) {
      alert("Error al procesar message del socket: "+ error);
    }
    
  }  

  const getObtenerScaneado = async (idPuesto) => {
    setIsLoading(true); 

    idPuesto= idPuesto || null;

    let url =
      "visitas/sdk-archivo/";
    try {
      const response = await axios.post(url, {idPuesto: idPuesto});
      let status = response.status;
      if (status === 200) {
        const pedidos = response.data;

        setVisitanteAcceso({...visitanteAcceso,
          nombre: pedidos?.result?.nombre || "",
          apellido: pedidos?.result?.apellido || "",
          documento: pedidos?.result?.documento || "",
          tipoDocumento: pedidos?.result?.tipoDocumento || "ID",
          fechaNacimiento: pedidos?.result?.fechaNacimiento || "",
          codigoNacionalidad: pedidos?.result?.codigoNacionalidad || "",
          nacionalidad: pedidos?.result?.Nacionalidad || "",
          fechaExpiracionDocumento: pedidos?.result?.fechaExpiracionDocumento || "",
          fechaEmision: pedidos?.result?.fechaEmision || "",
          sexo: pedidos?.result?.sexo || "",
          estadoCivil: pedidos?.result?.estadoCivil || "",
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



  const title = (
    <>
      <Grid container spacing={3} style={{ padding: "15px 0px" }}>
  
      </Grid>
    </>
  );

  const columns = [
    {
      title: "Nro. Documento",
      field: "documento",
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
      title: "Celular",
      field: "celular",
      width: "5%",
    },
    {
      title: "Rol",
      field: "rol",
      width: "10%",
    }
    
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
          {/* <Grid container spacing={2} >
           */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <List >
                  <ListItem >
                      <ListItemText primary="USUARIOS" secondary="Visualizá la lista de usuarios del sistema" />
                  </ListItem>
              </List>
            </Grid>
            
          {userContext.state.rol === "Administrador" && (
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
                      <img
                        alt="Foto"
                        src={logoW} // Mostrar la imagen predefinida
                        style={{
                          width: "100%", // Tamaño personalizado
                          height: "100%", // Tamaño personalizado
                        }}
                      />
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
                        <img
                          alt="Frente"
                          src={logoW}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
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
                      <img
                        alt="Dorso"
                        src={logoW}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
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
                      <div style={{ marginTop: 10 }}></div>
                      <TextField
                        size="small"
                        variant="outlined"
                        id="password"
                        name="password"
                        label="Contraseña"
                        value={datosAdicionales.password}
                        onChange={(value) => handleChangePassword(value)}
                        type="text"
                        fullWidth
                      />
                      <div style={{ marginTop: 10 }}></div>
                      <TextField
                        size="small"
                        variant="outlined"
                        id="correo"
                        name="correo"
                        label="correo"
                        value={datosAdicionales.correo}
                        onChange={(value) => handleChangeCorreo(value)}
                        type="text"
                        fullWidth
                      />
                      <div style={{ marginTop: 10 }}></div>
                      <TextField
                        size="small"
                        variant="outlined"
                        id="celular"
                        name="celular"
                        label="celular"
                        value={datosAdicionales.celular}
                        onChange={(value) => handleChangeCelular(value)}
                        type="text"
                        fullWidth
                      />
                
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
                          </Select>
                        </FormControl>
                      </div>
                     

                      <Grid item sm={12} md={12} lg={12} xl={12} style={{ marginTop: 10 }}>
                        <Autocomplete
                          id="idDependencia"
                          size="small"
                          value={rol || ""}
                          onChange={onSelectRol}
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
                              label="rol"
                              name="rol"
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
                        style={{ marginRight: 5, backgroundColor: "rgb(139, 0, 139)", }}
                        color="primary"
                        variant="contained"
                        
                        onClick={() => {
                          handleGuardar();
                        }}
                      >
                        Confirmar
                      </Button>
                    
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ margin: 10 }}
                        onClick={() => {
                          //handleGuardar();
                          getObtenerScaneado();
                        }}
                      >
                        Recuperar documento
                      </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                        style={{ margin: 10 }}
                      onClick={() => iniciarSocket()}
                      title="Iniciar Socket"
                    >
                      Refrescar Conexión
                    </Button>
                    </Grid>
                </Grid>


                

              </CardContent>

            </Card>
          )}


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
          {/* </Grid> */}
        </>
      ) : (
        <AccesoDenegado />
      )}
    </>
  );
}
