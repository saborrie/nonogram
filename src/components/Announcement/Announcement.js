import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles(theme => ({
  announcementWrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  announcement: {
    padding: 20,
    color: "white",
    textAlign: "center"
  }
}));

function Announcement(props) {
  const classes = useStyles();

  const { children, open } = props;

  return (
    <Modal open={Boolean(open)}>
      <Fade timeout={1000} in={Boolean(open)}>
        <div className={classes.announcementWrapper}>
          <div className={classes.announcement}>{children}</div>
        </div>
      </Fade>
    </Modal>
  );
}

Announcement.propTypes = {
  /** Contents of the bar */
  children: PropTypes.node
};

export default Announcement;
