import React from "react";
import { useMemo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppLayout from "./AppLayout";
import AppLayoutPublic from "./AppLayoutPublic";
import { darkTheme } from "./assets/styles/Themes";
import { lightTheme } from "./assets/styles/Themes";
import useDarkMode from "./assets/styles/useDarkMode";



import UsersProvider from "./utils/user/UserProvider";
import { Helmet } from "react-helmet";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

function App({ routes }) {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = lightTheme;
  const memoizedtoggleTheme = useMemo(() => toggleTheme, [toggleTheme]);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const handleClose = () => {
    setOpenBackDrop(false);
  };

  return (
    <MuiThemeProvider  theme={themeMode}>
      <CssBaseline />
      <UsersProvider>

        <BrowserRouter>
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} exact path={route.path}>

                <Helmet>
                  <title>{route.label}</title>
                </Helmet>
                {route?.path === "/acceder" ||  route?.path === "/registro-wommers" ?

                  <AppLayoutPublic
                    route={route}
                    memoizedtoggleTheme={memoizedtoggleTheme}
                    theme={theme}
                  />
                  :
                  <AppLayout
                    route={route}
                    memoizedtoggleTheme={memoizedtoggleTheme}
                    theme={theme}
                  />
                }



              </Route >
            ))}
          </Switch>
        </BrowserRouter>
      </UsersProvider>
      <Backdrop
        open={openBackDrop}
        onClick={handleClose}
        style={{
          zIndex: 2000,
          color: "#fff",
        }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </MuiThemeProvider>
  );
}

export default App;
