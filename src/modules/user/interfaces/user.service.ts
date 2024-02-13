import { ResponseData } from "../../../common/responseData";
import { CreateUserDto } from "../dto/create.dto";
import { UpdateUserDto } from "../dto/update.dto";
import { UserEntity } from "../entity/user.entity";

export interface IUserService {
  getAll(): Promise<ResponseData<UserEntity[]>>;
  create(dto: CreateUserDto): Promise<ResponseData<UserEntity>>;
  getByLogin(login: string): Promise<ResponseData<UserEntity | undefined>>;
  getById(id: number): Promise<ResponseData<UserEntity>>;
  update(id: number, dto: UpdateUserDto): Promise<ResponseData<UserEntity>>;
  delete(id: number): Promise<ResponseData<UserEntity>>;
}
