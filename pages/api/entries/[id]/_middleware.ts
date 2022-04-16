import { NextFetchEvent, NextRequest, NextResponse } from "next/server";


export function middleware( req: NextRequest, ev: NextFetchEvent ) {
    
    const id = req.page.params?.id || '';

    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

    if ( !checkMongoIDRegExp.test(id) ){
        
        
    return new Response( JSON.stringify({ message: 'El id no es valido'}), {
            status: 400,
            headers: {
                'Content-Type': 'aplication/json'
            }
        })
    }
    
    return NextResponse.next();
}