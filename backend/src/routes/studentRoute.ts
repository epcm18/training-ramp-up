import express, { Router } from "express";
import StudentController from "../controllers/studentController";

// const router = express.Router();

// // Create a new student
// router.post("/add", StudentController.addNewStudentController);
// router.get("/allStudents", StudentController.getAllStudentsController);
// router.put("/edit/:id", StudentController.editStudentController);
// router.delete("/delete/:id", StudentController.deleteStudentController);

// export default router;

function socketRouter(io: any): Router {
  const router = Router();

  router.post("/add", async (req, res) => {
    try {
      await StudentController.addNewStudentController(req, res).then(() => {
        io.emit("new-student", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.get("/allStudents", async (req, res) => {
    try {
      await StudentController.getAllStudentsController(req, res).then(() => {
        io.emit("get-all-students", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.put("/edit/:id", async (req, res) => {
    try {
      await StudentController.editStudentController(req, res).then(() => {
        io.emit("edit-student", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    try {
      await StudentController.deleteStudentController(req, res).then(() => {
        io.emit("delete-student", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  return router;
}

export default socketRouter;
