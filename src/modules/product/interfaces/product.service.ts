import { ResonseData } from "../../../common/responseData";
import { CreateProductDto } from "../dto/create.dto";
import { UpdateProductDto } from "../dto/update.dto";
import { ProductEntity } from "../entity/product.entity";

export interface IProductService {
  getAll(): Promise<ResonseData<ProductEntity[]>>;
  create(dto: CreateProductDto): Promise<ResonseData<ProductEntity>>;
  getByName(name: string): Promise<ResonseData<ProductEntity | undefined>>;
  getById(id: number): Promise<ResonseData<ProductEntity | undefined>>;
  update(id:number, dto: UpdateProductDto): Promise<ResonseData<ProductEntity | undefined>>;
  delete(id: number): Promise<ResonseData<ProductEntity | undefined>>;
}
