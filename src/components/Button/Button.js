import React from "react";
import PropTypes from "prop-types";
import MuiButton from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: [[15, 20]]
  }
}));

function Button(props) {
  const { onClick, disabled, children, primary, ...rest } = props;
  const classes = useStyles();

  return (
    <MuiButton
      color={primary ? "primary" : "default"}
      disabled={disabled}
      variant="contained"
      onClick={onClick}
      className={classes.root}
      {...rest}
    >
      {children}
    </MuiButton>
  );
}

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  style: {}
};

Button.propTypes = {
  /** Boolean indicating whether the button should render as disabled */
  disabled: PropTypes.bool,
  /** Boolean indicating whether the button should render as theme colour */
  primary: PropTypes.bool,
  /** button label. */
  children: PropTypes.node,
  /** onClick handler */
  onClick: PropTypes.func
};

export default Button;
