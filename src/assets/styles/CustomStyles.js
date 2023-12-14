import { makeStyles } from "@material-ui/core/styles";
import { green, amber, cyan } from '@material-ui/core/colors';


export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  shadow: {
    boxShadow: "rgb(0 0 0 / 10%) 0px 1px 1px -1px, rgb(0 0 0 / 4%) 0px 1px 3px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
  },



  green: {
    color: '#fff',
    backgroundColor: green[500],
  },

  amber: {
    color: '#fff',
    backgroundColor: amber[500],
  },

  deepOrange: {
    color: '#fff',
    backgroundColor: cyan[200],
  },

  container: {
    maxHeight: 440,
  },

  button: {
    margin: theme.spacing(1),
  },
  botonDerecha: {
    marginLeft: 'auto',
  },
  buttonFiltro: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  DialogoTexto: {
    marginTop: theme.spacing(2),
  },
  marginContent: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    height: 555,
    backgroundColor: "#f2f2f2",
  },

  DialogTitle: {
    backgroundColor: "#8e8b8b",
    color: "#fff",
    fontSize:"bold",
    textAlign: "center",
  },
  paper: {
    padding: "5px 5px 15px 5px",
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  rootPaper: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
    borderColor: "#0c1139",
  },
  marginSpacing3: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(6),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  tableHead: {
    backgroundColor: "#396b99",
    color: theme.palette.common.white,
  },
  tableHover: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.grey[100],
    },
  },
  appBar: {
    height: "42px",
    backgroundColor: "#EE273E",
  },
  Toolbar: {
    minHeight: "42px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  listItem: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  papper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  padding2: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: "center",
  },
  padding1: {
    //paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: "center",
  },
  cardContent: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  tituloPagina: {
    textAlign: "center",
    paddingBottom: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  avatar: {
    backgroundColor: "#0B2161",
    width: 35,
    height: 35,
  },


  fab: {
    position: "absolute",
    top: "90px",
    right: "35px",
  },

  footerBotttom: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
    //  backgroundColor: "#fafafa",
  },

  alignDerecha: {
    justifyContent: "flex-end"
  }
}));

export const tableStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
    // marginRight: theme.spacing(1),
  },
  content: {
    flexGrow: 1,
    overflowX: "auto",
    paddingBottom: 42,
  },
  color: {
    backgroundColor: "#EE273E",
  },
  buttonGroup: {
    flexDirection: "row",
    "& > *": {
      margin: theme.spacing(0.1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  iconButton: {
    padding: 4,
  },

}));

export const filtroAplicadosStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  iconButton: {
    marginTop: theme.spacing(1),
    // padding: 4,
  },
}));

export const MasDatos = makeStyles((theme) => ({
  root: {
    display: "table-row",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1.5),
      width: theme.spacing(33.6),
      // height: theme.spacing(16),
    },
  },
  chip: {
    marginLeft: theme.spacing(0.5),
  },
}));

export const cabeceraStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
    // margin: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    // marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export const dialogoStyles = makeStyles(
  (theme) => ({
    chip: {
      margin: theme.spacing(1),
    },
    dialogoTexto: {},
    divider: {
      height: 28,
      margin: 4,
      borderColor: "#EE273E",
    },
  }),
  { index: 1 }
);
