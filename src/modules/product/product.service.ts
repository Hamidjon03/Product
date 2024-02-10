import { ResonseData } from "../../common/responseData";
import { CreateProductDto } from "./dto/create.dto";
import { ProductEntity } from "./entity/product.entity";
import { IProductRepository } from "./interfaces/product.repository";
import { IProductService } from "./interfaces/product.service";
import { ProductRepository } from "./product.repository";

export class ProductService implements IProductService {
  #productRepository: IProductRepository;

  constructor() {
    this.#productRepository = new ProductRepository();
  }
  async getByName(
    name: string
  ): Promise<ResonseData<ProductEntity | undefined>> {
    const product = await this.#productRepository.getByName(name);

    let resData: ResonseData<ProductEntity>;
    if (product) {
      resData = new ResonseData("success", 200, product);
    } else {
      resData = new ResonseData("not found", 404);
    }

    return resData;
  }

  async create(dto: CreateProductDto): Promise<ResonseData<ProductEntity>> {
    const newProduct: ProductEntity = new ProductEntity(dto);

    const createdProduct = await this.#productRepository.insert(newProduct);

    return new ResonseData<ProductEntity>("created", 201, createdProduct);
  }

  async getAll(): Promise<ResonseData<ProductEntity[]>> {
    const products = await this.#productRepository.getAll();

    return new ResonseData<ProductEntity[]>("success", 200, products);
  }
}
