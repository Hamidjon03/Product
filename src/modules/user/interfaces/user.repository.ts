import { UserEntity } from "../entity/user.entity";

export interface IUserRepository {
  getAll(): Promise<UserEntity[]>;
  insert(entity: UserEntity): Promise<UserEntity>;
  getByLogin(name: string): Promise<UserEntity | undefined>;
  getById(id: number): Promise<UserEntity>;
  update(id: number, entity: UserEntity): Promise<UserEntity>;
  delete(id: number): Promise<UserEntity>;
}
