import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {makeStyles, Typography} from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import WebIcon from "@material-ui/icons/Web";
import Link from "@material-ui/core/Link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    width: 450,
    [theme.breakpoints.down("xs")]: {
      width: "92%",
    },
  },
  bitmojiButton: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bitmoji-neutral.png)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: 66,
    width: 50,
    position: "fixed",
    bottom: 10,
    left: 15,
    zIndex: 25,
    cursor: 'pointer',
    "&:hover": {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bitmoji-smile.png)`,
    },
  },
  precache: {
    position: "absolute",
    bottom: 0,
    left: 0,
    opacity: 0.1,
    width: 2,
  },
  imgWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: `${theme.spacing(2)} 0`,
    width: "100%",
  },
  img: {
    maxWidth: 160,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
      color: theme.palette.primary.dark,
      fontFamily: theme.typography.special
  },
  contactInfo: {
    marginLeft: theme.spacing(10),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(0.5),
    },
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContactModal() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div></div>

  );
}
