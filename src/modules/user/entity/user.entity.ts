import { CreateUserDto } from "../dto/create.dto";

export class UserEntity {
  login: string;
  password: string;
  balance: number;
  constructor(dto: CreateUserDto) {
    this.login = dto.login;
    this.password = dto.password;
    this.balance = dto.balance;
  }
}