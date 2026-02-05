import jwt from 'jsonwebtoken';

import { JWT_SECRET } from './../config/config.js';


export const authenticate = ( req, res, next ) => {

    const token = req.cookies.token;

    if ( !token ) return res.status( 403 ).send( "login denied please login" );


    try {

        const decoded = jwt.verify( token, JWT_SECRET );
        req.user = decoded;
        next();
    } catch ( error ) {
        return res.status( 401 ).json( { message: "Invalid token" } );
    }

};

export const authorizeAdmin = ( req, res, next ) => {
    if ( req.user.role !== "admin" ) {
        return res.status( 403 ).json( { error: "Access denied" } );
    }
    next();
};

export const authorizeTeacher = ( req, res, next ) => {
    if ( req.user.role !== "teacher" && req.user.role !== "admin" ) {
        return res.status( 403 ).json( { error: "Access denied" } );
    }
    next();
};