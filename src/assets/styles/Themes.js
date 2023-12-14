import { createMuiTheme } from "@material-ui/core/styles";
import { esES } from "@material-ui/core/locale";

export const darkTheme = createMuiTheme(

  {
    body: {
      background: "#f2f5f9"
    },
    palette: {
      type: "dark",
      primary: { main: "#0B2161" },
      secondary: { main: "#004e89" },
      red: { main: "#EE273E" }
    },
    overrides: {
      MuiTableCell: {
        root: {
          padding: 8,
        },
      },
      MuiIconButton: {
        root: {
          padding: 7,
        },
      },
      MuiDialogActions: {
        root: {
          justifyContent: "space-evenly",
        },
      },
      MuiDialogContent: {
        root: {
          background: "#333333",
        },
      },
      MuiCardHeader: {
        root: {
          paddingRight: 16,
          paddingLeft: 16,
          paddingBottom: 0,
          paddingTop: 16,
        }
      },
      MuiCardContent: {
        root: {
          paddingRight: 16,
          paddingLeft: 16,
          paddingBottom: 16,
          paddingTop: 5,
        }
      },
      MuiTableRow: {
        root: {
          "&:hover": {
            background: "#303030",
          },
        },
      },
      MuiTooltip: {
        tooltip: {
          fontSize: "1em",
        },
      },
      MuiInputBase: {
        input: {
          textTransform: "uppercase",
        },
      },
    },
  },
  esES
);

export const lightTheme = createMuiTheme(
  {
    body: {
      background: "#f2f5f9"
    },
    palette: {
      type: "light",
      primary: { main: "#0B2161" },
      secondary: { main: "#004e89" },
      red: { main: "#EE273E" },
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 10,

        },
        containedPrimary: {
          color: "#fff"
        }
      },
      MuiTableCell: {
        root: {
          padding: 8,
        },
      },
      MuiIconButton: {
        root: {
          padding: 7,
        },
      },
      MuiDialogActions: {
        root: {
          justifyContent: "space-evenly",
        },
      },
      MuiDialogContent: {
        root: {
          background: "#f5f5f5",
        },
      },
      MuiCardHeader: {
        root: {
          paddingRight: 16,
          paddingLeft: 16,
          paddingBottom: 0,
          paddingTop: 16,
        }
      },
      MuiCardContent: {
        root: {
          paddingRight: 16,
          paddingLeft: 16,
          paddingBottom: 16,
          paddingTop: 5,
        }
      },
      MuiTableRow: {
        root: {
          "&:hover": {
            background: "#cfd8dc",
          },
        },
      },
      MuiTooltip: {
        tooltip: {
          fontSize: "1em",
        },
      },

      // MuiInputBase: {
      //   input: {
      //     textTransform: "uppercase",
      //   },
      // },

      // MuiBackdrop: {

      //   root: {
      //     zIndex: 2000,
      //     color: "#fff",
      //   },
      // },
    },
  },
  esES
);

export default lightTheme;
