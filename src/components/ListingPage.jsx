import React, { useState, useEffect, useCallback } from "react";
import MainContentWrapper from "./MainContentWrapper";
import ContentPaper from "./ContentPaper";
import ListingHeader from "./ListingHeader";
import ListingPhotos from "./ListingPhotos";
import ContactModal from "./ContactModal";
import {
	Box,
	makeStyles,
	Typography,
	Link,
	Chip,
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
} from "@material-ui/core";
import dateFormatter from "../utils/dateFormatter";
import { useParams } from "react-router-dom";
import HotelIcon from "@material-ui/icons/Hotel";
import GroupIcon from "@material-ui/icons/Group";
import BathtubIcon from "@material-ui/icons/Bathtub";
import WifiIcon from "@material-ui/icons/Wifi";
import PetsIcon from "@material-ui/icons/Pets";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import GavelIcon from "@material-ui/icons/Gavel";
import ListingMap from "./ListingMap";
import LooksIcon from "@material-ui/icons/Looks";
import getListingById from "../queries/listings/getListingById";
import Head from "./Head";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import axios from "axios";
import SectionCard from "./SectionCard";

const useStyles = makeStyles((theme) => ({
	contentWrapper: {
		maxWidth: 1200,
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			flexDirection: "column",
		},
	},
	mainContent: {
		margin: theme.spacing(1),
	},
	availability: {
		margin: theme.spacing(1),
		display: "flex",
		justifyContent: "space-between",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
	},

	title: {
		color: theme.palette.primary.dark,
		fontFamily: theme.typography.special,
	},
	chips: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		display: "flex",
		justifyContent: "center",
	},
	chip: {
		backgroundColor: theme.palette.secondary.light,
		margin: theme.spacing(1),
		padding: theme.spacing(0.5),
		[theme.breakpoints.down("xs")]: {
			margin: theme.spacing(0.25),
			padding: theme.spacing(0.25),
			fontSize: theme.typography.fontSize * 0.75,
		},
	},
	listingDescription: {
		marginTop: theme.spacing(2),
		paddingLeft: theme.spacing(5),
		paddingRight: theme.spacing(5),
	},
	spacing: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	locationTopContent: {
		paddingBottom: theme.spacing(1.5),
	},
	locationDescription: {
		marginTop: theme.spacing(1.5),
	},
	mapWrapper: {
		margin: theme.spacing(2),
		marginTop: theme.spacing(4),
	},
	availableNow: {
		color: theme.palette.secondary.dark,
		fontFamily: theme.typography.special,
	},
	ownerInfo: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(2.5),
		paddingLeft: theme.spacing(1.5),
	},
	contactButton: {
		marginTop: theme.spacing(2),
		alignSelf: "center",
		justifySelf: "center",
	},
	date: {
		textAlign: "center",
		width: "fit-content",
		margin: "auto",
	},
}));

