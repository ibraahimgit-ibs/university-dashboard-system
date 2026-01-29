import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const { Pool } = pg;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASS
// });

const pool = new Pool( {
    connectionString: process.env.DATABASE_URL, ssl: {
        rejectUnauthorized: false, // Render requires SSL 
    },
} );

pool.query( 'SELECT NOW()' )
    .then( res => console.log( 'Connected:', res.rows[0] ) )
    .catch( err => console.error( 'DB connection error:', err ) );



export default pool;