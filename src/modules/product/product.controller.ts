import { ResponseData } from "../../common/responseData";
import { Error } from "../../common/types/types";
import { checkDto } from "../../lib/cheackDto";
import { CreateProductDto, createProductSchema } from "./dto/create.dto";
import { IProductQueryDto, productQuerySchema } from "./dto/query.dto";
import { UpdateProductDto, updateProductSchema } from "./dto/update.dto";
import { ProductNameAlreadyExist } from "./exception/product.exception";
import { IProductService } from "./interfaces/product.service";
import { Request, Response } from "express";

export class ProductController {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  async getAll(req: Request, res: Response) {
    try {
      const query: IProductQueryDto = req.query;
      // console.log("query :", query);

      checkDto<IProductQueryDto>(productQuerySchema, query);

      const resData = await this.productService.getAll(query);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResponseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const dto: CreateProductDto = req.body;

      checkDto<CreateProductDto>(createProductSchema, dto);

      const getByName = await this.productService.getByName(dto.name);

      if (getByName.data) {
        throw new ProductNameAlreadyExist();
      }

      const resData = await this.productService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResponseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const resData = await this.productService.getById(id);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResponseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const resData = await this.productService.delete(id);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResponseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const dto: UpdateProductDto = req.body;
      checkDto<UpdateProductDto>(updateProductSchema, dto);
      const resData = await this.productService.update(id, dto);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResponseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }
}
