import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import ListingCard from "./ListingCard";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
	root: {
		// minHeight: "10vh",
		// marginLeft: theme.spacing(10),
		// marginRight: theme.spacing(10),
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr",
		columnGap: 20,
		[theme.breakpoints.down("md")]: {
			gridTemplateColumns: "1fr 1fr",
		},
		[theme.breakpoints.down("sm")]: {
			columnGap: 10,
			gridTemplateColumns: "1fr 1fr",
		},
		[theme.breakpoints.down("xs")]: {
			gridTemplateColumns: "1fr",
		},
	},
}));
export default function Listings({ listings }) {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			{listings && listings.length ? (
				<>
					{listings.map((listing) => (
						<ListingCard key={uuid()} listing={listing} />
					))}
				</>
			) : (
				<p>No listings yet!</p>
			)}
		</Box>
	);
}
