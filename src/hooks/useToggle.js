import {useState} from 'react';
 function useToggle(initialState= false){
    const [state, setState]= useState(initialState);
    function toggle(state) {
        return setState(!state);
    }
    return [state, toggle];

}
export default useToggle;