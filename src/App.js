import React from 'react';
import useLocalStorageState from './hooks/useLocalStorageState';
import {Route, Switch} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {generatePalette} from './ColorHelpers';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import SeedColors from './SeedColors';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';

function App() {
	const [
		palettes,
		setPalettes
	] = useLocalStorageState('palettes', SeedColors);
	function removePalette(id) {
		const Palettes = palettes.filter((palette) => palette.id !== id);
		setPalettes(Palettes);
	}
	function findPalette(id) {
		return palettes.find(function(palette) {
			return palette.id === id;
		});
	}
	function savePalette(newPalette) {
		const Palettes = [
			...palettes,
			newPalette
		];
		setPalettes(Palettes);
	}

	return (
		<div>
			<Route
				render={({location}) => (
					<TransitionGroup>
						<CSSTransition
							key={location.key}
							classNames="page"
							timeout={500}>
							<Switch location={location}>
								<Route
									exact
									path="/pick-your-dream-color"
									render={(routeProps) => (
										<Page>
											<PaletteList
												removePalette={removePalette}
												{...routeProps}
												palettes={palettes}
											/>
										</Page>
									)}
								/>

								<Route
									exact
									path="/palette/new"
									render={(routeProps) => (
										<Page>
											<NewPaletteForm
												savePalette={savePalette}
												allPalette={palettes}
												{...routeProps}
											/>
										</Page>
									)}
								/>

								<Route
									exact
									path="/palette/:id"
									render={(routeProps) => (
										<Page>
											<Palette
												palette={generatePalette(
													findPalette(
														routeProps.match.params
															.id
													)
												)}
											/>
										</Page>
									)}
								/>

								<Route
									exact
									path="/palette/:paletteId/:colorId"
									render={(routeProps) => (
										<Page>
											<SingleColorPalette
												color={
													routeProps.match.params
														.colorId
												}
												palette={generatePalette(
													findPalette(
														routeProps.match.params
															.paletteId
													)
												)}
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>
		</div>
	);
}
export default App;
