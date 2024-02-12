import { ResponseData } from "../../common/responseData";
import { CreateProductDto } from "./dto/create.dto";
import { IProductQueryDto } from "./dto/query.dto";
import { ProductEntity } from "./entity/product.entity";
import { IProductRepository } from "./interfaces/product.repository";
import { IProductService } from "./interfaces/product.service";
import { ProductRepository } from "./product.repository";

export class ProductService implements IProductService {
  private productRepository: IProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getByName(
    name: string
  ): Promise<ResponseData<ProductEntity | undefined>> {
    const product = await this.productRepository.getByName(name);

    let resData: ResponseData<ProductEntity>;
    if (product) {
      resData = new ResponseData("success", 200, product);
    } else {
      resData = new ResponseData("not found", 404);
    }

    return resData;
  }

  async create(dto: CreateProductDto): Promise<ResponseData<ProductEntity>> {
    const newProduct: ProductEntity = new ProductEntity(dto);

    const createdProduct = await this.productRepository.insert(newProduct);

    return new ResponseData<ProductEntity>("created", 201, createdProduct);
  }

  async getAll(query: IProductQueryDto
  ): Promise<ResponseData<ProductEntity[]>> {
    const products = await this.productRepository.getAll(query);
    console.log("products :", products);

    return new ResponseData<ProductEntity[]>("success", 200, products);
  }

  async getById(id: number): Promise<ResponseData<ProductEntity>> {
    const product = await this.productRepository.getById(id);

    let resData: ResponseData<ProductEntity>;
    if (product) {
      resData = new ResponseData("success", 200, product);
    } else {
      resData = new ResponseData("not found", 404);
    }

    return resData;
  }

  async update(
    id: number,
    dto: ProductEntity
  ): Promise<ResponseData<ProductEntity>> {
    const product = await this.productRepository.update(id, dto);

    return new ResponseData<ProductEntity>("success", 200, product);
  }

  async delete(id: number): Promise<ResponseData<ProductEntity>> {
    const product = await this.productRepository.delete(id);

    return new ResponseData<ProductEntity>("success", 200, product);
  }
}
