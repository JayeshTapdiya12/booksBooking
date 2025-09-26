import * as orderService from '../services/order.service.js';
import HttpStatus from 'http-status-codes';

export const getAllOrder = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const orders = await orderService.getOrdersByUser(userId);

        res.status(HttpStatus.OK).json({
            message: 'Orders retrieved successfully',
            orders
        });
    } catch (error) {
        console.error('Error getting orders:', error);
        next(error);
    }
};

export const addOrder = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const order = await orderService.placeOrder(userId);

        res.status(HttpStatus.CREATED).json({
            message: 'Order placed successfully',
            order
        });
    } catch (error) {
        console.error('Error placing order:', error);
        next(error);
    }
};
