import { getWishbyUserID, addBookToWishlist, removeBookFromWishlist } from '../services/wishlist.service';
import HttpStatus from 'http-status-codes';

export const getUserWish = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const wish = await getWishbyUserID(userId);
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
        const bookId = req.params;

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
        const userId = req.body.userId;
        const bookId = req.params;

        console.log('Authenticated User ID:', userId);
        console.log('Book ID to remove:', bookId);

        const updatedWish = await removeBookFromWishlist(userId, bookId);

        res.status(HttpStatus.OK).json({ message: 'Book removed from wishlist', wish: updatedWish });
    } catch (error) {
        console.error('Error removing book from cart:', error);
        next(error);
    }
};