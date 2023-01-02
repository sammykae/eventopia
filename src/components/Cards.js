import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	imgcard: {
		[theme.breakpoints.down("xs")]: {
			width: 200,
			height: 250,
		},
	},
}));

export default function Cards({ title, items, urlPrefix, live }) {
	const classes = useStyles();
	return (
		<>
			<h2>{title}</h2>

			<div className={live ? "cards" : "cards2"}>
				{items.map((item, index) => (
					<div key={index} className="card">
						<div className="img">
							<img
								width={128}
								height={128}
								style={{ objectFit: "cover" }}
								alt={item.title}
								src={urlPrefix + item.img}
								className="shadow"
							/>
							<img
								width={200}
								style={{ objectFit: "cover" }}
								height={200}
								alt={item.title}
								className={"imgcard"}
								src={urlPrefix + item.img}
							/>
						</div>
						<span>
							<h3>{item.title}</h3>
							{item.p && <p>{item.p}</p>}
						</span>
					</div>
				))}
			</div>
		</>
	);
}
