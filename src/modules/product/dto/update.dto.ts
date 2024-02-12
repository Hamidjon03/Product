import Joi from "joi";
import { CreateProductDto, createProductSchema } from "./create.dto";

export const updateProductSchema = createProductSchema.optional();

export type UpdateProductDto = Partial<CreateProductDto>;
