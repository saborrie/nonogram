import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  announcementText: {
    fontSize: 50,
    fontFamily: "'Pacifico', cursive",
    textTransform: "none",
    color: "white",
    margin: 20
  }
}));

function AnnouncementTitle(props) {
  const classes = useStyles();

  const { children } = props;

  return <div className={classes.announcementText}>{children}</div>;
}

AnnouncementTitle.propTypes = {
  /** Contents of the bar */
  children: PropTypes.node
};

export default AnnouncementTitle;
