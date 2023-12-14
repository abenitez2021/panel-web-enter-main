import React, { useState, useEffect, useContext } from "react";
import { useStyles } from "../../assets/styles/CustomStyles";
import { useHistory } from "react-router-dom";

import axios from "../../utils/axios";
import TextField from "@material-ui/core/TextField";
import { Grid, Button, Avatar, Box } from "@material-ui/core";
import { BotonVerde, BotonGris } from "../../assets/styles/StyledButtons";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Upload from "rc-upload";
import { alertWarningError, notificacionAlerta } from "../../components/Notificaciones";
import UserContext from "../../utils/user/UserContext";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SaveIcon from "@material-ui/icons/Save";
import swal from 'sweetalert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BackdropCustom from "../../components/BackdropCustom";


const inicialValue = {
  nombre: "",
  color: ""
};

export default function NuevaDependencia() {
  const history = useHistory();
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [dependencia, setDependencia] = useState(inicialValue);
  const [fotoPerfil, setFotoPerfil] = useState({});


  useEffect(() => {

  }, []);


  // const uploaderProps = {
  //   multiple: false,
  //   accept: ".png, .jpeg, .jpg",
  //   //carga la imagen seleccionada
  //   onProgress(step, file) {
  //     //creamos un objeto para leer luego el archivo "file"
  //     const reader = new FileReader();
  //     console.log(file);

  //     const duplicado = fotoPerfil?.file?.uid === file.uid

  //     console.log(duplicado);
  //     if (!duplicado) {
  //       //le pasamos el file para leer el contenido del Blob, esto retorna un "reader.result" que le cargamos en el campo "byteImages"
  //       reader.readAsDataURL(file);
  //       //entra aca si la operacion de lectura del archivo fue satisfactoria
  //       reader.onload = function (event) {

  //         let base64 = reader.result.split(";base64,");
  //         let documentoBase64 = base64[1];
  //         //creamos el objeto para cargar los valores
  //         let imagen = {
  //           file: file,
  //           type: file.type,
  //           name: file.name,
  //           data: documentoBase64,
  //         };

  //         console.log(fotoPerfil)
  //         setFotoPerfil(imagen)

  //       };

  //       //ocurre un error a la hora de leer el archivo
  //       reader.onerror = function () {
  //         console.log("couldn't read the file");
  //       };
  //     }
  //   },

  //   //ocurre un error a la hora de subir el archivo
  //   onError(err) {
  //     console.log("onError", err);
  //   },
  //   capture: "josue",
  // };

  const handleGuardar = async () => {
    setIsLoading(true);
    let url = "dependencias/crear/";

    try {
      const response = await axios.post(url, dependencia);
      let status = response.status;
      if (status === 200) {
        if (response.data?.ok) {
          if (Object.keys(fotoPerfil).length === 0) {
            setIsLoading(false);
            swal("¡OPERACIÓN EXITOSA!", {
              icon: "success",
              buttons: false,
              timer: 1500,
            });
            history.goBack();
          } else {
            //handleEnviarFotoPerfil(response.data?.result?.idRubro)
          }
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

  // const handleEnviarFotoPerfil = async (props) => {

  //   const formData = new FormData();
  //   formData.append("imgs", fotoPerfil?.file);
  //   try {
  //     const response = await axios.post(
  //       `rubros/imagen/${props}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     let status = response.status;
  //     if (status === 201) {
  //       if (response.data?.ok) {
  //         setIsLoading(false);
  //         swal("¡OPERACIÓN EXITOSA!", {
  //           icon: "success",
  //           buttons: false,
  //           timer: 1500,
  //         });
  //         history.goBack();
  //       } else {
  //         setIsLoading(false);
  //         notificacionAlerta(response.data?.message);
  //       }


  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     if (error.response) {
  //       alertWarningError(error.response);
  //     }
  //   }

  // };


  const handleChangeNombre = (event) => {
    let copyInput = { ...dependencia, nombre: event.target.value };
    setDependencia(copyInput);
  };

  const handleChangeColor = (event) => {
    let copyInput = { ...dependencia, color: event.target.value };
    setDependencia(copyInput);
  };

  // const handleEliminarImagen = (event) => {
  //   event.preventDefault()
  //   setFotoPerfil({})
  // };

  return (
    <>
      <BackdropCustom open={isLoading} />
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <List >
                  <ListItem >
                      <ListItemText primary="CREAR UNA NUEVA DEPENDENCIA" secondary="Al crear dependencias puedes segmentar accesos para controlarlos mejor" />
                  </ListItem>
              </List>
            </Grid>
      <Card className={classes.root}>
        <CardContent>
          <Box pt={3} >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignContent="center"
              spacing={2}
            >
             
              <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                <TextField
                  size="small"
                  autoFocus
                  variant="outlined"
                  id="dependencia-nombre"
                  name="nombre"
                  label="Nombre"
                  value={dependencia.nombre}
                  onChange={(value) => handleChangeNombre(value)}
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="dependencia-color"
                  name="color"
                  label="Color a mostrar en gráficos"
                  value={dependencia.color}
                  onChange={(value) => handleChangeColor(value)}
                  type="text"
                  fullWidth
                />
              </Grid>

            </Grid>
          </Box>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignContent="center"
            spacing={2}
          >
            <Grid item>
              <Button
                size="small"
                color="default"
                startIcon={<ArrowBackIosIcon />}
                onClick={() => {
                  history.goBack();
                }}
              >
                Salir
              </Button>{" "}
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="primary"
                disabled={dependencia.nombre === "" ? true : false}
                startIcon={<SaveIcon />}
                onClick={() => {
                  handleGuardar();
                }}
              >
                Guardar
              </Button>{" "}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}
