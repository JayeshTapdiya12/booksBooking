import * as cartService from '../services/cart.service';
import HttpStatus from 'http-status-codes';

export const getCart = async (req, res) => {
    try {
        const data = await cartService.getCart(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data,
            message: "Your cart"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message || "Failed to fetch cart"
        });
    }
};

export const getBook = async (req, res) => {
    try {
        const data = await cartService.getBook(req.params._id, req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data,
            message: "Book in your cart"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message || "Failed to fetch book"
        });
    }
};

export const addBook = async (req, res) => {
    try {
        const data = await cartService.addBook(req.params._id, req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data,
            message: "Book is added in the cart"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message || "Failed to add book"
        });
    }
};

export const removeBook = async (req, res) => {
    try {
        const data = await cartService.removeBook(req.params._id, req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data,
            message: "Book is removed from the cart"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message || "Failed to remove book"
        });
    }
};
