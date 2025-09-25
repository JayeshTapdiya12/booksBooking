import { getWishByUserID, addBookToWishlist, removeBookFromWishlist } from '../services/wishlist.service';
import HttpStatus from 'http-status-codes';

export const getUserWish = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const wish = await getWishByUserID(userId);
        res.status(HttpStatus.OK).json({ message: 'Wishlist rerieved', wishlist: wish });
    }
    catch (error) {
        console.error('Error adding book to wishlist:', error);
        next(error);
    }
}

export const addBookToUserWish = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const bookId = req.params._id;

        console.log('Authenticated User ID:', userId);
        console.log('Book ID to add:', bookId);

        const updatedWish = await addBookToWishlist(userId, bookId);

        res.status(HttpStatus.OK).json({ message: 'Book added to wishlist', wish: updatedWish });
    } catch (error) {
        console.error('Error adding book to cart:', error);
        next(error);
    }
};

export const removeBookFromUserWish = async (req, res, next) => {
    try {
        // Get authenticated user id from JWT
        const userId = req.body.userId;

        // Get book id from URL params
        const bookId = req.params._id;

        // Call service to remove book
        const updatedWish = await removeBookFromWishlist(userId, bookId);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: updatedWish.message,
            wishlist: updatedWish.wishlist,
        });
    } catch (error) {
        console.error("Error removing book from wishlist:", error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
            wishlist: null,
        });
    }
};