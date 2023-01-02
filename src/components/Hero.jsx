import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import womanMountainHome from "../vector-icons/green/woman-with-home-mountain.svg";

const useStyles = makeStyles((theme) => ({
	hero: {
		display: "grid",
		gridTemplateColumns: "1.25fr 1fr",
		// padding: "6em 5em 0",
		alignItems: "center",
		height: "100vh",
		fontFamily: theme.typography.special,
		color: theme.palette.primary.dark,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.down("md")]: {
			paddingTop: theme.spacing(20),
		},
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			flexDirection: "column-reverse",
			paddingTop: theme.spacing(12),
			paddingLeft: theme.spacing(0),
			paddingRight: theme.spacing(0),
			paddingBottom: theme.spacing(6),
			width: "100%",
		},
	},
	heroImg: {
		width: 500,
		opacity: 0.8,
		height: 300,
		backgroundPosition: "center",
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
		[theme.breakpoints.down("md")]: {
			marginBottom: theme.spacing(1),
			height: 250,
			width: "auto",
		},

		[theme.breakpoints.down("sm")]: {
			width: 300,
		},
	},
	heroText: {
		padding: theme.spacing(1.5),
	},
	button: {
		fontFamily: theme.typography.special,
	},
}));

const Hero = () => {
	const classes = useStyles();

	return (
		// <>
		// 	<Box className={classes.hero}>
		// 		<Box className={classes.heroText}>
		// 			<Typography
		// 				variant="h5"
		// 				component="p"
		// 				style={{ fontFamily: "inherit" }}
		// 			>
		// 				Eventopia
		// 			</Typography>

		// 			<p>
		// 				Making event planning easier, more affordable and more enjoyable
		// 				with Eventopia!
		// 			</p>
		// 			<Button
		// 				variant="contained"
		// 				color="primary"
		// 				href="/search"
		// 				className={classes.button}
		// 			>
		// 				Get Started
		// 			</Button>
		// 		</Box>
		// 	</Box>
		// 	<Divider />
		// </>
		null
	);
};

export default Hero;
