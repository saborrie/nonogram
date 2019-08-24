import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    justifyContent: "center"
  }
}));

function Titlebar(props) {
  const classes = useStyles();

  const { children } = props;

  return (
    <AppBar position="static">
      <Toolbar variant="dense" className={classes.toolbar}>
        {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <ArrowBack />
        </IconButton> */}
        {children}
      </Toolbar>
    </AppBar>
  );
}

Titlebar.propTypes = {
  /** Contents of the bar */
  children: PropTypes.node
};

export default Titlebar;
