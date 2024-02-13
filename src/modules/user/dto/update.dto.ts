import Joi from "joi";
import { CreateUserDto, createUserSchema } from "./create.dto";

export const updateUserSchema = createUserSchema.optional();

export type UpdateUserDto = Partial<CreateUserDto>;
