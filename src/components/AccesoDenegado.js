import { useHistory } from "react-router-dom";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../assets/styles/CustomStyles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Close from "@material-ui/icons/Close";
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled';


const AccesoDenegado = () => {
  const history = useHistory();

  const classes = useStyles();
  return (
    <>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginBottom: 10 }}

      >
        <Card className={classes.root}>
          <CardHeader
            action={<>

              <IconButton aria-label="exit" onClick={(e) => {
                history.goBack();
              }}>
                <Close />
              </IconButton>

            </>

            }

          />
          <CardContent >

              <Box  mb={2} >

                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={6}
         
                  >
                    <Grid item align="center">
                  <DesktopAccessDisabledIcon color="primary" style={{ fontSize: 60 }} />

                      <Typography
                        variant="h5"
                        align="center"
                        color="inherit"
                        gutterBottom
                      >
                       ¡ACCESO DENEGADO!
                      </Typography>
                      <Typography
                    variant="subtitle1"
                        align="center"
                        color="textSecondary"
                        paragraph
                      >
                        No cuentas con permiso para acceder a esta página. Contacté con el Administrador.
                      </Typography>
                    </Grid>

                  </Grid>
             
              </Box>
          
          </CardContent>

        </Card>
      </Grid>

    </>
  );
};

export default AccesoDenegado;
