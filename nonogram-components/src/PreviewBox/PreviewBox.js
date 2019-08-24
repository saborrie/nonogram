import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  previewWrapper: {
    height: 120,
    width: 120,
    padding: 2
  },
  preview: {
    background: "#dfdfdf",
    width: "100%",
    height: "100%",
    borderRadius: 2,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

function PreviewBox(props) {
  const classes = useStyles();
  const { children } = props;

  return (
    <div className={classes.previewWrapper}>
      <div className={classes.preview}>{children}</div>
    </div>
  );
}

PreviewBox.propTypes = {
  /** The contents of the preview box */
  children: PropTypes.node
};

export default PreviewBox;
