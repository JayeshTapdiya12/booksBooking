import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth, } from '../middlewares/auth.middleware';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


router.get('/getcart', userAuth(process.env.hidden_key), cartController.getCart)
router.get('/get/:_id', userAuth(process.env.hidden_key), cartController.getBook)
router.post('/add/:_id', userAuth(process.env.hidden_key), cartController.addBook)
router.delete('/remove/:_id', userAuth(process.env.hidden_key), cartController.removeBook)


export default router;
