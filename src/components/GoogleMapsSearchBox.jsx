import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import geocoder from "../google-maps/geocoder";

function loadScript(src, position, id) {
	if (!position) {
		return;
	}

	const script = document.createElement("script");
	script.setAttribute("async", "");
	script.setAttribute("id", id);
	script.src = src;
	position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.text.secondary,
		marginRight: theme.spacing(2),
	},
	textfield: {
		// borderBottom: "2px solid red",
	},
	auto: {
		width: "70%",
		marginRight: -25,
		[theme.breakpoints.down("lg")]: {
			width: "70%",
		},
		[theme.breakpoints.down("sm")]: {
			width: "70%",
		},
		[theme.breakpoints.down("xs")]: {
			width: "52%",
		},
	},
}));

export default function GoogleMapsAutoComplete({
	formSetter,
	variant,
	label,
	inputVal,
	defaultValue,
	helperText,
	required,
}) {
	const classes = useStyles();
	const [value, setValue] = React.useState(null);
	const [inputValue, setInputValue] = React.useState(defaultValue);
	const [options, setOptions] = React.useState([]);
	const loaded = React.useRef(false);

	if (typeof window !== "undefined" && !loaded.current) {
		if (!document.querySelector("#google-maps")) {
			loadScript(
				"https://maps.googleapis.com/maps/api/js?key=AIzaSyBSHvxwJqoYbeiJTby6ijIkR74Bia1bJ0s&libraries=places",
				document.querySelector("head"),
				"google-maps"
			);
		}

		loaded.current = true;
	}

	const fetch = React.useMemo(
		() =>
			throttle((request, callback) => {
				autocompleteService.current.getPlacePredictions(request, callback);
			}, 200),
		[]
	);

	React.useEffect(() => {
		let active = true;

		if (!autocompleteService.current && window.google) {
			var autocompleteOptions = {
				types: ["establishment", ""],
			};
			autocompleteService.current =
				new window.google.maps.places.AutocompleteService(autocompleteOptions);
		}
		if (!autocompleteService.current) {
			return undefined;
		}

		if (inputValue === "") {
			setOptions(value ? [value] : []);
			return undefined;
		}

		fetch({ input: inputValue }, (results) => {
			if (active) {
				let newOptions = [];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	return (
		<Autocomplete
			id="google-map-autocomplete-search"
			// style={{ width: 390 }}
			getOptionLabel={(option) =>
				typeof option === "string" ? option : option.description
			}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			color="white"
			// disableClearable
			className={classes.auto}
			freeSolo
			fullWidth
			includeInputInList
			filterSelectedOptions
			value={value}
			onChange={async (event, newValue) => {
				//NOTE: this 'value' is what we want to track and send to parent
				setOptions(newValue ? [newValue, ...options] : options);
				const geo = await geocoder.geocodeFromAddress(newValue.description);
				newValue.geometry = geo;
				setValue(newValue);
				formSetter(newValue);
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label || "Location"}
					variant={variant || "standard"}
					color="white"
					inputLabelProps={{
						style: {
							color: "#ffffff",
						},
					}}
					// fullWidth
					defaultValue={inputValue}
					helperText={helperText}
					// required={required}
					className={classes.textfield}
				/>
			)}
			renderOption={(option) => {
				const matches =
					option.structured_formatting.main_text_matched_substrings;
				const parts = parse(
					option.structured_formatting.main_text,
					matches.map((match) => [match.offset, match.offset + match.length])
				);

				return (
					<Grid container alignItems="center">
						<Grid item>
							<LocationOnIcon className={classes.icon} />
						</Grid>
						<Grid item xs>
							{parts.map((part, index) => (
								<span
									key={index}
									style={{
										fontWeight: part.highlight ? 700 : 400,
									}}
								>
									{part.text}
								</span>
							))}

							<Typography variant="body2" color="textSecondary">
								{option.structured_formatting.secondary_text}
							</Typography>
						</Grid>
					</Grid>
				);
			}}
		/>
	);
}
