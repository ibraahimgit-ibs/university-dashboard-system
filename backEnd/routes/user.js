import express from 'express'
import {
    addGrades,
    deleteGrade,
    loginStudent,
    registStudent,
    studentData,
    updateGrade
} from '../controller/userController.js'
import { authenticate } from '../middleware/authMiddleware.js';
const app = express();

app.use( express.json() );

const userRouter = express.Router();

userRouter.get( '/user-data', authenticate, studentData );
userRouter.post( '/login-user', loginStudent );
userRouter.post( '/regist-user', registStudent );
userRouter.post( '/add-grades', authenticate, addGrades );
userRouter.put( '/update-grade', authenticate, updateGrade );
userRouter.delete( '/delete-grade', authenticate, deleteGrade );

// **********logout**********//
userRouter.post( "/logout", ( req, res ) => {
    res.clearCookie( "token" )
    res.status( 200 ).json( { message: "Logged out successfully" } );
} );
// -------------------------


export default userRouter;
