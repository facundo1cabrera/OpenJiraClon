import { ReactNode, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';

import { Entry } from '../../interfaces';
import { entriesApi } from '../../api';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
],
}

export const EntriesProvider = ({ children }: {children: ReactNode}) => {

    const { enqueueSnackbar } = useSnackbar();

    const [state, dispatch] = useReducer( entriesReducer , ENTRIES_INITIAL_STATE );

    const addNewEntry = async( description: string ) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] Add-Entry', payload: data });
        refreshEntries();
    }

    const updateEntry = async( { _id, description, status }: Entry, showSnackbar = false  ) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });
            dispatch({ type: '[Entry] Entry-Updated', payload: data });

            if ( showSnackbar ) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }
        } catch (error) {
            console.log({ error });
        }
    }

    const deleteEntry = async ( id: string, showSnackbar: boolean ) => {
        try {
            await entriesApi.delete<void>(`/entries/${ id }`);
            dispatch({ type: '[Entry] Delete-Entry', payload: id})

            if ( showSnackbar ) {
                enqueueSnackbar('Entrada Eliminada', {
                    variant: 'info',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }

        } catch (error) {

        }
    }

    const refreshEntries = async() => {
        const  { data }  = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data });
    }

    useEffect(() => {
        console.log("Ejecutando refreshEntries");
      refreshEntries();
    }, []);
    


    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
            deleteEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}