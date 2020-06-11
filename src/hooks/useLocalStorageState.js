import { useState, useEffect } from 'react';
function useLocalStorageState(key, defaultPalettes) {
	const [ state, setState ] = useState(() => {
		let val;
		try {
			val = JSON.parse(window.localStorage.getItem(key) || String(defaultPalettes));
		} catch (e) {
			val = defaultPalettes;
		}
		return val;
	});
	useEffect(
		() => {
			window.localStorage.setItem(key, JSON.stringify(defaultPalettes));
		},
		[  key , defaultPalettes, state ]
	);
	return [ state, setState ];
}
export default useLocalStorageState;
