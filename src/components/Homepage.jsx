import React from "react";
// import { } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hero from "./Hero";
import ForUsers from "./ForUsers";
import SearchBar from "./SearchBar";
import MainContentWrapper from "./MainContentWrapper";
import Cards from "../components/Cards";
import { live, discover } from "../utils/data";
import { Box } from "@material-ui/core";
import Explore from "./Explore";
import Hosting from "./Hosting";
import Banner from "./Banner";
const useStyles = makeStyles((theme) => ({
	sectionWrapper: {
		margin: "40px 0",
	},
}));

const Homepage = () => {
	const classes = useStyles();

	return (
		<>
			<div className="hero">
				<SearchBar />
			</div>
			<div className={"cardWrapper"}>
				<Box className={classes.sectionWrapper}>
					<Explore />
				</Box>
				<Box className={classes.sectionWrapper}>
					<Banner />
				</Box>
				<Box className={classes.sectionWrapper}>
					<Cards {...live} live={true} />
				</Box>
				<Box className={classes.sectionWrapper}>
					<Cards {...discover} live={false} />
				</Box>
				<Box className={classes.sectionWrapper}>
					<Hosting {...discover} live={false} />
				</Box>
			</div>
			{/* <MainContentWrapper>
				<ForUsers />
			</MainContentWrapper> */}
		</>
	);
};

export default Homepage;
