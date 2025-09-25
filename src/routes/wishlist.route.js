import express from 'express';
import * as wishController from '../controllers/wishlist.controller.js';
import { userAuth } from "../middlewares/auth.middleware.js";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/get', userAuth(process.env.hidden_key), wishController.getUserWish);
router.post('/add/:_id', userAuth(process.env.hidden_key), wishController.addBookToUserWish);
router.post('/remove/:_id', userAuth(process.env.hidden_key), wishController.removeBookFromUserWish);

export default router;