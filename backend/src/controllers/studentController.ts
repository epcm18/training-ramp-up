import { Student } from "../models/Student";
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import StudentService from "../services/studentService";

const StudentController = {
  addNewStudentController: async (req: Request, res: Response) => {
    try {
      console.log("hello 1");
      //const studentRepository = AppDataSource.getRepository(Student);
      // Create a new student instance with data from the request body
      //console.log("hello 2");
      await StudentService.addNewStudentService(req, res);
    } catch (error) {
      // Log the error for debugging purposes
      console.log(req.body);
      console.error("Error adding a new student:", error);

      // Send an error response with a 500 Internal Server Error status code
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllStudentsController: async (req: Request, res: Response) => {
    try {
      await StudentService.getAllStudentsService(req, res);
    } catch (error) {
      console.log(req.body);
      console.error("Error getting all students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  editStudentController: async (req: Request, res: Response) => {
    try {
      await StudentService.editStudentService(req, res);
    } catch (error) {
      console.log(req.body);
      console.error("Error editing student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteStudentController: async (req: Request, res: Response) => {
    try {
      await StudentService.deleteStudentService(req, res);

      console.log("delete controller", res.statusCode);
    } catch (error) {
      console.log(req.body);
      console.error("Error deleting student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default StudentController;
