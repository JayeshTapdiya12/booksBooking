import { Schema, model } from "mongoose";

const orderSchema = new Schema(
    {
        orderBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        books: [
            {
                bookId: {
                    type: Schema.Types.ObjectId,
                    ref: "Book",
                    required: true,
                },
                bookName: String,
                author: String,
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: Number,
                discountPrice: Number,
                totalPrice: Number,
            },
        ],
        orderTotal: {
            type: Number,
            required: true,
        },
        orderId: {
            type: String,
            default: () => require("uuid").v4(),
            unique: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default model("Order", orderSchema);
