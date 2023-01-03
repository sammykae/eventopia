import React from "react";
import ContentPaper from "./ContentPaper";
import {
	makeStyles,
	Box,
	Avatar,
	Typography,
	Button,
	CircularProgress,
} from "@material-ui/core";
import { format } from "date-fns";
import dateFormatter from "../utils/dateFormatter";
import SettingsIcon from "@material-ui/icons/Settings";
import ContactModal from "./ContactModal";
import SectionCard from "./SectionCard";
import EditIcon from "@material-ui/icons/Edit";
const useStyles = makeStyles((theme) => ({
	wrapper: {
		display: "flex",
		width: "60%",
		padding: theme.spacing(2),
		columnGap: "50px",
		[theme.breakpoints.down("lg")]: {
			width: "70%",
		},
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			width: "80%",
		},
		[theme.breakpoints.down("xs")]: {
			width: "95%",
			columnGap: 0,
			padding: 0,
		},
	},
	settingsButton: {
		position: "absolute",
	},
	profilePicture: {
		width: 325,
		height: 325,
		objectFit: "cover",
		[theme.breakpoints.down("sm")]: {
			width: 300,
			height: 300,
		},
	},
	mainProfileContent: {
		color: "#ffffff",
		padding: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "column",
		width: "100%",
		minHeight: 250,
		[theme.breakpoints.down("xs")]: {
			padding: 0,
		},
	},
	progress: {
		alignSelf: "center",
		justifySelf: "center",
		margin: theme.spacing(10),
	},
	primaryInfoWrapper: {
		color: "#ffffff",
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
	},
	title: {
		fontFamily: theme.typography.special,
		color: theme.palette.primary.dark,
		paddingBottom: theme.spacing(1.5),
	},
	joinDate: {
		margin: "10px 0",
		fontSize: "1.25rem",
		[theme.breakpoints.down("sm")]: {
			paddingBottom: theme.spacing(1.5),
		},
	},
	bold: {
		fontWeight: "bold",
	},
	secondaryInfo: {
		color: "#ffffff",
		paddingBottom: theme.spacing(2),
		fontSize: "1.25rem",
	},
	button: {
		fontFamily: theme.typography.special,
		display: "inline-flex",
		alignItems: "center",
		position: "static",
		height: 40,
		minWidth: 80,
		padding: theme.spacing(2),
	},
}));

export default function UserProfileInfo({ user, profile, username }) {
	const classes = useStyles();

	return (
		// <SectionCard>
		<Box className={classes.wrapper}>
			<Avatar
				src={user.profile_picture}
				alt={`${user.first_name}
                ${user.last_name}`}
				className={classes.profilePicture}
			/>
			<Box className={classes.mainProfileContent}>
				{!user?.joined ? (
					<CircularProgress className={classes.progress} size={100} />
				) : (
					// 	{console.log(user)}
					// </CircularProgress>
					<>
						<Box className={classes.primaryInfoWrapper}>
							<Box>
								<Typography
									variant="p"
									component="p"
									color="textSecondary"
									className={classes.joinDate}
								>
									Joined {user.joined}
								</Typography>
								<Typography
									variant="h3"
									component="h1"
									className={classes.title}
								>
									{user.first_name} {user.last_name}
								</Typography>
							</Box>
						</Box>

						<Box className={classes.secondaryInfoWrapper}>
							{user.location && user.location.description && (
								<Typography
									variant="p"
									component="p"
									color="textPrimary"
									className={classes.secondaryInfo}
								>
									<span className={classes.bold}>Location:</span>{" "}
									{user.location.description}
								</Typography>
							)}
							{!!user.languages && !!user.languages.length && (
								<Typography
									variant="p"
									component="p"
									color="textPrimary"
									className={classes.secondaryInfo}
								>
									<span className={classes.bold}>Languages:</span>{" "}
									{user.languages.join(", ")}
								</Typography>
							)}
							{user.bio && (
								<Typography
									variant="p"
									component="p"
									color="textPrimary"
									className={classes.secondaryInfo}
								>
									<span
										className={classes.bold}
										style={{ display: "block", marginBottom: ".25em" }}
									>
										About {user.first_name}:
									</span>
									{user.bio}
								</Typography>
							)}
						</Box>
						{profile ? (
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								href={"/profile/settings"}
							>
								<EditIcon style={{ paddingRight: ".25em" }} /> Edit Profile
							</Button>
						) : (
							<ContactModal userToContact={user} username={username} />
						)}
					</>
				)}
			</Box>
		</Box>
		// </SectionCard>
	);
}
