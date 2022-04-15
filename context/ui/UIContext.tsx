import { createContext } from 'react';
interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;

    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (bool: boolean) => void;
    startDragging: () => void;
    endDragging: () => void;
}


export const UIContext = createContext({} as ContextProps);