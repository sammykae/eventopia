import React from "react";
import { makeStyles, Link, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import LogIn from "./LogIn";

const useStyles = makeStyles((theme) => ({
	modalContent: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: `50%`,
		left: `50%`,
		transform: `translate(-50%, -50%)`,
		outlineColor: theme.palette.secondary.light,
	},
	buttonLink: {
		marginRight: theme.spacing(2),
		fontFamily: theme.typography.special,
		color: theme.palette.primary.main,
		cursor: "pointer",
	},
	menuButton: {
		marginRight: theme.spacing(2),
		fontFamily: theme.typography.special,
		fontSize: 18,
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
		"&:hover": {
			color: "#d334ff",
		},
	},
	title: {
		fontFamily: theme.typography.special,
		color: theme.palette.primary.dark,
	},
}));

export default function LoginModal() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Link className={classes.menuButton} underline="none">
				Log In
			</Link>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="Eventopia log in"
				aria-describedby="log into your Eventopia account here"
				disableAutoFocus={true}
			>
				<div className={classes.modalContent}>
					<LogIn />
				</div>
			</Modal>
		</>
	);
}
