import express from 'express';
import * as bookController from '../controllers/book.controller.js'
import { userAuth, roleMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


router.get('', userAuth(process.env.hidden_key), bookController.getAllbooks);
router.get('/:_id', userAuth(process.env.hidden_key), bookController.getBookbyID);
router.delete('/:_id', userAuth(process.env.hidden_key), isAdmin, bookController.deleteBookAdmin);


export default router;