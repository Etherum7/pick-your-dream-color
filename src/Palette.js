import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteColors';
function Palette({ palette, classes }) {
	const { colors, paletteName, emoji, id } = palette;
	const [ level, setLevel ] = useState(500);
	const [ format, setFormat ] = useState('hex');
	const colorBoxes = colors[level].map((color) => (
		<ColorBox
			background={color[format]}
			name={color.name}
			key={color.id}
			showFullPalette={true}
			moreUrl={`/palette/${id}/${color.id}`}
		/>
	));

	function changeFormat(val) {
		setFormat(val);
	}

	function handleSlider(level) {
		setLevel(level);
	}
	return (
		<div className={classes.Palette}>
			<NavBar level={level} show={true} handleSlider={handleSlider} handleChange={changeFormat} />

			<div className={classes.PaletteColors}>{colorBoxes}</div>

			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
}

export default withStyles(styles)(Palette);
