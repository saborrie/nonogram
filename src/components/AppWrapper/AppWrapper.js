import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import purple from "@material-ui/core/colors/indigo";

const theme = createMuiTheme({
  palette: {
    primary: purple
  }
});

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%"
  }
});

function AppWrapper(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          {props.children}
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
}

export default AppWrapper;
