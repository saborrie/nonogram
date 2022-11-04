import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  square: {
    width: 40,
    height: 40,
    padding: 2,
  },
  squareButton: {
    width: "100%",
    height: "100%",
    background: "#dfdfdf",
    borderRadius: 2,
  },
  dark: {
    background: theme.palette.custom.lightGrey,
  },
  filledSquareButton: {
    background: theme.palette.primary.main,
    boxShadow: `inset 0px -2px 0px ${theme.palette.primary.dark}`,
  },
  warning: {
    border: "1.5px solid red",
  },
}));

function GameSquare(props) {
  const classes = useStyles();

  const { warning, filled, crossed, onClick, dark } = props;

  return (
    <div className={classes.square}>
      <ButtonBase
        onClick={onClick}
        className={clsx(classes.squareButton, {
          [classes.dark]: dark,
          [classes.filledSquareButton]: filled,
          [classes.warning]: warning,
        })}
      >
        {crossed && "x"}
      </ButtonBase>
    </div>
  );
}

GameSquare.propTypes = {
  /** True if the square should be outlined to show it is invalid */
  warning: PropTypes.bool,
  /** True if the square should be filled in */
  filled: PropTypes.bool,
  /** True if the square should be crossed out */
  crossed: PropTypes.bool,
  /** Handler for onClick event  */
  onClick: PropTypes.func,
};

export default GameSquare;
