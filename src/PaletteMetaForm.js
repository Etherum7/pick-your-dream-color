import React, { useState, useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
function PaletteMetaform(props) {
	const { hideForm, handleSubmit, allPalette } = props;
	const [ stage, changeStage ] = useState('form');
	const [ newPaletteName, changenewPaletteName ] = useState(' ');

	useEffect(
		() => {
			ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
				allPalette.every((singlePalette) => singlePalette.paletteName.toLowerCase() !== value.toLowerCase())
			);
		},
		
	);

	function showEmojiPicker() {
		changeStage('emoji');
	}
	function handleChange(evt) {
		changenewPaletteName(evt.target.value);
	}
	function savePalette(emoji) {
		const newPalette = { paletteName: newPaletteName, emoji: emoji.native };
		changeStage('');
		
		handleSubmit(newPalette);
	}

	return (
		<div>
			<Dialog open={stage === 'emoji'} onClose={hideForm}>
				<DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
				<Picker title="Pick a Palette Emoji" onSelect={savePalette} />
			</Dialog>
			<Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
				<ValidatorForm onSubmit={showEmojiPicker}>
					<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Please choose a name for your beautiful palette. Make Sure it is unique.
						</DialogContentText>

						<TextValidator
							value={newPaletteName}
							name="newPaletteName"
							onChange={handleChange}
							fullWidth
							placeholder="Palette Name"
							margin="normal"
							validators={[ 'required', 'isPaletteNameUnique' ]}
							errorMessages={[ 'this field is required', 'PaletteName should be unique' ]}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={hideForm} color="primary">
							Cancel
						</Button>
						<Button size="medium" variant="contained" color="primary" type="submit">
							SavePalette
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		</div>
	);
}

export default PaletteMetaform;
