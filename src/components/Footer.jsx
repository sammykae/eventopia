import React from 'react';
import {Box, Typography, Link} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
    //add styles
    root: {
        backgroundColor: theme.palette.secondary.light,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
        // minHeight: 60,
    },
    contact: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        
    },
    ghIcon: { 
        margin: '0 .25rem',
        position: 'relative',
        top: -3,
        color: theme.palette.primary.light
    }
}))

const Footer = () =>{
    const classes = useStyles();

    return (
<div></div>
    );
}

export default Footer;