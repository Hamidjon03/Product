import { ResponseData } from "../../common/responseData";
import { checkDto } from "../../lib/cheackDto";
import {updateUserSchema} from "./dto/update.dto"
import { CreateUserDto, createUserSchema } from "./dto/create.dto";
import { UpdateUserDto } from "./dto/update.dto";
import { UserLoginAlreadyExist } from "./exception/user.exception";
import { IUserService } from "./interfaces/user.service";
import { Request, Response } from "express";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }
  async getAll(req: Request, res: Response) {
    try {
      const resData = await this.userService.getAll();
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
      const dto: CreateUserDto = req.body;

      checkDto<CreateUserDto>(createUserSchema, dto);
      const getByLogin = await this.userService.getByLogin(dto.login);

      if (getByLogin.data) {
        throw new UserLoginAlreadyExist();
      }

      const resData = await this.userService.create(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResponseData(
        error.message,
        error.statusCode || 50,
        null,
        error
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const resData = await this.userService.getById(id);
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
      const dto: UpdateUserDto = req.body;
      checkDto<UpdateUserDto>(updateUserSchema, dto);
      const resData = await this.userService.update(id, dto);

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
      const resData = await this.userService.delete(id);

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
