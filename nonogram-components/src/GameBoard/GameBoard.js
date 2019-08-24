import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  gameWrapper: {
    display: "flex",
    padding: 4,
    justifyContent: "center"
  },
  game: {
    padding: 8
  }
}));

function GameBoard(props) {
  const classes = useStyles();

  const { children } = props;

  return (
    <div className={classes.gameWrapper}>
      <Paper className={classes.game}>{children}</Paper>
    </div>
  );
}

GameBoard.propTypes = {
  /** Contents of the game board */
  children: PropTypes.node
};

export default GameBoard;
