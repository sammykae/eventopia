import React, { useState, useContext } from "react";
import {
	Paper,
	Box,
	makeStyles,
	Typography,
	IconButton,
	Link,
	Chip,
	Avatar,
} from "@material-ui/core";
import pink from "@material-ui/core/colors/pink";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HotelIcon from "@material-ui/icons/Hotel";
import GroupIcon from "@material-ui/icons/Group";
import BathtubIcon from "@material-ui/icons/Bathtub";
import WifiIcon from "@material-ui/icons/Wifi";
import ContactModal from "./ContactModal";
import context from "./Context";
import Button from "./Button";
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: 250,
		minWidth: 280,
		// maxWidth: 400,
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		borderRadius: 10,
		overflow: "hidden",
		boxShadow: "0px 0px 10px gray",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
	img: {
		backgroundPosition: "center",
		//TODO: add a better default img
		// backgroundImage: `url(https://r-cf.bstatic.com/images/hotel/max1024x768/365/36548015.jpg)`,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		// minHeight: 225,
		// minWidth: 350,
		// maxWidth: 400,
		objectFit: "cover",
		width: "100%",
		height: 250,
		display: "inline-block",
		borderRight: `1px solid #fafafa`,
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			minWidth: "100%",
		},
	},
	mainContent: {
		padding: theme.spacing(2),
		boxSizing: "border-box",
		paddingTop: theme.spacing(4),
		width: "95%",
		minHeight: 225,
		[theme.breakpoints.down("sm")]: {
			paddingTop: theme.spacing(2),
		},
	},
	topContent: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column-reverse",
			alignItems: "flex-start",
		},
	},
	heartButton: {
		color: pink[500],
		[theme.breakpoints.down("sm")]: {
			margin: 0,
			marginRight: theme.spacing(1),
			alignSelf: "flex-start",
		},
	},
	title: {
		fontFamily: theme.typography.special,
		color: theme.palette.primary.dark,
		boxOrient: "vertical",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: 2,
		display: "-webkit-box",
		lineClamp: 1,
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "normal",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column-reverse",
			// alignItems: 'flex-start',
		},
	},
	price: {
		whiteSpace: "normal",
		fontSize: 20,
		display: "flex",
		justifyContent: "space-between",
		margin: "10px 0",
		color: theme.palette.primary.light,
	},
	chips: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	chip: {
		backgroundColor: theme.palette.secondary.light,
		margin: theme.spacing(1),
		padding: theme.spacing(0.5),
		[theme.breakpoints.down("xs")]: {
			margin: theme.spacing(0.25),
		},
	},
	owner: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginTop: theme.spacing(4),
		[theme.breakpoints.down("sm")]: {
			flexWrap: "wrap",
		},
	},
	ownerInfo: {
		display: "inline-flex",
		justifyContent: "left",
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			flexGrow: 1,
			paddingRight: theme.spacing(2.5),
			paddingBottom: theme.spacing(1.5),
		},
	},
	contactButton: {
		marginTop: theme.spacing(2),
		alignSelf: "center",
		justifySelf: "center",
		// paddingRight: theme.spacing(3),
	},
	overview: {
		boxOrient: "vertical",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: 2,
		display: "-webkit-box",
		lineClamp: 2,
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "normal",
	},
	// titlelink: {
	// 	width: "50%",
	// 	whiteSpace: "normal",
	// 	overflow: "hidden",
	// 	textOverflow: "ellipsis",
	// },
}));

export default function ListingCard({ listing }) {
	const classes = useStyles();
	const {
		user: { uid },
	} = useContext(context);

	const [hearted, setHearted] = useState(false);
	const overview = listing.roommates
		? `${listing.type}`
		: `Whole ${listing.type}`;

	const toggleFavorite = () => {
		setHearted(!hearted);
	};
	const triggerModal = () => {
		//TODO add modal for contacting host
	};
	return (
		<Paper className={classes.root} elevation={2}>
			{listing.primary_img && (
				<div
					className={classes.img}
					style={{ backgroundImage: `url(${listing.primary_img})` }}
				></div>
			)}
			<Box className={classes.mainContent}>
				<Box className={classes.topContent}>
					<Typography
						variant="p"
						component="p"
						color="textSecondary"
						className={classes.overview}
					>
						{overview}
						{" • "}
						{listing.location.description}
					</Typography>
					<IconButton className={classes.heartButton} onClick={toggleFavorite}>
						{/* {hearted ? <FavoriteIcon /> : <FavoriteBorderIcon />} */}
					</IconButton>
				</Box>
				<Typography variant="h4" component="h3" className={classes.title}>
					<Link
						underline="none"
						className={classes.titlelink}
						href={`/listings/${listing.id}`}
					>
						{listing.title}
					</Link>
				</Typography>
				<Box className={classes.price}>
					<Typography variant="h5" component="p">
						Price
					</Typography>
					<Typography variant="h5" component="p">
						{`$${listing.price}/day`}
					</Typography>
				</Box>
				<Box className={classes.chips}>
					<Chip
						icon={<HotelIcon />}
						label={`${listing.bedrooms} bedroom`}
						className={classes.chip}
					/>
					<Chip
						icon={<GroupIcon />}
						label={
							listing.max_guests > 1
								? `${listing.max_guests} guests`
								: `${listing.max_guests} guest`
						}
						className={classes.chip}
					/>
					<Chip
						icon={<BathtubIcon />}
						label={`${listing.bathrooms} bath`}
						className={classes.chip}
					/>
					{listing.wifi_speed && (
						<Chip
							icon={<WifiIcon />}
							label={`${listing.wifi_speed} mb/s`}
							className={classes.chip}
						/>
					)}
				</Box>
				<div className={classes.owner}>
					<div className={classes.ownerInfo}>
						<Avatar
							src={listing.owner.profile_picture}
							alt={`${listing.owner.first_name} ${listing.owner.last_name}`}
							style={{ marginRight: 5, display: "inline-block" }}
						/>
						Listing by{" "}
						<Link
							underline="none"
							href={`/users/${listing.owner.username}`}
							style={{ marginLeft: 5 }}
						>
							{`${listing.owner.first_name} ${listing.owner.last_name}`}
						</Link>
					</div>
					{listing.owner.uid !== uid ? (
						<ContactModal
							username={listing.owner.username}
							className={classes.contactButton}
						/>
					) : (
						<Link href={`/listings/${listing.id}/edit`} underline="none">
							<Button href={`/listings/${listing.id}/edit`}>Update</Button>
						</Link>
					)}
					{/* {<ContactModal username={listing.owner.username} />} */}
				</div>
			</Box>
		</Paper>
	);
}
