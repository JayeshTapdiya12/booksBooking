import { Schema, model } from "mongoose";

const orderSchema = new Schema(
    {
        orderBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true, // user who placed the order
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
                price: Number, // price per unit
                discountPrice: Number,
                totalPrice: Number, // quantity * price or discounted price
            },
        ],
        orderTotal: {
            type: Number,
            required: true,
        },
        orderId: {
            type: String,
            default: () => require("uuid").v4(), // generate unique UUID
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