export default function ListingPage() {
	const [selected, setSelected] = useState(new Date());

	let footer = <p>Please pick a day.</p>;
	if (selected) {
		footer = <p>You picked {format(selected, "PP")}.</p>;
	}

	const [listing, setListing] = useState({
		owner: {},
		additional_imgs: [],
		location: { geometry: { location: {} } },
		payment_methods: [],
	});
	const [availableNow, setAvailableNow] = useState(false);
	const classes = useStyles();
	const { id } = useParams();
	const overview = listing.shared
		? `Room in shared ${listing.type}`
		: `Whole ${listing.type}`;
	const [loader, setLoader] = useState(false);
	const [link, setLink] = useState("");
	//make sure goes to top of window on page load
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const getListing = useCallback(async () => {
		const listing = await getListingById(id);
		setListing(listing);
		let currentTime = new Date();
		currentTime = currentTime.getTime();
		const availableFrom = listing.start_date.toMillis();
		setAvailableNow(availableFrom <= currentTime);
	}, [id]);

	useEffect(() => {
		getListing();
	}, [getListing]);

	const getPayement = async (price) => {
		const url = "https://i3piuo.deta.dev/createLink/" + price;
		axios.get(url).then((response) => setLink(response));
		console.log(link);
		window.open(link.data);
	};
	return (
		<>
			{!!listing.title && (
				<Head
					title={listing.title}
					img={listing.primary_img}
					description={listing.description || ""}
				/>
			)}

			<MainContentWrapper>
				<div>
					<ListingPhotos
						title={listing.title}
						primaryImg={listing.primary_img}
						additionalImgs={listing.additional_imgs}
					/>
				</div>
				<main className={classes.contentWrapper}>
					<section className={classes.mainContent}>
						<SectionCard>
							<ListingHeader listing={listing} />
							{listing.title && (
								<div>
									<Typography
										className={classes.title}
										component="h3"
										variant="h5"
										align="center"
									>
										{overview}
									</Typography>
									<Box className={classes.chips}>
										<Chip
											icon={<HotelIcon />}
											label={
												listing.bedrooms >= 10
													? `${listing.bedrooms}+ bedroom`
													: `${listing.bedrooms} bedroom`
											}
											className={classes.chip}
										/>
										<Chip
											icon={<GroupIcon />}
											label={
												listing.max_guests >= 10
													? `${listing.max_guests}+ guest(s)`
													: `${listing.max_guests} guest(s)`
											}
											className={classes.chip}
										/>
										<Chip
											icon={<BathtubIcon />}
											label={
												listing.bathrooms >= 10
													? `${listing.bathrooms}+ bathroom`
													: `${listing.bathrooms} bathroom`
											}
											className={classes.chip}
										/>
									</Box>
								</div>
							)}
							{listing.description && (
								<>
									<div>
										<Typography className={classes.listingDescription}>
											{listing.description}
										</Typography>
									</div>
								</>
							)}

							<div className={classes.spacing}>
								<Typography
									component="h2"
									variant="h5"
									className={classes.title}
								>
									Additional Info
								</Typography>
								<List dense>
									{listing.wifi && (
										<ListItem>
											<ListItemIcon>
												<WifiIcon color="secondary" />
											</ListItemIcon>
											<ListItemText
												primary={
													<Typography>
														<b>Wifi:</b> {listing.wifi_speed} mb/s
													</Typography>
												}
											/>
										</ListItem>
									)}
									{listing.wifi && (
										<ListItem>
											<ListItemIcon>
												<WifiIcon color="secondary" />
											</ListItemIcon>
											<ListItemText
												primary={
													<Typography>
														<b>Wifi:</b> {listing.wifi_speed} mb/s
													</Typography>
												}
											/>
										</ListItem>
									)}
									{listing.lgbtq && (
										<ListItem>
											<ListItemIcon>
												<LooksIcon color="secondary" />
											</ListItemIcon>
											<ListItemText
												primary={<Typography>LGBTQ+ Friendly</Typography>}
											/>
										</ListItem>
									)}
									<ListItem>
										<ListItemIcon>
											<PetsIcon color="secondary" />
										</ListItemIcon>
										<ListItemText
											primary={
												<Typography>
													<b>Pets:</b>{" "}
													{listing.pets && listing.pets.length
														? listing.pets.join(", ")
														: "None"}
												</Typography>
											}
										/>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<MonetizationOnIcon color="secondary" />
										</ListItemIcon>
										<ListItemText
											primary={
												<Typography>
													<b>Payment Methods:</b>{" "}
													{listing.payment_methods &&
													listing.payment_methods.length
														? listing.payment_methods.join(", ")
														: "Discuss with host"}
												</Typography>
											}
										/>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<GavelIcon color="secondary" />
										</ListItemIcon>
										<ListItemText
											primary={
												<Typography>
													<b>House Rules:</b>{" "}
													{listing.rules && listing.rules.length
														? listing.rules.join(", ")
														: "Discuss with host"}
												</Typography>
											}
										/>
									</ListItem>
								</List>
								<Divider className={classes.sectionDivider} />
							</div>
						</SectionCard>
						<SectionCard>
							<section className={classes.availability}>
								<div>
									<Typography
										component="h2"
										variant="h5"
										align="center"
										className={classes.title}
									>
										Availability
									</Typography>
									<div className={classes.date}>
										{listing.start_date && availableNow && (
											<>
												<Typography
													className={classes.availableNow}
													align="center"
													variant="h6"
												>
													Available Now!
												</Typography>
												<br />
												<DayPicker
													mode="single"
													selected={selected}
													onSelect={setSelected}
													footer={footer}
												/>{" "}
												{/* On va utiliser l'attribut "hidden" du composant DayPicker afin de pouvoir masquer les dates qui ont deja ete loues */}
												<Button onClick={() => getPayement(listing.price)}>
													Reserve your event
												</Button>
											</>
										)}
									</div>
									<div>
										{listing.start_date && !availableNow && (
											<Typography align="center">
												<b>Available from:</b>{" "}
												{dateFormatter(listing.start_date)}
											</Typography>
										)}
									</div>

									<>
										{listing.end_date ? (
											<Typography align="center">
												<b>Available until:</b>{" "}
												{dateFormatter(listing.end_date)}
											</Typography>
										) : (
											<Typography align="center">
												No specified end date
											</Typography>
										)}
									</>
								</div>
								<div className={classes.spacing}>
									<Typography
										component="h3"
										variant="h5"
										className={classes.title}
										style={{ textAlign: "center" }}
									>
										Owner Info
									</Typography>
									<div className={classes.ownerInfo}>
										<Avatar
											src={listing.owner.profile_picture}
											alt={`${listing.owner.first_name} ${listing.owner.last_name}`}
											style={{ marginRight: 5, display: "inline-block" }}
										/>
										Listing by&nbsp;
										<Link
											href={`/users/${listing.owner.username}`}
											style={{ marginLeft: 5 }}
										>
											{`${listing.owner.first_name} ${listing.owner.last_name}`}
										</Link>
									</div>
									<div style={{ display: "flex", justifyContent: "center" }}>
										<ContactModal
											username={listing.owner.username}
											className={classes.contactButton}
										/>
									</div>
								</div>
							</section>
						</SectionCard>
						<SectionCard>
							<div>
								<div className={classes.locationTopContent}>
									<Typography
										component="h2"
										variant="h5"
										className={classes.title}
										style={{ paddingRight: "1.5em" }}
									>
										Location
									</Typography>
									<Typography
										component="p"
										variant="p"
										className={classes.locationDescription}
									>
										{listing.location_description}
									</Typography>
								</div>
								<div>
									<div className={classes.mapWrapper}>
										<ListingMap
											placeName={listing.location.description}
											lat={
												listing.location.geometry
													? listing.location.geometry.location.lat
													: null
											}
											lng={
												listing.location.geometry
													? listing.location.geometry.location.lng
													: null
											}
										/>
									</div>
								</div>
							</div>
						</SectionCard>
					</section>

					{/* TODO: FIX THIS uP WITH DATES */}
				</main>
			</MainContentWrapper>
		</>
	);
}
