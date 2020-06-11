import React, { useState } from 'react';
import useToggle from './hooks/useToggle';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';
import './PaletteList.css';
function PaletteList({ palettes, removePalette, classes, history }) {
	const [ openDeleteDialog, toggleDeletingDialog ] = useToggle(false);
	const [ deletingId, setDeletingId ] = useState('');
	function toggleDialog() {
		toggleDeletingDialog(openDeleteDialog);
    }
    function SetDeletingId(id){
        toggleDialog();
        setDeletingId(id);
    }
	function deleteDialog() {
		removePalette(deletingId);
        toggleDialog();
        setDeletingId('');
        
	}
	function goToPalette(id) {
		history.push(`/palette/${id}`);
	}
	return (
		<div
			className={classNames(classes.root, {
				body: true
			})}
		>
			<div className={classes.container}>
				<nav className={classes.nav}>
					<h1>React Colors</h1>
					<Link to="/palette/new">Create New Palette</Link>
				</nav>

				<TransitionGroup className={classes.palettes}>
					{palettes.map((palette) => (
                        
						<CSSTransition key={palette.id} timeout={500} classNames="fade">
							<MiniPalette
                                SetDeletingId={SetDeletingId}
								{...palette}
								goToPalette={goToPalette}
								key={palette.id}
							/>
						</CSSTransition>            
					))
                    }
             <Dialog open={openDeleteDialog} aria-labelledby="delete-this-dialog" onClose={toggleDialog}>
				<DialogTitle id="delete-this-dialog">Delete this Palette?</DialogTitle>
				<List>
					<ListItem button onClick={deleteDialog}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
								<CheckIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText>Delete</ListItemText>
					</ListItem>
					<ListItem button onClick={toggleDialog}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
								<CloseIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText>Cancel</ListItemText>
					</ListItem>
				</List>
			</Dialog>
				</TransitionGroup>
			</div>
			
		</div>
	);
}

export default withStyles(styles)(PaletteList);
