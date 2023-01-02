import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	main: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		marginTop: "150px",
		marginBottom: theme.spacing(3),
	},
}));
const MainContentWrapper = ({ children }) => {
	const classes = useStyles();
	return <main className={classes.main}>{children}</main>;
};

export default MainContentWrapper;
