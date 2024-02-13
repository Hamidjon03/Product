import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserDto, true>({
  login: Joi.string().required(),
  password: Joi.string().required().min(4),
  balance: Joi.number().min(0).required(),
});


export type CreateUserDto = {
  login: string;
  password: string;
  balance: number;
}
