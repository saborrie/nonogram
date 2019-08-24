import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  row: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

function GameBoardRow(props) {
  const classes = useStyles();

  const { children } = props;

  return <div className={classes.row}>{children}</div>;
}

GameBoardRow.propTypes = {
  /** Contents of the game board row */
  children: PropTypes.node
};

export default GameBoardRow;
