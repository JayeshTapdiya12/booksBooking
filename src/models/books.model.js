import { Schema, model } from "mongoose";

const book = new Schema({
    description: {
        type: String,
    },
    discountPrice: {
        type: Number,
    },
    admin_user_ud: {
        type: String,
    },
    bookName: {
        type: String,
    },
    author: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
})

export default model('Book', book);
