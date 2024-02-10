import { ResonseData } from "../../../common/responseData";
import { CreateProductDto } from "../dto/create.dto";
import { ProductEntity } from "../entity/product.entity";

export interface IProductService {
  getAll(): Promise<ResonseData<ProductEntity[]>>;
  create(dto: CreateProductDto): Promise<ResonseData<ProductEntity>>;
  getByName(name: string): Promise<ResonseData<ProductEntity | undefined>>;
}
