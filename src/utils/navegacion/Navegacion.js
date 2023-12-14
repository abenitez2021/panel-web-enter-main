import React from "react";
import { pathTo } from "./utils";
import Breadcrumb from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, Link } from "react-router-dom"
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",

  },

  hover:{
    "&:hover": {
      color: "#004AAD"
    },

  }

}))

const Breadcrumbs = ({ route }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: 10 }}
      >
        <Breadcrumb aria-label="breadcrumb">
          {pathTo(route).map((crumb, index, breadcrumbs) => (
            <div key={index} className="item">
              {index < breadcrumbs.length - 1 && (
                <NavLink to={crumb.path} name={crumb.label} className={classes.link}>
                  <Typography variant="body2" display="block" color="textSecondary" className={classes.hover}>
                    <Box fontSize="10" display='inline'> {crumb.label}</Box>

                  </Typography>
                </NavLink>
              )}
              {index === breadcrumbs.length - 1 && <Typography variant="body2" display="block" color="textPrimary" >
                <Box fontSize="10" display='inline'> {crumb.label}</Box>
              </Typography>}
            </div>
          ))}
        </Breadcrumb>
      </Grid>
    </Container>
  );
};

export default Breadcrumbs;
