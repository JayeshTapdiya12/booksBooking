import * as cartService from '../services/cart.service';
import HttpStatus from 'http-status-codes'



export const getCart = async (req, res, next) => {
    try {
        const data = await cartService.getCart(req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: "your cart"
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
}

export const addBook = async (req, res, next) => {
    try {
        const data = await cartService.addBook(req.params, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: "Book is Added in the cart"
        })

    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
}


export const removeBook = async (req, res, next) => {
    try {
        const data = await cartService.removeBook(req.params, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: "Book is removed in the cart"
        })

    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
}