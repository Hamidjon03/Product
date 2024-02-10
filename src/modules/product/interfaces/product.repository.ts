import { ProductEntity } from "../entity/product.entity";

export interface IProductRepository {
  getAll(): Promise<ProductEntity[]>;
  insert(entity: ProductEntity): Promise<ProductEntity>;
  getByName(name: string): Promise<ProductEntity | undefined>;
}
