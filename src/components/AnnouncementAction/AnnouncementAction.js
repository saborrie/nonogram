import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  announcementAction: {
    padding: 8
  }
}));

function AnnouncementAction(props) {
  const classes = useStyles();

  const { children } = props;

  return <div className={classes.announcementAction}>{children}</div>;
}

AnnouncementAction.propTypes = {
  /** Contents of the bar */
  children: PropTypes.node
};

export default AnnouncementAction;
