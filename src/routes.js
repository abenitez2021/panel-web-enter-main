import NotFound from "./components/NotFound";
import Login from "./page/Login";
import Tablero from "./page/Tablero";
import NuevaDependencia from "./page/gestion/NuevaDependencia";
import ListaEntradasDia from "./page/servicios/ListaEntradasDia";
import ListaAccesoVisitantes from "./page/movimientos/ListaAccesoVisitantes";
import ListaAccesoUsuarios from "./page/movimientos/ListaAccesoUsuarios";
import ListasSalidasDia from "./page/servicios/ListasSalidasDia";
import ListaPermanenciaDia from "./page/servicios/ListaPermanenciaDia";
import ListaPersonasVisitantes from "./page/gestion/ListaPersonasVisitantes";
import ListaUsuarioGuardias from "./page/gestion/ListaUsuarioGuardias";
import ListaDependencia from "./page/gestion/ListaDependencia";
import ListaAccesoVisitantesDos from "./page/movimientos/ListaAccesoVisitantesDos";


export const routes = [
  {
    path: "/",
    label: "Inicio",
    component: Tablero,
    routes: [
      {
        path: "/acceder",
        label: "INICIAR SESION",
        component: Login,
      },

      //GESTION
      {
        path: "/gestion/",
        label: "Gestion",
        component: Tablero,
        routes: [
          {
            path: "/lista-personas-visitantes/",
            label: "Personas registradas",
            component: ListaPersonasVisitantes,
          },
          {
            path: "/lista-usuarios-guardias/",
            label: "Usuarios registrados",
            component: ListaUsuarioGuardias,
          },
          {
            path: "/lista-dependencias/",
            label: "Dependencias registradas",
            component: ListaDependencia,
          },
          {
            path: "/alta-dependencia/",
            label: "Alta de dependencia",
            component: NuevaDependencia,
          },
          
        ],
      },
      //servicios agendados
      {
        path: "/movimientos/",
        label: "movimientos",
        component: Tablero,
        routes: [
          {
            path: "/lista-movimientos/",
            label: "Control de Acceso",
            component: ListaAccesoVisitantes,
          },
          {
            path: "/lista-movimientos-dos/",
            label: "Control de Acceso",
            component: ListaAccesoVisitantesDos,
          },
          {
            path: "/lista-movimientos-usuarios/",
            label: "Marcaciones",
            component: ListaAccesoUsuarios,
          }
        ],
      },


      //Lista registro entrada, salida , permanencia
      {
        path: "/resumen/",
        label: "visitas del dia",
        component: Tablero,
        routes: [
          {
            path: "/entradas/",
            label: "entradas",
            component: ListaEntradasDia,
          },
          {
            path: "/salidas/",
            label: "salidas",
            component: ListasSalidasDia,
          },
          {
            path: "/permanencia/",
            label: "permanencia",
            component: ListaPermanenciaDia,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    label: "Error en la página",
    component: NotFound,
  },
];
