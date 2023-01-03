import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import logo from "../theme/logo-big.webp";
import SignUpModal from "./SignUpModal";
import ProfileMenu from "./ProfileMenu";
import appContext from "./Context";
import LogInModal from "./LogInModal";
import MobileNavMenu from "./MobileNavMenu";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 3,
	},
	appBar: {
		background: "transparent",
		height: "80px",
		[theme.breakpoints.down("md")]: {
			display: "flex",
			// width: "100vw",
			justifyContent: "space-between",
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		fontFamily: theme.typography.special,
		fontSize: 18,
		display: "flex",
		alignItems: "center",
		"&:hover": {
			color: "#d334ff",
		},
	},
	menuLink: {
		marginRight: theme.spacing(2),
		fontFamily: theme.typography.special,
		color: theme.palette.primary.main,
	},
	logo: { width: 50 },
	title: {
		flexGrow: 3,
		fontFamily: theme.typography.special,
		color: theme.palette.primary.main,
		[theme.breakpoints.down("md")]: {
			display: "none",
		},
	},
	rightNav: {
		flexGrow: 0.3,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		[theme.breakpoints.down("md")]: {
			justifyContent: "normal",
			flexGrow: 0,
			columnGap: "20px",
			marginRight: -20,
		},
		[theme.breakpoints.down("sm")]: {
			justifyContent: "normal",
			flexGrow: 0,
			columnGap: "20px",
		},
	},
	profileMenu: {
		fontSize: "1.5rem",
	},
}));

export default function MenuAppBar() {
	const classes = useStyles();
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const [scrolled, setScrolled] = useState(false);
	const headRef = useRef();
	const setScroll = () => {
		const offset = window.scrollY;

		if (offset > 50) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", setScroll);

		if (scrolled) {
			headRef.current.style.background = "#ffffff";
		} else {
			headRef.current.style.background = "transparent";
		}

		return () => {
			window.removeEventListener("scroll", setScroll);
		};
	}, [scrolled]);
	const { loggedIn } = useContext(appContext);

	return (
		<div className={classes.root}>
			<div position="static">
				<Toolbar ref={headRef} className={classes.appBar}>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						href="/"
					>
						<img src={logo} alt="aCasa logo" className={classes.logo} />
					</IconButton>
					<Typography variant="h4" component="h2" className={classes.title}>
						<Link underline="none" href="/">
							Eventopia
						</Link>
					</Typography>

					<div className={classes.rightNav}>
						{smallScreen ? (
							<MobileNavMenu />
						) : (
							<>
								<Link
									className={classes.menuButton}
									underline="none"
									href="/search"
								>
									<SearchIcon style={{ paddingRight: 3 }} />
									Discover Homes
								</Link>

								{loggedIn ? (
									<>
										{/* <Button
											variant="contained"
											color="primary"
											className={classes.menuButton}
											href="/create-listing"
										>
											<AddIcon style={{ paddingRight: 10 }} />
											Create Listing
										</Button> */}
										<Link
											className={classes.menuButton}
											underline="none"
											href="/create-listing"
										>
											<AddIcon style={{ paddingRight: 3 }} />
											Create Listing
										</Link>
										<ProfileMenu className={classes.profileMenu} />
									</>
								) : (
									<>
										<SignUpModal />
										<LogInModal />
									</>
								)}
							</>
						)}
					</div>
				</Toolbar>
			</div>
		</div>
	);
}
