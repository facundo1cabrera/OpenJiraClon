import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';


export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const UIProvider = ({ children }: {children: ReactNode}) => {

    const [state, dispatch] = useReducer(uiReducer , UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' });
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar'});
    }

    const setIsAddingEntry = (bool: boolean) => {
        dispatch({type: 'UI - Set isAddingEnry', payload: bool})
    }

    const startDragging = () => {
        dispatch({ type: 'UI - Start Dragging'});
    }

    const endDragging = () => {
        dispatch({type: 'UI - End Dragging'});
    }

    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu,

            setIsAddingEntry,

            endDragging,
            startDragging
        }}>
            { children }
        </UIContext.Provider>
    )
}