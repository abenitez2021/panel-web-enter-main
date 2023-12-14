import React, { useState, useEffect, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from '@material-ui/core/CardActionArea';
import { useStyles } from "../assets/styles/CustomStyles";
import TypographyBold from "../components/TypographyBold";
import { MakeTables } from "../components/MaterialTables/MakeTables";
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import axios from "../utils/axios";
import { alertWarningError } from "../components/Notificaciones";
import BackdropCustom from "../components/BackdropCustom";
import PersonIcon from '@material-ui/icons/Person';
import { Legend, PieChart, Pie, Tooltip, Cell } from 'recharts';
import UserContext from "../utils/user/UserContext";


const valueDefaultFiltro = {
  fechaDesde: "",
  fechaHasta: ""
}

const datas = [
  {
    name: 'Lunes',
    Salidas: 10,
    Entradas: 12,
  },
  {
    name: 'Martes',
    Salidas: 10,
    Entradas: 11,
  },
  {
    name: 'Miercoles',
    Salidas: 10,
    Entradas: 15,
  },
  {
    name: 'Jueves',
    Salidas: 10,
    Entradas: 10,
  },
  {
    name: 'Viernes',
    Salidas: 1,
    Entradas: 10,
  }
];

export default function Tablero() {
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingWommers, setIsLoadingWommers] = useState(false);
  const [isLoadingGuardias, setIsLoadingGuardias] = useState(false);
  const [listaVisitas, setListaVisitas] = useState({ content: [] });
  const [listaMarcacionGuardias, setListaMarcacionGuardias] = useState({ content: [] });
  const [listaGraficoVisitasDependenciaDia, setlistaGraficoVisitasDependenciaDia] = useState({ content: [] });
  const [listaDependenciaPermanecen, setlistaDependenciaPermanecen] = useState({ content: [] });
  const [data, setData] = useState({
    visitasPermanecen: "",
    ingresosDia: "",
    salidasDia: "",
    guardiasActivos: "",
  });


  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
         {payload.cantidad}
      </text>
    );
  };

  const renderCustomizedLabelDependencia = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {/* {`${(percent * 100).toFixed(0)}%`} */}
        {payload.cantidad}
      </text>
    );
  };


  useEffect(() => {
    getData()
    getListaMarcacionGuardias()
    getListaVisitasTablero()
    getGraficoVisitasPorDependenciaDia()
    getGraficoDependenciaPermanecen()
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const url = "dashboard/cabecera";
    try {
      const response = await axios.post(url);

      setIsLoading(false);
      if (response.status === 200) {
        let dataResponse = response?.data?.result[0];
        setData({
          ...data,
          visitasPermanecen: dataResponse?.visitasPermanecen,
          ingresosDia: dataResponse?.ingresosDia,
          salidasDia: dataResponse?.salidasDia,
          guardiasActivos: dataResponse?.guardiasActivos
          
        });
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        alertWarningError(error.response);
      }
    }
  };

  const convertDataToNumber = (data) => {
    return data.map((entry) => ({
      name: entry.name,
      cantidad: parseInt(entry.cantidad), // O parseFloat si es un número decimal
      color: entry.color,
    }));
  };

  // Graficos de personas por dependencia
  const getGraficoVisitasPorDependenciaDia = async (props) => {
    //setIsLoadingServicios(true);
    let url = "dashboard/dependencia-dia"
    try {
      const response = await axios.post(url);
      let status = response.status;
      if (status === 200 && response.data.ok === true) {
        const convertedData = convertDataToNumber(response.data.result); // Convertir los datos aquí
        setlistaGraficoVisitasDependenciaDia({
          ...listaGraficoVisitasDependenciaDia,
          content: convertedData,
        });
        console.log("LISTA GRAFICO X DEPENDENCIA ---> ", convertedData)
       // setIsLoadingServicios(false);
      }
    } catch (error) {
      //setIsLoadingServicios(false);
      if (error.response) {
        alertWarningError(error.response);
      }
    }
  };

  const getGraficoDependenciaPermanecen = async (props) => {
    //setIsLoadingServicios(true);
    let url = "dashboard/dependencia-permanencia"
    try {
      const response = await axios.post(url);
      let status = response.status;
      if (status === 200 && response.data.ok === true) {
        const convertedData = convertDataToNumber(response.data.result); // Convertir los datos aquí
        setlistaDependenciaPermanecen({
          ...listaDependenciaPermanecen,
          content: convertedData,
        });
        console.log("LISTA GRAFICO X DEPENDENCIA PERMANECEN---> ", convertedData)
       // setIsLoadingServicios(false);
      }
    } catch (error) {
      //setIsLoadingServicios(false);
      if (error.response) {
        alertWarningError(error.response);
      }
    }
  };

  const getListaVisitasTablero = async (props) => {
    setIsLoadingWommers(true);
    let url = "dashboard/listar-visita"
    try {
      const response = await axios.post(url);
      let status = response.status;
      if (status === 200) {
        const proyectos = response.data;
        setListaVisitas({
          ...listaVisitas,
          content: proyectos?.result,
        });
        console.log(proyectos?.result)
        setIsLoadingWommers(false);
      }
    } catch (error) {
      setIsLoadingWommers(false);
      if (error.response) {
        alertWarningError(error.response);
      }
    }
  };

  const getListaMarcacionGuardias = async (props) => {
    setIsLoadingGuardias(true);
    let url = "marcacion/listar"
    try {
      const response = await axios.post(url);
      let status = response.status;
      if (status === 200) {
        const proyectos = response.data;
        setListaMarcacionGuardias({
          ...listaMarcacionGuardias,
          content: proyectos?.result,
        });
        console.log(proyectos?.result)
        setIsLoadingGuardias(false);
      }
    } catch (error) {
      setIsLoadingGuardias(false);
      if (error.response) {
        alertWarningError(error.response);
      }
    }
  };


  const titleVisitas = (
    <>
      <List >
        <ListItem >
          <ListItemText primary="ULTIMOS INGRESOS REGISTRADOS" secondary="Visualizá las últimas personas que ingresaron en su establecimiento" />
        </ListItem>
      </List>

    </>

  );

  const columnsVisitas = [
    {
      title: "Visita Nro.",
      field: "idVisita",
      width: "10%",
      hidden: false,
    },

    // {
    //   title: "",
    //   field: "urlFoto",
    //   align: "center",
    //   render: (rowData) => (
    //     <img
    //       style={{ height: 30, width: 30, borderRadius: "20%" }}
    //       src={`${rowData?.foto}`}
    //     // src={`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}${rowData?.url}`}
    //     />
    //   ),
    //   width: "10%",
    // },

    {
      title: "Nombre",
      field: "nombre",
      width: "30%",
      render: (rowData) => (
        <Typography
          variant="button"
          display="block"
          color="initial"
        //  style={{ color: "#ffffff" }}
        >
          {rowData?.nombre}
        </Typography>
      )
      
    },
    {
      title: "Apellido",
      field: "apellido",
      width: "30%",
      render: (rowData) => (
        <Typography
          variant="button"
          display="block"
          color="initial"
        //  style={{ color: "#ffffff" }}
        >
          {rowData?.apellido}
        </Typography>
      )
     
    },
    {
      title: "Fecha y Hora",
      field: "entrada",
      width: "60%",
      render: (rowData) => (
        <Typography
          variant="button"
          display="block"
          color="initial"
        >
          {rowData?.entrada}
        </Typography>
      )
      
    }

  ];

  const titleGuardias = (
    <>
      <List >
        <ListItem >
          <ListItemText primary="ULTIMAS MARCACIONES DE GUARDIAS" secondary="Visualizá las últimas marcaciones de los guardias" />
        </ListItem>
      </List>

    </>

  );

  const columnsGuardias = [
    {
      title: "ID Guardia.",
      field: "idUsuario",
      width: "2%",
      hidden: false,
    },

    // {
    //   title: "",
    //   field: "urlFoto",
    //   align: "center",
    //   render: (rowData) => (
    //     <img
    //       style={{ height: 30, width: 30, borderRadius: "20%" }}
    //       src={`${rowData?.foto}`}
    //     // src={`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}${rowData?.url}`}
    //     />
    //   ),
    //   width: "10%",
    // },

    {
      title: "Nombre",
      field: "nombre",
      render: (rowData) => (
        <Typography
          variant="button"
          display="block"
          color="initial"
        //  style={{ color: "#ffffff" }}
        >
          {rowData?.nombre}
        </Typography>
      )
      //  width: "15%",
    },
    {
      title: "Apellido",
      field: "apellido",
      render: (rowData) => (
        <Typography
          variant="button"
          display="block"
          color="initial"
        //  style={{ color: "#ffffff" }}
        >
          {rowData?.apellido}
        </Typography>
      )
      //  width: "15%",
    },
    {
      title: "Entrada",
      field: "entrada",
      width: "5%",
      render: (rowData) => (
        <Typography
          variant="button"
          display="block"
          color="initial"
        >
          {rowData?.entrada}
        </Typography>
      )
    }
  ];
 
  const options = {
    filtering: false,
    exportButton: false,
    exportAllData: false,
    search: false,
    headerStyle: { position: "sticky", top: 0 },
    maxBodyHeight: "75vh",
    paging: false,
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
      <BackdropCustom open={isLoading} />

      <Grid container direction="row" spacing={1}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <List >
              <ListItem >
                <ListItemAvatar >
                  <Avatar style={{ backgroundColor: "#8A0868" }}>
                    <DashboardIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Tablero" secondary="Datos de control general" />
              </ListItem>
            </List>
          </Grid>

           {/**  Visitas del dia */}
           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                      <Grid container spacing={1} justifyContent="center" alignItems="center" direction="row" style={{ paddingBottom: 1, paddingTop: 1}}>
  
                        <Grid  item xs={6} sm={6} md={3} lg={3} xl={3} >
                            <List  style={{ paddingLeft: 10, paddingTop: 10}} >
                              <ListItem >
                                  <ListItemText style={{ fontSize: "60px" }}  primary="VISITAS DEL DIA" />
                              </ListItem>
                          </List>
                        </Grid>

                        <Grid  item xs={6} sm={6} md={3} lg={3} xl={3} >
                        
                            <CardActionArea
                              onClick={() => history.push("/resumen/entradas/")}
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    variant="rounded"
                                    style={{ backgroundColor: "#ffffff" }}
                                  >
                                    <PersonIcon
                                      style={{ color: "rgb(2 81 18 / 100%)", fontSize: "60px" }}
                                    />
                                  </Avatar>
                                }
                                title={
                                  <Typography
                                    variant="button"
                                    display="block"
                                    color="initial"
                                    style={{ color: "rgb(2 81 18 / 100%)" }}
                                  >
                                    ENTRADAS
                                  </Typography>
                                }
                                subheader={
                                  <TypographyBold
                                    variant="h4"
                                    display="block"
                                    style={{ color: "rgb(2 81 18 / 100%)" }}
                                  >
                                    {data.ingresosDia}
                                  </TypographyBold>
                                }
                              />
                            </CardActionArea>
                          
                        </Grid>

                        <Grid  item xs={6} sm={6} md={3} lg={3} xl={3}>
                          
                            <CardActionArea
                                onClick={() => history.push("/resumen/salidas/")}
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    variant="rounded"
                                    style={{ backgroundColor: "#ffffff" }}
                                  >
                                    <PersonIcon
                                      style={{ color: "rgb(213 0 74 / 100%)", fontSize: "60px" }}
                                    />
                                  </Avatar>
                                }
                                title={
                                  <Typography
                                    variant="button"
                                    display="block"
                                    color="initial"
                                    style={{ color: "rgb(213 0 74 / 100%)" }}
                                  >
                                  SALIDAS
                                  </Typography>
                                }
                                subheader={
                                  <TypographyBold
                                    variant="h4"
                                    display="block"
                                    style={{ color: "rgb(213 0 74 / 100%)" }}
                                  >
                                    {data.salidasDia}
                                  </TypographyBold>
                                }
                              />
                            </CardActionArea>
                          
                        </Grid>

                        <Grid  item xs={6} sm={6} md={3} lg={3} xl={3}>
                        
                            <CardActionArea
                                onClick={() => history.push("/resumen/permanencia/")}
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    variant="rounded"
                                    style={{ backgroundColor: "#ffffff" }}
                                  >
                                    <PersonIcon
                                      style={{ color: "#ff8000", fontSize: "60px" }}
                                    />
                                  </Avatar>
                                }
                                title={
                                  <Typography
                                    variant="button"
                                    display="block"
                                    color="initial"
                                    style={{ color: "#ff8000" }}
                                  >
                                    PERMANECEN
                                  </Typography>
                                }
                                subheader={
                                  <TypographyBold
                                    variant="h4"
                                    display="block"
                                    style={{ color: "#ff8000" }}
                                  >
                                    {data.visitasPermanecen}
                                  </TypographyBold>
                                }
                              />
                            </CardActionArea>
                          
                        </Grid>

                      </Grid>
         </Grid>
      </Grid>

      <Grid container spacing={6} justifyContent="center" alignItems="center" direction="row" >


          {/**  Graficos por dependencia dia */}
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Card >
                <CardActionArea
                     onClick={() => history.push("/resumen/entradas/")}
                > 
                  <Grid>
                    <List style={{ marginLeft : 30, paddingBottom: 1, paddingTop: 5}} >
                        <ListItem >
                            <ListItemText primary="VISITAS POR DEPENDECIAS DEL DIA" secondary="Visualizá las entradas a las dependencias del dia" />
                        </ListItem>
                    </List>
                  </Grid>
                  <PieChart width={800} height={420}>
                    <Pie
                      data={listaGraficoVisitasDependenciaDia.content}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabelDependencia}
                      outerRadius={150}
                      fill="#887454"
                      dataKey="cantidad"
                    >
                      {listaGraficoVisitasDependenciaDia.content.map((entry, index) => (
                        <Cell key={`cell1-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    
                  </PieChart>
                </CardActionArea>
            </Card>
          </Grid>

           {/**  Graficos por dependencia  permanecen*/}
           <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Card >
                <CardActionArea
                    onClick={() => history.push("/resumen/permanencia/")}
                > 
                  <Grid>
                    <List style={{ marginLeft : 30, paddingBottom: 1, paddingTop: 5}} >
                        <ListItem >
                            <ListItemText primary="PERMANENCIA POR DEPENDENCIA" secondary="Visualizá cuantas visitas aún siguen de las dependencias" />
                        </ListItem>
                    </List>
                  </Grid>
                  <PieChart width={800} height={420}>
                    <Pie
                      data={listaDependenciaPermanecen.content}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="cantidad"
                    >
                      {listaDependenciaPermanecen.content.map((entry, index) => (
                        <Cell key={`cell2-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    
                  </PieChart>
                </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {/**  ultimas visitas del dia */}
              <div style={{ flex: 1, padding: '8px' }}>
                <MakeTables
                  isLoading={isLoadingWommers}
                  title={titleVisitas}
                  columns={columnsVisitas}
                  data={listaVisitas.content}
                  actions={actions}
                  classes={classes}
                  options={options}
                  componentsAssets={{
                    classes,
                    // editar,
                    // eliminar,
                    //finalizar,
                    //detalle,
                    // childrenAccions,
                  }}
                />
              </div>

              {/**  marcaciones de guardias */}
              {userContext.state.rol === "Administrador" && (
                <div style={{ flex: 1, padding: '8px' }}>
                    <MakeTables
                      isLoading={isLoadingGuardias}
                      title={titleGuardias}
                      columns={columnsGuardias}
                      data={listaMarcacionGuardias.content}
                      actions={actions}
                      classes={classes}
                      options={options}
                      componentsAssets={{
                        classes,
                        // editar,
                        // eliminar,
                        //finalizar,
                        //detalle,
                        // childrenAccions,
                      }}
                    />
                </div>
              )}
            </div>
        </Grid>
            
          {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          
              <BarChart
                width={500}
                height={500}
                data={listaGrafico.content}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="salidas" fill="rgba(255, 99, 132, 1)" />
                <Bar dataKey="entradas" fill="rgba(75, 192, 192, 1)" />
              </BarChart>
          
          </Grid> */}
          
          {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          
              <BarChart
                width={500}
                height={500}
                data={listaGrafico.content}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="salidas" fill="rgba(255, 99, 132, 1)" />
                <Bar dataKey="entradas" fill="rgba(75, 192, 192, 1)" />
              </BarChart>
          
          </Grid> */}

         
      </Grid>
    
    </>
  );
}
