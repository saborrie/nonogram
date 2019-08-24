import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  columnClueWrapper: {
    width: 40,
    height: 120,
    padding: 2
  },
  rowClueWrapper: {
    width: 120,
    height: 40,
    padding: 2
  },
  clue: {
    height: "100%",
    width: "100%",
    background: "#f0f0f0",
    borderRadius: 2,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  },
  columnClue: {
    flexDirection: "column"
  },
  completeClue: {
    background: theme.palette.primary[100]
  },
  item: {
    width: 20,
    lineHeight: "20px",
    textAlign: "center"
    // display: 'inline-block',
  }
}));

function Clue(props) {
  const classes = useStyles();

  const { children, variant, completed } = props;

  return (
    <div
      className={clsx({
        [classes.columnClueWrapper]: variant == "column",
        [classes.rowClueWrapper]: variant == "row"
      })}
    >
      <div
        className={clsx(classes.clue, {
          [classes.columnClue]: variant === "column",
          [classes.completeClue]: completed
        })}
      >
        {Array.isArray(children) &&
          children.map(item => <div className={classes.item}>{item}</div>)}
      </div>
    </div>
  );
}

Clue.defaultProps = {
  variant: "column",
  completed: false
};

Clue.propTypes = {
  /** Contents of the clue */
  children: PropTypes.array,
  /** Whether row or column */
  variant: PropTypes.string.isRequired,
  /** Whether or not this clue should be highlighted as completed */
  completed: PropTypes.bool
};

export default Clue;
