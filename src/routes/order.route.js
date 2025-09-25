import express from 'express';
import * as orderController from '../controllers/order.controller.js';
import { userAuth } from "../middlewares/auth.middleware.js";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/allorder', userAuth(process.env.hidden_key), orderController.getAllOrder);
router.post('/addorder', userAuth(process.env.hidden_key), orderController.addOrder);

export default router;