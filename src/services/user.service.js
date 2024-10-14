import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';





//create new user
export const sign = async (body) => {

  const exist = await User.findOne({ email: body.email });

  if (exist) {
    throw new Error("User Already Exist");
  } else {
    // using bycrypt
    const saltRound = 10;
    const hash_password = await bcrypt.hash(body.password, saltRound);
    body.password = hash_password;
    const data = await User.create(body);
    return data;
  }

};


export const login = async (body) => {
  const data = await User.findOne({ email: body.email });

  if (data == null) {
    throw new Error("Invalid Emial");
  } else {
    const isPasswordValid = await bcrypt.compare(body.password, data.password);
    if (isPasswordValid) {
      const token = jwt.sign({ role: data.role, userId: data._id }, process.env.hidden_key);
      return token;
    } else {
      throw new Error("Invalid Password");
    }
  }
}


export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
}


