import * as bookService from '../services/book.service'
import HttpStatus from "http-status-codes";

export const getAllbooks = async (req, res, next) => {
    try {
        const getAllNotes = await bookService.getAll(req.body.createdBy);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            note: getAllNotes,
            message: "All books retrieved"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
};

export const getBookbyID = async (req, res, next) => {
    try {
        const retrieveNote = await bookService.getbyID(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            note: retrieveNote,
            message: "Note retrieved successfully"
        });
    }
    catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
};

export const deleteBookAdmin = async (req, res, next) => {
    try {
        const deleteNote = await bookService.deleteBook(req.params._id);
        console.log(deleteNote)
        if (!deleteNote) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: 'Book not found'
            });
        }

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Book deleted successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};