import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './../config/config.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use( express.json() );
app.use( cookieParser() )

// get data of students and subects from db
export const studentData = async ( req, res ) => {
  try {
    res.set( {
      "Cache-Control": "no-store, no-cache, must-revalidate, private",
      "Pragma": "no-cache",
      "Expires": "0",
    } );


    const studentsResult = await pool.query( 'SELECT * FROM students' );
    const subjectsResult = await pool.query( 'SELECT * FROM subjects' );
    const GradesResult = await pool.query( 'SELECT s.f_name, sub.sub_name AS subject, t.term_name AS term, g.id, g.grade, g.enrolment_date, g.student_id, g.subject_id, g.term_id FROM grades g JOIN students s ON g.student_id = s.id JOIN subjects sub ON g.subject_id = sub.id JOIN terms t ON g.term_id = t.id;' );

    // Map students oo password oo delete password si aan front uga muuqan
    const students = studentsResult.rows.map( student => {
      const { st_pass, ...rest } = student; // destructure st_pass
      return rest; // return student without st_pass
    } );

    const subjects = subjectsResult.rows;

    res.json( {
      students,
      subjects,
      grades: GradesResult.rows
    } );

  } catch ( err ) {
    console.error( 'Error fetching data:', err )
    res.status( 500 ).json( { error: 'Internal server error' } )
  }
}

export const loginStudent = async ( req, res ) => {
  try {

    const { id, password } = req.body;

    const isStudentExist = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [id]
    );

    if ( isStudentExist.rows.length === 0 ) {
      return res.status( 400 ).send( "invalid ID" );
    }

    const student = isStudentExist.rows[0];

    const isPasswordCorrect = await bcrypt.compare( password, student.st_pass );

    if ( !isPasswordCorrect ) return res.status( 400 ).send( "incorrect password" );

    // token generate
    const expiresIn = 7 * 24 * 60 * 60;

    const token = jwt.sign( { id: student.id }, JWT_SECRET, { expiresIn } )

    res.cookie( 'token', token, {
      httpOnly: true,
      // secure: false,
      secure: true,
      sameSite: 'none',
      maxAge: expiresIn * 1000,
    } );

    student.st_pass = undefined;


    res.status( 200 ).send( { ...student, expiresIn } );

  } catch ( err ) {
    console.log( 'error at login student ', err )
    res.status( 400 ).send( err.message )
  };
};

export const registStudent = async ( req, res ) => {
  const { f_name, s_name, l_name, gender, st_pass } = req.body;
  const hashedPassword = await bcrypt.hash( st_pass, 10 );

  try {

    const result = await pool.query( "INSERT INTO students (f_name, s_name, l_name, gender, st_pass) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [f_name, s_name, l_name, gender, hashedPassword]
    )

    res.status( 201 ).send( "Registered Successfully" );

  } catch ( error ) {
    res.status( 400 ).send( error.message );
  }
}

export const addGrades = async ( req, res ) => {
  const { student_id, subject_id, term_id, grade } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO grades (student_id, subject_id, term_id, grade)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [student_id, subject_id, term_id, grade]
    );

    res.json( { updated: result.rows[0] } );

  } catch ( err ) {
    console.error( err );
    res.status( 500 ).json( { error: 'Failed to add grade' } );
  }
};

// PUT route to update a grade by student + subject
export const updateGrade = async ( req, res ) => {
  const { student_id, subject_id, term_id, grade } = req.body;

  try {
    const result = await pool.query(
      `UPDATE grades
       SET grade = $1
       WHERE student_id = $2 AND subject_id = $3 AND term_id = $4
       RETURNING *`,
      [grade, student_id, subject_id, term_id]
    );

    res.json( { updated: result.rows[0] } );
  } catch ( err ) {
    console.error( err );
    res.status( 500 ).send( "Failed to update grade" );
  }
};

export const deleteGrade = async ( req, res ) => {
  const { id } = req.body; // row id

  try {
    const result = await pool.query(
      `DELETE FROM grades WHERE id = $1 RETURNING *`,
      [id]
    );

    if ( result.rowCount === 0 ) {
      return res.status( 404 ).json( { error: "No grade found with that id" } );
    }

    res.json( { deleted: result.rows[0] } );
  } catch ( err ) {
    console.error( err );
    res.status( 500 ).json( { error: "Failed to delete grade" } );
  }
};

