import { Product, Response } from "../models";
import { ProductRepository, TaskRepository } from "../repositories";
import { repository, Filter, FilterBuilder } from "@loopback/repository";


export class ProductService {

    constructor(
        @repository(ProductRepository)
        public ProductRepository: ProductRepository,
        @repository(TaskRepository)
        public taskRepository: TaskRepository
    ) {}
    
    async getProductList(filter: Filter<Product> | undefined) : Promise<Response<Product>> {
        const ProductList: Array<Product> = await this.ProductRepository.find(filter);
        const response = new Response<Product>();
        response.setError(false);
        response.setResult(ProductList);
        return response;
    }

    async getProductDetails(id: string) : Promise<Response<Product>> {
        const Product: Product = await this.ProductRepository.findById(id);
        const response = new Response<Product>();
        response.setError(false);
        response.setResult([Product]);
        return response;
    }
}


