import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = 
    | { message: string }
    | IEntry 
    | IEntry[]
    | { message: string, deletedEntry: IEntry}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query;

    // if ( !mongoose.isValidObjectId(id) ){
    //     return res.status(400).json({ message: 'El id no es valido ' + id });
    // }

    switch ( req.method) {
        case 'PUT':
            return updateEntry( req, res );
        
        case 'GET':
            return getEntries( res );

        case 'DELETE':
            return deleteEntry( req, res );

        default:
            return res.status(400).json({ message: 'endpoint no valido '});
    }

}

const updateEntry = async ( req: NextApiRequest, res:  NextApiResponse ) => {
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById( id );

    if ( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese id'});
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true});
        await db.disconnect();
        res.status(200).json( updatedEntry! );
    } catch (error: any) {
        return res.status(400).json({ message: error.errors.status.message});
    }
    

}

const getEntries = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnect();

    return res.status(200).json( entries );
}

const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse ) => {
    const { id } = req.query;

    await Entry.findByIdAndDelete(id, async (err: mongoose.CallbackError , deletedEntry: mongoose.Document<IEntry>) => {
        if (err){
            await db.disconnect();
            return res.status(400).json({ message: 'No hay entrada con ese id'});
        }
        else{
            await db.disconnect();
            return res.status(200).json({ message: 'Entrada eliminada con exito', deletedEntry})

        }
    });

}