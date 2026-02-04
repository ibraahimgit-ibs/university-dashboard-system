import cookieParser from 'cookie-parser';
import cors from "cors";
import express from 'express';
import { port as PORT } from './config/config.js';
import { authenticate } from './middleware/authMiddleware.js';
import userRouter from './routes/user.js';

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


// ***************Routes**************//
app.use( '/api/user', userRouter );
// -----------------------------------//


// **********auth**********//
app.get( "/api/check-auth", authenticate, ( req, res ) => {
  res.set( 'Cache-Control', 'no-store' );
  res.json( { loggedIn: true, user: req.student } );
} );
// -------------------------



app.listen( PORT, () => {
  console.log( `Server is running on http://localhost:${ PORT }` );
} );
