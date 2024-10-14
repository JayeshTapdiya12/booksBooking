import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../services/user.service'

export const userAuth = (secretKey) => {
  return async (req, res, next) => {
    try {
      let bearerToken = req.header('Authorization');
      console.log("Bearer token before split----->", bearerToken);

      if (!bearerToken) {
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: "Authorization token is required"
        };
      }
      bearerToken = bearerToken.split(' ')[1];
      let userDetails = jwt.verify(bearerToken, secretKey);
      req.body.role = userDetails.role
      req.body.userId = userDetails.userId
      console.log('user details----------', userDetails.role);
      next();
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: "Invalid or expired token"
      });
    }
  }
}



export const roleMiddleware = async (req, res, next) => {
  const path = req.path;
  const email = req.body.email;


  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }


  if (path === ('/sign')) {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      if (existingUser.role === "admin") {
        return res.status(400).json({ message: 'Email is already registered as an admin' });
      }

      return res.status(400).json({ message: 'Email is already registered as a user' });
    }
    req.body.role = "user";


  } else if (path === ('/sign/admin')) {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      if (existingUser.role === "user") {
        return res.status(400).json({ message: 'Email is already registered as a user' });
      }

      return res.status(400).json({ message: 'Email is already registered as an admin' });
    }
    req.body.role = "admin";


  } else {
    return res.status(400).json({ message: 'Invalid registration' });
  }

  next();
};


export const isAdmin = (req, res, next) => {
  if (req.body.role !== "admin") {
    return res.status(HttpStatus.FORBIDDEN).json({
      code: HttpStatus.FORBIDDEN,
      message: 'Access denied. Admins only.'
    })
  }
  next();
};
