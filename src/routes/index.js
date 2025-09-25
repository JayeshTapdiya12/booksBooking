import express from 'express';
const router = express.Router();

import userRoute from './user.route';


import cartRoute from './cart.route'
import bookRoute from './book.route';
import wishlistRoute from './wishlist.route'
import orderRoute from '../routes/order.route'

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);

  router.use('/books', bookRoute);
  router.use('/books/cart', cartRoute)

  router.use('/books/wishlist', wishlistRoute);
  router.use('/order', orderRoute);

  return router;
};

export default routes;
