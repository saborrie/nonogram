import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: 20,
    padding: [[2, 40]]
  },
  title: {
    textAlign: "center",
    fontFamily: "'Pacifico', cursive",
    textTransform: "none",
    color: "white"
  }
}));

function TitlebarLink(props) {
  const classes = useStyles();

  const { children, ...rest } = props;

  return (
    <Button className={classes.button} {...rest}>
      <Typography variant="h6" className={classes.title}>
        {children}
      </Typography>
    </Button>
  );
}

TitlebarLink.propTypes = {
  /** Contents of the link */
  children: PropTypes.node
};

export default TitlebarLink;
