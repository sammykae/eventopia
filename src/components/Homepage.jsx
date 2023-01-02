import React from "react";
// import { } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hero from "./Hero";
import ForUsers from "./ForUsers";
import SearchBar from "./SearchBar";
import MainContentWrapper from "./MainContentWrapper";

const useStyles = makeStyles((theme) => ({
	searchWrapper: {
		zIndex: 1,
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		left: "50%",
		top: "50%",
	},
}));

const Homepage = () => {
	const classes = useStyles();

	return (
		<>
			<div className="hero">
				<SearchBar />
			</div>
			{/* <Hero /> */}
			{/* <MainContentWrapper>
				<ForUsers />
			</MainContentWrapper> */}
		</>
	);
};

export default Homepage;
