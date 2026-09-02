import express from 'express';
import * as userController from "../controllers/users.controller.js";
import validateBody from '../middlewares/validate_body.js';

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/email/:email", userController.getUserByEmail);
router.get("/:id/pedidos", userController.getUserWithOrders);
router.get("/:id", userController.getUserById);
router.post("/", validateBody, userController.createUser);
router.post("/transaccion", validateBody, userController.registerUserWithOrder);
router.put("/:id", validateBody, userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;