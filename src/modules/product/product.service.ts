import { ResponseData } from "../../common/responseData";
import { CreateProductDto } from "./dto/create.dto";
import { IProductQueryDto } from "./dto/query.dto";
import { UpdateProductDto } from "./dto/update.dto";
import { ProductEntity } from "./entity/product.entity";
import { ProductNotFoundException } from "./exception/product.exception";
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

  async getAll(
    query: IProductQueryDto
  ): Promise<ResponseData<ProductEntity[]>> {
    const products = await this.productRepository.getAll(query);
    console.log("products :", products);

    return new ResponseData<ProductEntity[]>("success", 200, products);
  }

  async getById(id: number): Promise<ResponseData<ProductEntity | undefined>> {
    const foundProduct = await this.productRepository.getById(id);

    if (!foundProduct) {
      throw new ProductNotFoundException();
    }

    return new ResponseData<ProductEntity>("success", 200, foundProduct);
  }

  async update(
    id: number,
    dto: UpdateProductDto
  ): Promise<ResponseData<ProductEntity>> {
    const foundProductByIdResponse: ResponseData<ProductEntity | undefined> =
      await this.getById(id);

    const foundProduct = foundProductByIdResponse.data as ProductEntity;

    const updatedProductData = Object.assign(foundProduct, dto);

    const updatedProduct = await this.productRepository.update(
      id,
      updatedProductData
    );

    return new ResponseData<ProductEntity>("updated", 200, updatedProduct);
  }

  async delete(id: number): Promise<ResponseData<ProductEntity>> {
    const product = await this.productRepository.delete(id);

    return new ResponseData<ProductEntity>("success", 200, product);
  }
}
