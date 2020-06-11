import React from 'react';
import useToggle from './hooks/useToggle';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';
function PaletteFormNav(props) {
	const [ formShowing, toggleForm ] = useToggle(false);
	const { classes, open, handleSubmit, handleDrawerOpen, allPalette } = props;
	const toggleFormFunction = () => {
		toggleForm(formShowing);
	};
	return (
		<div className={classes.root}>
			<CssBaseline />

			<AppBar
				position="fixed"
				color="default"
				className={classNames(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar disableGutters={!open}>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawerOpen}
						className={classNames(classes.menuButton, open && classes.hide)}
					>
						<AddToPhotosIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" noWrap>
						Create A Palette
					</Typography>
				</Toolbar>

				<div className={classes.navBtns}>
					<Link to="/pick-your-dream-color">
						<Button
							// size='small'
							variant="contained"
							color="secondary"
						>
							Go Back
						</Button>
					</Link>
					<Button variant="contained" color="primary" onClick={toggleFormFunction}>
						Save
					</Button>
				</div>
				{formShowing && (
					<PaletteMetaForm handleSubmit={handleSubmit} hideForm={toggleFormFunction} allPalette={allPalette} />
				)}
			</AppBar>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
