import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import styles from './styles/ChromePickerStyles';

function ChromePickerForm(props) {
	const { paletteIsFull, classes, addNewColor } = props;
	const [ colorCurrent, changeCurrentColor ] = useState('teal');
	const [ newColorName, changeNewColorName ] = useState('');

	function handleSubmit() {
		const newColor = { color: colorCurrent, name: newColorName };
		addNewColor(newColor);
		changeNewColorName('');
	}
	function updateColor(newColor) {
		changeCurrentColor(newColor.hex);
	}
	function handleChange(evt) {
		changeNewColorName(evt.target.value);
	}
	useEffect(() => {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);

		ValidatorForm.addValidationRule('isColorUnique', () =>
			props.colors.every(({ color }) => color !== colorCurrent)
		);
	});

	return (
		<div>
			<ChromePicker
				color={colorCurrent}
				onChangeComplete={(newColor) => updateColor(newColor)}
				className={classes.picker}
			/>
			<ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
				<TextValidator
					className={classes.ColorNameInput}
					value={newColorName}
					name="newColorName"
					placeholder="Color Name"
					variant="filled"
					onChange={handleChange}
					validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
					errorMessages={[ 'this field is required', 'ColorName should be unique', 'Color is already used' ]}
				/>

				<Button
					variant="contained"
					color="secondary"
					type="submit"
					disabled={paletteIsFull}
					className={classes.addColor}
					style={{ backgroundColor: paletteIsFull ? 'grey' : colorCurrent }}
				>
					{paletteIsFull ? 'Palette Full' : 'Add Colors'}
				</Button>
			</ValidatorForm>
		</div>
	);
}

export default withStyles(styles)(ChromePickerForm);
