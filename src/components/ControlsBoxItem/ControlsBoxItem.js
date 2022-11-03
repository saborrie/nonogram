import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  box: {
    padding: 8
  }
}));

function ControlsBoxItem(props) {
  const classes = useStyles();

  const { children } = props;

  return <div className={classes.box}>{children}</div>;
}

ControlsBoxItem.propTypes = {
  /** Contents of the box */
  children: PropTypes.node
};

export default ControlsBoxItem;
