import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniColorPalette';

const MiniPalette= React.memo(function MiniPalette({ classes, paletteName, SetDeletingId, goToPalette, id, emoji, colors }) {
	function deletePalette(evt) {
		evt.stopPropagation();
		SetDeletingId(id);
	}
	function handleClick() {
		goToPalette(id);
	}
	const colorBoxes = colors.map((color) => (
		<div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
	));
   
	return (
		<div className={classes.root} onClick={handleClick}>
			<DeleteIcon
				className={classes.deleteIcon}
				style={{ transition: 'all 0.3s ease-in-out' }}
				onClick={deletePalette}
			/>

			<div className={classes.colors}>{colorBoxes}</div>
			<h5 className={classes.title}>
				{paletteName}
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
})

export default withStyles(styles)(MiniPalette);
