import { Schema, model } from 'mongoose';

const cartModel = new Schema(
    {
        cartBy: {
            type: String,
            required: true,

        },
        book: [{
            description: {
                type: String,
            },
            discountPrice: {
                type: Number,
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
            image: {
                type: String
            }

        }],
        isPurchased: {
            type: Boolean,
            default: false
        },
        cartTotal: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

export default model('Cart', cartModel);
