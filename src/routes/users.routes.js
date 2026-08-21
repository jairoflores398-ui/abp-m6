import express from 'express';
import * as userController from "../controllers/users.controller.js";
import validateBody from '../middlewares/validate_body.js';

const router = express.Router();

//GET ALL USERS
router.get("/", userController.getAllUsers);

//GET USER BY ID
router.get("/:id", userController.getUserById);

//GET USER BY EMAIL
router.get("/email/:email", userController.getUserByEmail);

//ADD USER -> POST

router.post("/", validateBody, userController.createUser);

//UPDATE USER -> PUT
router.put("/:id", validateBody, userController.updateUser);

//DELETE USER -> DELETE

router.delete("/:id", userController.deleteUser);

export default router;