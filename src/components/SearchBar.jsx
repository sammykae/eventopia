import React, { useState, useEffect } from "react";
import {
	Paper,
	makeStyles,
	Typography,
	IconButton,
	CircularProgress,
	Box,
	Divider,
} from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import GoogleMapsSearchBox from "./GoogleMapsSearchBox";
import SelectOption from "./SelectOption";
import DateSelector from "./DateSelector";
import { Button, Link } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import hometypes from "../searchtypes.json";
import format from "date-fns/format";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import getLocation from "../utils/getGeographicLocation";

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(1),
		padding: theme.spacing(2),
		width: "50vw",
		backgroundColor: "rgba(255,255,255,.7)",
		[theme.breakpoints.down("sm")]: {
			backgroundColor: "rgba(255,255,255,.7)",
			width: "85vw",
			paddingBottom: theme.spacing(5),
			margin: "auto",
		},
	},
	title: {
		fontFamily: theme.typography.special,
		color: " #d334ff",
		paddingBottom: theme.spacing(1.5),
	},
	form: {
		display: "flex",
		// flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "center",
		flexWrap: "wrap",
		// width: "100%",
	},
	formElementWrapper: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	dateSelect: {
		[theme.breakpoints.down("xs")]: {
			paddingTop: theme.spacing(1.5),
		},
	},
	hometype: {
		marginLeft: "1em",
	},
	searchButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 2,
		marginTop: 5,
		borderRadius: 300,
		padding: 5,
		backgroundColor: theme.palette.primary.main,
		color: "#ffffff",
		border: "none",
		cursor: "pointer",
	},
	searchIcon: {
		fontSize: 30,
	},
	demoSearch: {
		marginTop: theme.spacing(2),
	},
	link: {
		color: " #d334ff",
	},
	box: {
		width: "fit-content",
		margin: "auto",
		paddingTop: "20vh",
		paddingBottom: "50px",
	},
	search: {
		paddingTop: 15,
	},
	hero: {
		width: "50vw",
		margin: "auto",
		// fontFamily: theme.typography.special,
		// color: theme.palette.primary.main,
		color: " #ffffff",
		// [theme.breakpoints.down("md")]: {
		// 	paddingTop: theme.spacing(20),
		// },
		[theme.breakpoints.down("sm")]: {
			width: "80vw",
		},
	},

	heroText: {
		fontSize: 60,
		fontWeight: "bold",
	},
	heroText2: {
		fontSize: 30,
		fontWeight: "bold",
	},
	button: {
		margin: "20px 0",
		fontFamily: theme.typography.special,
	},
}));

const demoSearch =
	"/search?lat=48.856614&lng=2.3522219&query=Paris,%20France&startDate=&homeType=";

const SearchBar = ({ setSearchResults }) => {
	const classes = useStyles();
	const browserLocation = useLocation();
	const history = useHistory();
	const [location, setLocation] = useState("");
	const [homeType, setHomeType] = useState("");
	const [startDate, setStartDate] = useState("");
	const [processingLocation, setProcessingLocation] = useState(false);

	const queryLocation = (lat, lng, description, startDate, homeType) => {
		history.push(
			`/search?lat=${lat}&lng=${lng}&query=${description}&startDate=${
				startDate || ""
			}&homeType=${homeType || ""}`
		);
		if (setSearchResults)
			setSearchResults({
				lat,
				lng,
				description,
				startDate,
				hometype: homeType,
			});
	};

	const search = async (e) => {
		e.preventDefault();

		if (!location) {
			setTimeout(() => {
				if (!location) return alert("Please select a location to search.");
				else {
					queryLocation(
						location.geometry.location.lat,
						location.geometry.location.lng,
						location.description,
						startDate,
						homeType
					);
				}
			}, 500);
		} else {
			queryLocation(
				location.geometry.location.lat,
				location.geometry.location.lng,
				location.description,
				startDate,
				homeType
			);
		}
	};

	const searchCurrentLocation = async (e) => {
		e.preventDefault();
		setProcessingLocation(true);
		try {
			const res = await getLocation();
			queryLocation(
				res.latitude,
				res.longitude,
				"My current location",
				startDate,
				homeType
			);
		} catch (err) {}

		setProcessingLocation(false);
	};
	// const todayStr = format(Date.now(), "y-MM-d");
	return (
		<>
			<Box
				className={[
					classes.box,
					browserLocation?.pathname !== "/" && classes.search,
				]}
			>
				<Typography variant="h5" component="h3" className={classes.title}>
					Find Your Next Event-Room
				</Typography>
				<Paper className={classes.root}>
					<form className={classes.form} onSubmit={search}>
						{/* <div className={classes.formElementWrapper}> */}
						{processingLocation ? (
							<CircularProgress size={20} />
						) : (
							<IconButton onClick={searchCurrentLocation}>
								<MyLocationIcon className={classes.searchIcon} />
							</IconButton>
						)}
						{/* </div> */}
						{/* <div className={classes.formElementWrapper}> */}
						<GoogleMapsSearchBox formSetter={setLocation} required />
						{/* </div> */}
						{/* <span className={classes.dateSelect}>
            <DateSelector
              labelText="Start Date"
              formSetter={setStartDate}
              defaultValue={todayStr}
              required
            />
          </span>
          <SelectOption
            labelText="Home Type"
            formSetter={setHomeType}
            className={classes.hometype}
            options={hometypes}
          /> */}
						{/* <div className={classes.formElementWrapper}> */}
						<button
							className={classes.searchButton}
							variant="contained"
							color="primary"
							href="#"
							onClick={search}
						>
							<ArrowForwardOutlinedIcon className={classes.searchIcon} />
						</button>
						{/* </div> */}
					</form>
				</Paper>
				{browserLocation.pathname === "/" && (
					<Typography align="center" className={classes.demoSearch}>
						Don't know where to start? Try&nbsp;
						<Link className={classes.link} href={demoSearch}>
							Paris, Ile de France
						</Link>
					</Typography>
				)}
			</Box>

			{browserLocation.pathname === "/" && (
				<Box className={classes.hero}>
					<Box>
						<Typography
							variant="h3"
							component="h3"
							style={{ fontFamily: "inherit", margin: "20px 0" }}
							className={classes.heroText}
						>
							Eventopia
						</Typography>

						<p className={classes.heroText2}>
							Making event planning easier, more affordable and more
							enjoyable!!!
						</p>
						<Button
							variant="contained"
							color="white"
							size="large"
							href="/search"
							className={classes.button}
						>
							Get Started
						</Button>
					</Box>
				</Box>
			)}
		</>
	);
};

export default SearchBar;
