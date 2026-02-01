import { useContext } from "react";
import StudentContext from "./studentContext";

export const useStudent = () => useContext( StudentContext );

export default useStudent;
