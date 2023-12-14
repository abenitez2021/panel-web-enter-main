import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Copyright } from "../components/CopyRight";
import logo from "../assets/images/logo.png";
import {
  notificacionAlerta,
} from "../components/Notificaciones";
import TypographyBold from "../components/TypographyBold";
import { login } from "../utils/authUtils";
import { useStyles } from "../assets/styles/CustomStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function Login() {
  const classes = useStyles();

  const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ documento: "", password: "", idRol: 2 });

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleLogin = async (e) => {
      try {
        const response = await login(data);
        if (response.status === "OK") {
          window.location.href = "/";
        }
        if (response.status === "SINACCESO") {
          notificacionAlerta(response.message);
        }
      } catch (error) {
        console.log(error);
        if (error) {
          notificacionAlerta(error);
        }
      }
    };

    const handleEmail = (event) => {
      setData({ ...data, documento: event.target.value });
    };

    const handlePassword = (event) => {
      setData({ ...data, password: event.target.value });
    };
    return (
      <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          style={{ justifyContent: "center", paddingBottom: 70 }}
        >
          <Grid item xs={11} sm={9} md={4} lg={4} xl={4}>
            <Box pt={5}>
              <Card className={classes.root} variant="outlined">
                <CardContent style={{ padding: 0 }}>
                  <Box
                    p={5}
                    mb={3}
                    style={{ textAlign: "center", backgroundColor: "#0B2161" }}
                  >
                    <img width="180px" alt="Logo" src={logo} />

                  </Box>
                  <Box mt={1} style={{ textAlign: "center" }}>
                    <TypographyBold
                      variant="h5"
                      component="h2"
                    >
                      Bienvenido
                    </TypographyBold>
                    <Typography
                      variant="button"
                    >
                      INGRESE SUS CREDENCIALES DE ACCESO

                    </Typography>
                  </Box>

                  <Box pt={3} pl={4} pr={4}>

                    <Box pb={2}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        value={data.email}
                        onChange={(value) => handleEmail(value)}
                        type="email"
                        fullWidth
                        color="primary"
                        label="Nro. Cédula"
                        autoFocus
                      />
                    </Box>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel
                        color="primary"
                        htmlFor="outlined-adornment-password"
                      >
                        Contraseña
                      </InputLabel>
                      <OutlinedInput
                        color="primary"
                        required

                        type={showPassword ? "text" : "password"}
                        value={data.password}
                        onChange={(value) => handlePassword(value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="togglepassword"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={90}
                      />
                    </FormControl>
                  </Box>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ justifyContent: "center" }}
                  >
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                      <Box pt={5} pl={1} pr={1} pb={5}>
                        <Button
                          fullWidth
                          height ="100%"
                          variant="contained"
                          color="primary"

                          onClick={() => handleLogin()}
                        >
                          <TypographyBold
                            variant="body2"
                            style={{ color: "#fff" }}
                          >
                            INICIAR SESIÓN

                          </TypographyBold>

                        </Button>
                      </Box>

                    </Grid>
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                      <Box pt={1} pl={1} pr={1} pb={1} style={{ textAlign: "center" }}>
                        <TypographyBold
                          variant="body2"
                        >
                          Versión 2.0

                        </TypographyBold>
                      </Box>
                    </Grid>

                  </Grid>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid >
      </>
    );
  };

  return (
    <>
      <Login />

      <Box className={classes.footerBotttom}>
        <Copyright />
      </Box>
    </>
  );
}
