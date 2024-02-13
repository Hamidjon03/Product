import { Postgres } from "../../lib/postgresDriver";
import { IProductQueryDto } from "./dto/query.dto";
import { ProductEntity } from "./entity/product.entity";
import { IProductRepository } from "./interfaces/product.repository";

export class ProductRepository extends Postgres implements IProductRepository {
  async getByName(name: string): Promise<ProductEntity | undefined> {
    return await this.fetch<ProductEntity | undefined>(
      "select * from products where name = $1",
      name
    );
  }
  async getAll(query: IProductQueryDto): Promise<ProductEntity[]> {

    const searchQuery = query.name ? `%${query.name}%` : "%%";
    
    return await this.fetchAll<ProductEntity>(
      `select * from products where name ILIKE $1`,
      searchQuery
    );
  }

  async insert(entity: ProductEntity): Promise<ProductEntity> {
    return await this.fetch<ProductEntity>(
      "insert into products(name, price, count) values ($1, $2, $3) returning *",
      entity.name,
      entity.price,
      entity.count
    );
  }
  async getById(id: number): Promise<ProductEntity> {
    return await this.fetch<ProductEntity>(
      "select * from products where id = $1",
      id
    );
  }
  async delete(id: number): Promise<ProductEntity> {
    return await this.fetch<ProductEntity>(
      "delete from products where id = $1 returning *",
      id
    );
  }
  async update(
    id: number,
    entity: ProductEntity
  ): Promise<ProductEntity> {
    return await this.fetch<ProductEntity>(
      "update products set name=$1, price = $2, count = $3 where id = $4 returning *",
      entity.name,
      entity.price,
      entity.count,
      id
    );
  }
}
