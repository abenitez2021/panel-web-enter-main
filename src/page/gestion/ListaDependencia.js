import React, { useEffect, useState, useContext } from "react";
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
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircle";
import Chip from "@material-ui/core/Chip";
import swal from "sweetalert";
import logoW from '../../assets/images/ci_frontal.png'
import { notificacionAlerta } from "../../components/Notificaciones";

const initFiltro = {
  fechaDesde: null,
  fechaHasta: null,
  idVisita: null,
  marcacion: null,
  documento: null,
  idDependencia: null,
};


export default function ListaDependencia() {
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


  const getPedido = async () => {
    setIsLoading(true);
    setQuitarFiltro(false);
    setFiltro(initFiltro);
    setComercio({})
    let url =
      "dependencias/listar/";
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




  const title = (<Button
    size='small'
    variant="outlined"
    color="primary"
    startIcon={<AddIcon />}
    onClick={() => history.push("../alta-dependencia")}

  >
    Agregar
  </Button>);

  const columns = [
    {
      title: "ID. Dependencia",
      field: "idDependencia",
      width: "2%",
      // hidden: true,
    },
    {
      title: "Nombre dependencia",
      field: "nombre",
      width: "5%",
      render: rowData => rowData.nombre
    },
    {
      title: "Color para gráficos",
      field: "color",
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

  const handleInactivar = (event, props) => {
    //event.stopPropagation();
    //history.push("./detalle/", props.data);
    event.stopPropagation();
    swal({
      title: "¡ATENCIÓN!",
      text: `¿Deseas inactivar esta dependencia, al hacerlo ya no podrá activarla y tendrás que crear otra en caso de necesitar una dependencia similar?`,
      icon: "warning",
      buttons: true,
      buttons: ["Cancelar", "Confirmar"],
      confirmButtonColor: "#43a047",
    }).then((willDelete) => {
      if (willDelete) {
        getInactivarDependencia(props.data)
      }
    });
  };

  const getInactivarDependencia  = async (props) => {
    setIsLoading(true);
    let url = "dependencias/inactivar/";

    try {
      const response = await axios.post(url,  {
        idDependencia: props?.idDependencia
      });

      let status = response.status;
      if (status === 200) {
        if (response.data?.ok) {
          getPedido()
          setIsLoading(false);
          swal("¡OPERACIÓN EXITOSA!", {
            icon: "success",
            buttons: false,
            timer: 1500,
          });
        
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


 
  const childrenAccions = (props) => {
    return (
      <>

        <Box pl={1} pr={1}>
          <Chip
            onClick={(e) => handleInactivar(e, props)}
            label="Inactivar"
            variant="outlined"
            style={{ borderColor: "#EE273E" }}
          />
        </Box>

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
                      <ListItemText primary="DEPENDENCIAS" secondary="Visualizá la lista de dependencias o sectores internos" />
                  </ListItem>
              </List>
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
