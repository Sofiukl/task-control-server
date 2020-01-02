import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
  } from '@loopback/repository';
  import {
    post,
    param,
    get,
    getFilterSchemaFor,
    getWhereSchemaFor,
    patch,
    del,
    requestBody,
  } from '@loopback/rest';
  import {Product, Response} from '../models';
  import {ProductRepository} from '../repositories';
  import { ProductService } from '../services/Product.service';
  import { inject, Context } from '@loopback/context';
  
  export class ProductController {
    constructor(
      @repository(ProductRepository)
      public ProductRepository : ProductRepository,
      @inject('ProductService') private ProductService: ProductService
    ) {}
  
    @post('/Products', {
      responses: {
        '200': {
          description: 'Product model instance',
          content: {'application/json': {schema: {'x-ts-type': Product}}},
        },
      },
    })
    async create(@requestBody() Product: Product): Promise<Product> {
      return await this.ProductRepository.create(Product);
    }
  
    @get('/Products/count', {
      responses: {
        '200': {
          description: 'Product model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.query.object('where', getWhereSchemaFor(Product)) where?: Where,
    ): Promise<Count> {
      return await this.ProductRepository.count(where);
    }
  
    @get('/Products', {
      responses: {
        '200': {
          description: 'Array of Product model instances',
          content: {
            'application/json': {
              schema: {type: 'array', items: {'x-ts-type': Product}},
            },
          },
        },
      },
    })
    async find(
      @param.query.object('filter', getFilterSchemaFor(Product)) filter?: Filter,
    ): Promise<Response<Product>> {
      //return await this.ProductRepository.find(filter);
      return await this.ProductService.getProductList(filter);
  
    }
  
    @patch('/Products', {
      responses: {
        '200': {
          description: 'Product PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody() Product: Product,
      @param.query.object('where', getWhereSchemaFor(Product)) where?: Where,
    ): Promise<Count> {
      return await this.ProductRepository.updateAll(Product, where);
    }
  
    @get('/Products/{id}', {
      responses: {
        '200': {
          description: 'Product model instance',
          content: {'application/json': {schema: {'x-ts-type': Product}}},
        },
      },
    })
    async findById(@param.path.string('id') id: string): Promise<Response<Product>> {
      //return await this.ProductRepository.findById(id);
      return await this.ProductService.getProductDetails(id);
    }
  
    @patch('/Products/{id}', {
      responses: {
        '204': {
          description: 'Product PATCH success',
        },
      },
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody() Product: Product,
    ): Promise<void> {
      await this.ProductRepository.updateById(id, Product);
    }
  
    @del('/Products/{id}', {
      responses: {
        '204': {
          description: 'Product DELETE success',
        },
      },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.ProductRepository.deleteById(id);
    }
  }
  