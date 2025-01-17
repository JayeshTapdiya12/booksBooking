import express from 'express';
const router = express.Router();

import userRoute from './user.route';



import bookRoute from './book.route';
import wishlistRoute from './wishlist.route'
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);

  router.use('/books', bookRoute);

  router.use('/books/wishlist', wishlistRoute)
  return router;
};

export default routes;
