import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min().required(),
    lname: Joi.string().min().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
    mobile: Joi.number().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
