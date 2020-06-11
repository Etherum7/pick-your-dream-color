import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';
import styles from './styles/PaletteColors';

function SingleColorPalette({ palette, color, classes }) {
	const { paletteName, emoji, id } = palette;
	const [ format, setFormat ] = useState('hex');
	function changeFormat(val) {
		setFormat(val);
	}

	function gatherShades(palette, colorToFilterBy) {
		let shades = [];
		let allColors = palette.colors;

		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter((color) => color.id === colorToFilterBy));
		}
		return shades.slice(1);
	}
	const _shades = gatherShades(palette, color);
	const colorBoxes = _shades.map((color) => (
		<ColorBox key={color.name} background={color[format]} name={color.name} showFullPalette={false} />
	));
	return (
		<div className={classes.Palette}>
			<NavBar handleChange={changeFormat} show={false} />
			<div className={classes.PaletteColors}>
				{colorBoxes}
				<div className={classes.goBack}>
					<Link to={`/palette/${id}`}>Go Back</Link>
				</div>
			</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
}

export default withStyles(styles)(SingleColorPalette);
