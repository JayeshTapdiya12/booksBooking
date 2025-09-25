import Book from '../models/books.model';
import Cart from '../models/cart.model';

export const getCart = async (body) => {
    return await Cart.findOne({ cartBy: body.userId });
};

export const addBook = async (bookID, body) => {
    const book = await Book.findById(bookID);
    if (!book) throw new Error("Book not found");

    let isExistCart = await Cart.findOne({ cartBy: body.userId });

    if (!isExistCart) {
        isExistCart = new Cart({
            cartBy: body.userId,
            book: []
        });
    }

    const existingBook = isExistCart.book.find(
        cartBook => cartBook.bookName === book.bookName
    );

    if (existingBook) {
        existingBook.quantity += 1;
    } else {
        isExistCart.book.push({
            description: book.description,
            discountPrice: book.discountPrice,
            bookName: book.bookName,
            author: book.author,
            quantity: 1,
            price: book.price,
        });
    }

    // Recalculate total
    isExistCart.cartTotal = isExistCart.book.reduce((total, b) => {
        const effectivePrice = b.discountPrice ?? b.price;
        return total + (effectivePrice * b.quantity);
    }, 0);

    await isExistCart.save();
    return isExistCart;
};

export const removeBook = async (bookID, body) => {
    const book = await Book.findById(bookID);
    if (!book) throw new Error("Book not found");

    const isExistCart = await Cart.findOne({ cartBy: body.userId });
    if (!isExistCart) throw new Error("Cart not found");

    const bookIndex = isExistCart.book.findIndex(
        cartBook => cartBook.bookName === book.bookName
    );

    if (bookIndex !== -1) {
        const cartBook = isExistCart.book[bookIndex];
        if (cartBook.quantity > 1) {
            cartBook.quantity -= 1;
        } else {
            isExistCart.book.splice(bookIndex, 1);
        }

        // Recalculate total
        isExistCart.cartTotal = isExistCart.book.reduce((total, b) => {
            const effectivePrice = b.discountPrice ?? b.price;
            return total + (effectivePrice * b.quantity);
        }, 0);

        await isExistCart.save();
    }

    return isExistCart;
};

export const getBook = async (bookId, body) => {
    const userCart = await Cart.findOne({ cartBy: body.userId });
    if (!userCart) throw new Error("Cart not found");

    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not found");

    const bookInCart = userCart.book.find(
        cartBook => cartBook.bookName === book.bookName
    );

    return bookInCart || { message: "Book not found in the cart" };
};
