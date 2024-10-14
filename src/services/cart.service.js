import Book from '../models/books.model';
import Cart from '../models/cart.model';


export const getCart = async (body) => {
    const data = await Cart.findOne({ _id: body.userId })
    return data
}


export const addBook = async (bookID, body) => {
    const book = await Book.findOne({ _id: bookID });
    const isExistCart = await Cart.findOne({ cartBy: body.userId });

    if (isExistCart) {

        const existingBook = isExistCart.book.find(cartBook => cartBook.bookName === book.bookName);

        if (existingBook) {
            existingBook.quantity += 1;
        } else {
            // Add new book to the cart
            isExistCart.book.push({
                description: book.description,
                discountPrice: book.discountPrice,
                bookName: book.bookName,
                author: book.author,
                quantity: 1,
                price: book.price,
            });
        }
        await isExistCart.save();
    } else {

        const newCart = await Cart.create({
            cartBy: body.userId,
            book: [{
                description: book.description,
                discountPrice: book.discountPrice,
                bookName: book.bookName,
                author: book.author,
                quantity: 1,
                price: book.price,
            }]
        });
        await newCart.save();
    }
    return isExistCart
}

export const removeBook = async (bookID, body) => {
    const book = await Book.findOne({ _id: bookID });
    const isExistCart = await Cart.findOne({ cartBy: body.userId });

    if (isExistCart) {

        const bookIndex = isExistCart.book.findIndex(cartBook => cartBook.bookName === book.bookName);

        if (bookIndex !== -1) {
            const cartBook = isExistCart.book[bookIndex];

            if (cartBook.quantity > 1) {

                cartBook.quantity -= 1;
            } else {

                isExistCart.book.splice(bookIndex, 1);
            }

            await isExistCart.save();
        }
    }
}
