import express from 'express';
import studentRouter from './routes/student.js';
import { port as PORT } from './config/config.js';
import cors from "cors";

const app = express();
app.use( express.json() );
app.use( cors( { origin: "https://university-dashboard-system.vercel.app/" } ) );

app.use( '/api/student', studentRouter );

app.listen( PORT, () => {
  console.log( `Server is running on http://localhost:${ PORT }` );
} );
