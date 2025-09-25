import { Schema, model } from "mongoose";

const wishlistSchema = new Schema(
    {
        wishBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        book: [
            {
                bookId: {
                    type: Schema.Types.ObjectId,
                    ref: "Book",
                    required: true,
                },
                image: String,
                authorname: String,
                bookname: String,
            },
        ],
    },
    { timestamps: true }
);

export default model("Wish", wishlistSchema);
