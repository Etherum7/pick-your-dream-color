import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import arrayMove from 'array-move';
import classNames from 'classnames';
import PaletteFormNav from './PaletteFormNav';
import ChromePickerForm from './ChromePickerForm';
import DraggableColorList from './DraggableColorList';
import SeedColors from './SeedColors';
import styles from './styles/NewPaletteFormStyles';

function NewPaletteForm(props) {
	const { classes, maxAllowedColors, allPalette } = props;
	const [ open, setOpen ] = useState(true);
	const [ colors, setColors ] = useState(SeedColors[0].colors);
	const paletteIsFull = colors.length >= maxAllowedColors;
	function addNewColor(newColor) {
		setColors([ ...colors, newColor ]);
	}

	function handleDrawerOpen() {
		setOpen(true);
	}

	function handleDrawerClose() {
		setOpen(false);
	}

	function onSortEnd({ oldIndex, newIndex }){
		setColors(arrayMove(colors, oldIndex, newIndex));
	};
	function handleSubmit(newPalette) {
		const Palette = {
			...newPalette,
			id: newPalette.paletteName.toLowerCase().replace(/ /g, '-'),
			colors: colors
		};
		props.savePalette(Palette);
		props.history.push('/pick-your-dream-color');
	}

	function removeColor(colorName) {
		setColors(colors.filter((color) => color.name !== colorName));
	}
	function clearColors() {
		setColors([]);
	}
	function randomColors() {
		const allColors = SeedColors.map((p) => p.colors).flat();
		let randomIndex = Math.floor(Math.random() * allColors.length);
		let randomColor = allColors[randomIndex];
		let isDuplicateColor = true;
		while (isDuplicateColor) {
			randomIndex = Math.floor(Math.random() * allColors.length);
			randomColor = allColors[randomIndex];
			// eslint-disable-next-line
			isDuplicateColor = colors.some((color) => color.name === randomColor.name);
		}
		setColors([ ...colors, randomColor ]);
	}
	return (
		<div className={classes.root}>
			<PaletteFormNav
				handleDrawerOpen={handleDrawerOpen}
				open={open}
				classes={classes}
				handleSubmit={handleSubmit}
				allPalette={allPalette}
			/>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>

				<Divider />
				<div className={classes.container}>
					<div className={classes.concon}>
						<Typography variant="h4">Design Your Palette</Typography>
						<div className={classes.buttons}>
							<Button
								variant="contained"
								color="secondary"
								className={classes.buttons}
								onClick={clearColors}
							>
								Clear Palette
							</Button>
							<Button
								variant="contained"
								color="primary"
								className={classes.buttons}
								disabled={paletteIsFull}
								onClick={randomColors}
							>
								Random Palette
							</Button>
						</div>

						<ChromePickerForm paletteIsFull={paletteIsFull} colors={colors} addNewColor={addNewColor} />
					</div>
				</div>
			</Drawer>
			<main
				className={classNames(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />
				<DraggableColorList colors={colors} removeColor={removeColor} axis="xy" onSortEnd={onSortEnd} />
			</main>
		</div>
	);
}

NewPaletteForm.defaultProps = {
	maxAllowedColors: 20
};
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
