import express from "express"
import authMiddleware from "../middleware/authMiddleware";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/taskController";
const router  = express.Router();

router.use(authMiddleware);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;