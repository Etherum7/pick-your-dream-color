import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles/NavBarStyles';
import './NavBar.css';

function NavBar(props) {
	const { level, handleSlider, show, classes } = props;
	const [ format, changeFormat ] = useState('hex');
	const [ open, setOpen ] = useState(false);
	function closeSnackbar() {
		setOpen(false);
	}
	async function handleChange(evt) {
		await Promise.resolve(changeFormat(evt.target.value));
		//console.log(Promise.resolve(changeFormat(evt.target.value)))
		await Promise.resolve(setOpen(true));
		props.handleChange(format);
	}
	return (
		<header className={classes.NavBar}>
			<div className={classes.logo}>
				<Link to="/pick-your-dream-color">ReactColorPicker</Link>
			</div>
			{show && (
				<div>
					<span>Level:{level}</span>

					<div className="slider">
						<Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={handleSlider} />
					</div>
				</div>
			)}
			<div className={classes.SelectContainer}>
				<Select value={format} onChange={handleChange}>
					<MenuItem value="hex">HEX -#ffffff</MenuItem>
					<MenuItem value="rgb">RGB -rgb(255,255,255)</MenuItem>
				</Select>
			</div>

			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={open}
				autoHideDuration={3000}
				message={<span id="message-id">"Format Changed to {format.toUpperCase()}"</span>}
				ContentProps={{
					'aria-describedby': 'message-id'
				}}
				onClose={closeSnackbar}
				action={[
					<IconButton onClick={closeSnackbar} color="inherit" key="close" aria-label="close">
						<CloseIcon />
					</IconButton>
				]}
			/>
		</header>
	);
}

export default withStyles(styles)(NavBar);
