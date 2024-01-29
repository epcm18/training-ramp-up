import { Student } from "../models/Student";
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { Console } from "console";

const StudentService = {
  addNewStudentService: async (req: Request, res: Response) => {
    try {
      console.log("hello 1");
      const studentRepository = AppDataSource.getRepository(Student);
      // Create a new student instance with data from the request body
      console.log("hello 2");
      const newStudent = studentRepository.create(req.body);
      console.log("hello 3");
      console.log(req.body);
      console.log(newStudent);

      // Save the new student to the database
      const savedStudent = await studentRepository.save(newStudent);

      // Send the saved student data as the response
      return res.status(201).json(savedStudent);
    } catch (error) {
      // Log the error for debugging purposes
      console.log(req.body);
      console.error("Error adding a new student:", error);

      // Send an error response with a 500 Internal Server Error status code
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllStudentsService: async (req: Request, res: Response) => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const students = await studentRepository.find();
      res.status(201).json(students);
      return students;
    } catch (error) {
      console.log(req.body);
      console.error("Error getting all students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  editStudentService: async (req: Request, res: Response) => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const student = await studentRepository.findOne({
        where: { id: parseInt(req.params.id) },
      });
      console.log(student);
      if (student) {
        studentRepository.merge(student, req.body);
        const results = await studentRepository.save(student);
        return res.status(201).json(results);
      }
      return res.status(404).json({ message: "Student not found" });
    } catch (error) {
      console.log(req.body);
      console.error("Error editing student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteStudentService: async (req: Request, res: Response) => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const student = await studentRepository.findOne({
        where: { id: parseInt(req.params.id) },
      });
      console.log(student);
      if (student) {
        await studentRepository.remove(student);
        return res.status(204).end();
      }
      return res.status(404).json({ message: "Student not found" });
    } catch (error) {
      console.log(req.body);
      console.error("Error deleting student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default StudentService;
