import express from 'express'
import {
    addGrades,
    changePassword,
    deleteGrade,
    loginStudent,
    registStudent,
    studentData,
    updateGrade
} from '../controller/userController.js'
import { authenticate, authorizeAdmin, authorizeTeacher } from '../middleware/authMiddleware.js';
const app = express();

app.use( express.json() );

const userRouter = express.Router();

userRouter.get( '/user-data', authenticate, studentData );
userRouter.post( '/login-user', loginStudent );
userRouter.post( '/regist-user', authenticate, authorizeAdmin, registStudent );
userRouter.post( '/add-grades', authenticate, authorizeTeacher, addGrades );
userRouter.put( '/update-grade', authenticate, authorizeTeacher, updateGrade );
userRouter.delete( '/delete-grade', authenticate, authorizeTeacher, deleteGrade );
userRouter.put( '/changePassword', authenticate, changePassword );

// **********logout**********//
userRouter.post( "/logout", ( req, res ) => {
    res.clearCookie( "token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    } );
    res.status( 200 ).json( { message: "Logged out successfully" } );
} );

// -------------------------


export default userRouter;
