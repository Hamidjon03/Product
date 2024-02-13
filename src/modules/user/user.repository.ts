import { Postgres } from "../../lib/postgresDriver";
import { UserEntity } from "./entity/user.entity";
import { IUserRepository } from "./interfaces/user.repository";

export class UserRepository extends Postgres implements IUserRepository {
  async getByLogin(login: string): Promise<UserEntity | undefined> {
    return await this.fetch<UserEntity | undefined>(
      `select * from users where login = $1 `,
      login
    );
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.fetchAll<UserEntity>(`select * from users`);
  }

  async insert(entity: UserEntity): Promise<UserEntity> {
    return await this.fetch<UserEntity>(
      "insert into users(login, password, balance) values ($1, $2, $3) returning *",
      entity.login,
      entity.password,
      entity.balance
    );
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.fetch<UserEntity>(
      "select * from users where id = $1",
      id
    );
  }
  async delete(id: number): Promise<UserEntity> {
    return await this.fetch<UserEntity>(
      "delete from users where id = $1 returning *",
      id
    );
  }
  async update(id: number, entity: UserEntity): Promise<UserEntity> {
    return await this.fetch<UserEntity>(
      "update users set login=$1, password = $2, balance = $3 where id = $4 returning *",
      entity.login,
      entity.password,
      entity.balance,
      id
    );
  }
}
