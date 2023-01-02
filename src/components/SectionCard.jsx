import React from "react";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
		margin: "20px 0",
		maxWidth: "95vw",
		// backgroundColor: theme.palette.background.default,
		boxShadow: "0px 0px 10px grey",
		boxSizing: "border-box",
		borderRadius: 10,
	},
}));

export default function SectionCard({ children, style }) {
	const classes = useStyles();
	return (
		<Paper className={classes.root} style={style}>
			{children}
		</Paper>
	);
}
