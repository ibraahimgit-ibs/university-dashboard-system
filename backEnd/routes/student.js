import express from 'express'
import {
    addGrades,
    deleteGrade,
    loginStudent,
    registStudent,
    studentData,
    updateGrade
} from '../controller/studentController.js'
import { authenticate } from '../middleware/authMiddleware.js';
const app = express();

app.use( express.json() );

const studentRouter = express.Router();

studentRouter.get( '/student-data', authenticate, studentData );
studentRouter.post( '/login-student', loginStudent );
studentRouter.post( '/regist-student', registStudent );
studentRouter.post( '/add-grades', addGrades );
studentRouter.put( '/update-grade', updateGrade );
studentRouter.delete( '/delete-grade', deleteGrade );


export default studentRouter;
