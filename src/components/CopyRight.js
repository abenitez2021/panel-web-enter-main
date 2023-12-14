import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },



}));

export function Copyright() {

  const classes = useStyles();
  return (

    <AppBar position="static" color="transparent" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="body2" display="block" color="textSecondary" className={classes.hover}>
          <Box fontSize="10" display='inline'>  ©2023 </Box>
          <Link variant="button" color="textSecondary" href="#" >
            ENTER 2.0
          </Link>
          <Box fontSize="10" display='inline'> v{process.env.REACT_APP_VERSION} </Box>

        </Typography>
       { /*
        <nav className={classes.toolbarTitle}>
          <Link variant="button" color="textSecondary" href="#" className={classes.link}>

            <Box color="textPrimary" fontSize="10" display='inline'>Menu 1</Box>



          </Link>
          <Link variant="button" color="textSecondary" href="#" className={classes.link}>

            <Box fontSize="10" display='inline'>Menu 2</Box>


          </Link>
        </nav>
        <Button size='small' href="#" color="secondary" variant="outlined" className={classes.link}>
          Soporte
        </Button>
        */}
      </Toolbar>
    </AppBar>


    /*
        <Typography variant="body2" color="textSecondary" align="center">
          Versión {process.env.REACT_APP_VERSION}
        </Typography>
        */
  );
}
