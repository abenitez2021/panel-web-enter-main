import React, { useContext } from "react";
import Navegacion from "./utils/navegacion/Navegacion";
import Container from "@material-ui/core/Container";
import UserContext from "./utils/user/UserContext";
import NavBar from "./components/NavBar";
import Login from "./page/Login";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function AppLayout({ route, theme, memoizedtoggleTheme }) {
  const Content = route.component;
  const classes = useStyles();
  const userContext = useContext(UserContext);
  return (


    <>
      {userContext.state.exp ?
      <div className={classes.root}>
        <NavBar  toggleTheme={memoizedtoggleTheme} />
      
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {route.parent && <Navegacion route={route} />}
          <Container maxWidth="xl"  style={{ paddingBottom: 5, marginTop: 15 }} >
            <Content />
          </Container>

        </main>
      </div>
        : 
        
        <Login/>

      }
    </>



  );
}
export default AppLayout;
