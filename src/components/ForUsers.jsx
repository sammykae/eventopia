import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Paper, Box, Typography, Divider, Container, Button} from "@material-ui/core/";
import Card from './Card';
import remoteWork from '../vector-icons/green/remote-work.svg'
import selectingHome from '../vector-icons/green/many-homes.svg'
import directCommunication from '../vector-icons/green/conversation.svg'
import shareNews from '../vector-icons/green/news-megaphone.svg'
import controlSettings from '../vector-icons/green/control-settings.svg'
import payment from '../vector-icons/green/transfer-money.svg'
const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1.5),
    padding: theme.spacing(2),
    maxWidth: "90vw",
    backgroundColor: theme.palette.background.default,
  },
  sectionWrapper: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: "1rem",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark,
  },
  ownerLearnMoreWrapper: {
    width: "1005",
    display: "flex",
    justifyContent: "center",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

const ForUsers = () => {
  const classes = useStyles();

  return (
    <>
     
    </>
  );
};

export default ForUsers;
