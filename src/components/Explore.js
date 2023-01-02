import { makeStyles } from "@material-ui/core";
import React from "react";
import { places } from "../utils/data";

const useStyles = makeStyles((theme) => ({
	// img: {
	// 	[theme.breakpoints.down("xs")]: {
	// 		width: 200,
	// 		height: 250,
	// 	},
	// },
}));
export default function Explore() {
	const classes = useStyles();
	return (
		<>
			<h2>Explore nearby</h2>
			<div className="items">
				{places.map((item, index) => (
					<div key={index} className="item">
						<div className="img">
							{/* <img
								width={64}
								height={64}
								alt={item.name}
								src={`/images/explore/${index + 1}.jpg`}
								className="shadow"
							/> */}
							<img
								width={128}
								height={128}
								alt={item.name}
								// className="img"
								src={`/images/explore/${index + 1}.jpg`}
							/>
						</div>
						<span>
							<h3>{item.name}</h3>
							<p>{item.time}-hour drive</p>
						</span>
					</div>
				))}
			</div>
		</>
	);
}
