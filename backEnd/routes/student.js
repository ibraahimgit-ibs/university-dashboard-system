import express from 'express'
import {
    loginStudent,
    registStudent,
    studentData
} from '../controller/studentController.js'
const app = express();

app.use( express.json() );

const studentRouter = express.Router();

studentRouter.get( '/student-data', studentData );
studentRouter.post( '/login-student', loginStudent );
studentRouter.post( '/regist-student', registStudent );

export default studentRouter;
