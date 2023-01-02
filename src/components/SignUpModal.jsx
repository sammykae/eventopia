import React from "react";
import { makeStyles, Link, Typography, Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import SignUp from "./SignUp";

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

export default function MyModal() {
	const classes = useStyles();
	//   const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Link
				onClick={handleOpen}
				className={classes.menuButton}
				underline="none"
			>
				Sign Up
			</Link>
			{/* <Button
				variant="contained"
				color="primary"
				className={classes.menuButton}
				onClick={handleOpen}
			>
				Sign Up
			</Button> */}
			{/* <Link>
        <Typography
          variant="h6"
          component="span"
          className={classes.buttonLink}
          onClick={handleOpen}
        >
          Sign Up
        </Typography>
      </Link> */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="Eventopia sign up"
				aria-describedby="sign up to Eventopia here"
				disableAutoFocus={true}
				// className={classes.modal}
			>
				<div className={classes.modalContent}>
					<SignUp />
				</div>
			</Modal>
		</>
	);
}
