import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  box: {
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

function ControlsBox(props) {
  const classes = useStyles();

  const { children } = props;

  return <div className={classes.box}>{children}</div>;
}

ControlsBox.propTypes = {
  /** Contents of the box */
  children: PropTypes.node
};

export default ControlsBox;
