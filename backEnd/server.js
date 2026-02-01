import express from 'express';
import studentRouter from './routes/student.js';
import { port as PORT } from './config/config.js';
import cors from "cors";
import { authenticate } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use( express.json() );
app.use( cookieParser() );
app.use( cors( {
  origin: "https://university-dashboard-system.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
} ) );

app.use( ( err, req, res, next ) => {
  console.error( err.stack );
  res.status( 500 ).json( { error: "Something went wrong", details: err.message } );
} );


app.use( '/api/student', studentRouter );


// **********auth**********//
app.get( "/api/check-auth", authenticate, ( req, res ) => {
  res.set( 'Cache-Control', 'no-store' );
  res.json( { loggedIn: true, student: req.student } );
} );
// -------------------------

// **********logout**********//
app.post( "/api/logout", ( req, res ) => {
  res.clearCookie( "token" );
  res.status( 200 ).json( { message: "Logged out successfully" } );
} );
// -------------------------


app.listen( PORT, () => {
  console.log( `Server is running on http://localhost:${ PORT }` );
} );
