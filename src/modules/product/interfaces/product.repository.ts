import { IProductQueryDto } from "../dto/query.dto";
import { ProductEntity } from "../entity/product.entity";

export interface IProductRepository {
  getAll(query: IProductQueryDto): Promise<ProductEntity[]>;
  insert(entity: ProductEntity): Promise<ProductEntity>;
  getByName(name: string): Promise<ProductEntity | undefined>;
  getById(id: number): Promise<ProductEntity | undefined>;
  update(id: number, entity: ProductEntity): Promise<ProductEntity>;
  delete(id: number): Promise<ProductEntity>;
}
