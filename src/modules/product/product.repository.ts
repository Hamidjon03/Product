import { Postgres } from "../../lib/postgresDriver";
import { ProductEntity } from "./entity/product.entity";
import { IProductRepository } from "./interfaces/product.repository";

export class ProductRepository extends Postgres implements IProductRepository {
  async getByName(name: string): Promise<ProductEntity | undefined> {
    return await this.fetch<ProductEntity | undefined>(
      "select * from products where name = $1",
      name
    );
  }
  async getAll(): Promise<ProductEntity[]> {
    return await this.fetchAll<ProductEntity>("select * from products");
  }

  async insert(entity: ProductEntity): Promise<ProductEntity> {
    return await this.fetch<ProductEntity>(
      "insert into products(name, price, count) values ($1, $2, $3) returning *",
      entity.name,
      entity.price,
      entity.count
    );
  }
}
