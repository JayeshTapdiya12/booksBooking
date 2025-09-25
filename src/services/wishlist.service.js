import Wish from "../models/wishlist.model.js";
import Book from "../models/books.model.js";


export const getWishByUserID = async (userID) => {
    return await Wish.findOne({ wishBy: userID });
};


export const addBookToWishlist = async (userID, bookID) => {
    const book = await Book.findById(bookID);
    if (!book) throw new Error("Book not found in database");

    let wish = await getWishByUserID(userID);
    if (!wish) {
        wish = new Wish({
            wishBy: userID,
            book: []
        });
    }

    const existingBook = wish.book.find((b) => b.bookId.equals(book._id));
    if (existingBook) {
        return { message: "Book already in wishlist", wishlist: wish };
    }

    wish.book.push({
        bookId: book._id,
        bookname: book.bookName,
        authorname: book.author,
        image: book.image || ""
    });

    await wish.save();
    return { message: "Book added to wishlist", wishlist: wish };
};


export const removeBookFromWishlist = async (userID, bookID) => {
    const wish = await Wish.findOne({ wishBy: userID });
    if (!wish) throw new Error("Wishlist not found");

    const existingBook = wish.book.find((b) => b.bookId.equals(bookID));
    if (!existingBook) {
        return { message: "Book not found in wishlist", wishlist: wish };
    }

    wish.book = wish.book.filter((b) => !b.bookId.equals(bookID));

    if (wish.book.length === 0) {
        await Wish.deleteOne({ _id: wish._id });
        return { message: "Book removed. Wishlist is now empty.", wishlist: null };
    }

    await wish.save();
    return { message: "Book removed from wishlist", wishlist: wish };
};