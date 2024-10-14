import Book from '../models/books.model'
export const getAll = async () => {
    const data = await Book.find();
    return data;
};

export const getbyID = async (value) => {
    const data = await Book.findOne({ _id: value });
    return data;
};

export const deleteBook = async (bookid) => {
    const book = await Book.findOneAndDelete({ _id: bookid });
    if (!book) {
        throw new Error('book not found');
    }
    return book;
};