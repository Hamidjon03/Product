import { ResponseData } from "../../common/responseData";
import { CreateUserDto } from "./dto/create.dto";
import { UpdateUserDto } from "./dto/update.dto";
import { UserEntity } from "./entity/user.entity";
import { UserNotFoundException } from "./exception/user.exception";
import { IUserRepository } from "./interfaces/user.repository";
import { IUserService } from "./interfaces/user.service";
import { UserRepository } from "./user.repository";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll(): Promise<ResponseData<UserEntity[]>> {
    const users = await this.userRepository.getAll();
    return new ResponseData<UserEntity[]>("success", 200, users);
  }

  async getByLogin(
    login: string
  ): Promise<ResponseData<UserEntity | undefined>> {
    const user = await this.userRepository.getByLogin(login);
    let resData: ResponseData<UserEntity>;
    if (user) {
      resData = new ResponseData("success", 200, user);
    } else {
      resData = new ResponseData("not found", 404);
    }

    return resData;
  }

  async getById(id: number) {
    const foundUser = await this.userRepository.getById(id);

    if (!foundUser) {
      throw new UserNotFoundException();
    }
    return new ResponseData<UserEntity>("success", 200, foundUser);
  }
  async create(dto: CreateUserDto): Promise<ResponseData<UserEntity>> {
    const newUser: UserEntity = new UserEntity(dto);

    const createdUser = await this.userRepository.insert(newUser);

    return new ResponseData<UserEntity>("created", 201, createdUser);
  }

  async update(
    id: number,
    dto: UpdateUserDto
  ): Promise<ResponseData<UserEntity>> {
    const foundUserByIdResponse: ResponseData<UserEntity | undefined> =
      await this.getById(id);

    const userFound = foundUserByIdResponse.data as UserEntity;

    const updatedUserData = Object.assign(userFound, dto);

    const updatedUser = await this.userRepository.update(id, updatedUserData);

    return new ResponseData<UserEntity>("updated", 200, updatedUser);
  }

  async delete(id: number): Promise<ResponseData<UserEntity>> {
    const user = await this.userRepository.delete(id);

    return new ResponseData<UserEntity>("success", 200, user);
  }
}
