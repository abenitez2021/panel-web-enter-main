import React from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Error from "@material-ui/icons/Error";
import { useHistory } from "react-router-dom";

export default function AccesoLimitado() {
  const history = useHistory();

  return (
    <>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={6}
        style={{ marginTop: 40 }}
      >
        <Grid item align="center">
          <Error color="primary" style={{ fontSize: 60 }} />

          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            ACCESO LIMITADO
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Debes solicitar permisos para acceder.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            align="center"
            onClick={() => history.push("/")}
          >
            Volver a la menú
          </Button>
        </Grid>
      </Grid>

    </>
  );
}
