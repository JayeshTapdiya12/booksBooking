import { Schema, model } from "mongoose";
const wishlist = new Schema(
    {
        wishBy: {
            type: String,
            required: true,
        },

        book: [
            {
                authorname: String,
                bookname: String
            }]
    }

)

export default model('Wish', wishlist);