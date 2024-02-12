import { ResponseData } from "../../../common/responseData";
import { CreateProductDto } from "../dto/create.dto";
import { IProductQueryDto } from "../dto/query.dto";
import { UpdateProductDto } from "../dto/update.dto";
import { ProductEntity } from "../entity/product.entity";

export interface IProductService {
  getAll(query: IProductQueryDto): Promise<ResponseData<ProductEntity[]>>;
  create(dto: CreateProductDto): Promise<ResponseData<ProductEntity>>;
  getByName(name: string): Promise<ResponseData<ProductEntity | undefined>>;
  getById(id: number): Promise<ResponseData<ProductEntity | undefined>>;
  update(
    id: number,
    dto: UpdateProductDto
  ): Promise<ResponseData<ProductEntity >>;
  delete(id: number): Promise<ResponseData<ProductEntity >>;
}
