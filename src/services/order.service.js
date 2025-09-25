import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Book from "../models/books.model.js";
import { v4 as uuidv4 } from "uuid";

// ✅ Place a new order (move items from Cart → Order)
export const placeOrder = async (userId) => {
    // find cart of user
    const cart = await Cart.findOne({ cartBy: userId });
    if (!cart || cart.book.length === 0) {
        throw new Error("Cart is empty");
    }

    // Prepare order books
    const orderBooks = cart.book.map((item) => {
        const effectivePrice = item.discountPrice ?? item.price;
        return {
            bookId: item._id,
            bookName: item.bookName,
            author: item.author,
            quantity: item.quantity,
            price: item.price,
            discountPrice: item.discountPrice,
            totalPrice: effectivePrice * item.quantity,
            image: item.image || "",
        };
    });

    // Calculate total
    const orderTotal = orderBooks.reduce((total, item) => total + item.totalPrice, 0);

    // Create order
    const newOrder = new Order({
        orderBy: userId,
        books: orderBooks,
        orderTotal,
        orderId: uuidv4(),
        isPaid: false,
        isDelivered: false,
    });

    await newOrder.save();

    // reduce stock in Book collection
    for (const item of cart.book) {
        const bookDoc = await Book.findById(item._id);
        if (bookDoc) {
            bookDoc.quantity = Math.max(0, bookDoc.quantity - item.quantity);
            await bookDoc.save();
        }
    }

    // clear the cart
    await Cart.deleteOne({ _id: cart._id });

    return newOrder;
};

// ✅ Get all orders by user
export const getOrdersByUser = async (userId) => {
    const orders = await Order.find({ orderBy: userId }).populate("books.bookId");
    if (!orders || orders.length === 0) {
        return [];
    }
    return orders;
};
