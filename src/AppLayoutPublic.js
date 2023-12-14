import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Background from "./assets/images/bgWom.png"
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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
  bgLogin: {
    width: "100%",
    height: "auto",

    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${Background})`,
    backgroundSize: "100% 100%",

  },
}));

function AppLayoutPublic({ route }) {
  const Content = route.component;
  const classes = useStyles();
  return (

    <>
      <div
       className={classes.bgLogin}>

        <main className={classes.content}>


          <Container maxWidth="xl" style={{ paddingBottom: 5, marginTop: 15 }} >
            <Content />
          </Container>

        </main>
      </div>
    </>



  );
}
export default AppLayoutPublic;
