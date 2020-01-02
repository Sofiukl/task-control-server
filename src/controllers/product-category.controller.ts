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
  import {ProductCategory, Response} from '../models';
  import {ProductCategoryRepository} from '../repositories';
  import { inject, Context } from '@loopback/context';
  
  export class ProductCategoryController {
    constructor(
      @repository(ProductCategoryRepository)
      public ProductCategoryRepository : ProductCategoryRepository
    ) {}
  
    @post('/productCategory', {
      responses: {
        '200': {
          description: 'ProductCategory model instance',
          content: {'application/json': {schema: {'x-ts-type': ProductCategory}}},
        },
      },
    })
    async create(@requestBody() ProductCategory: ProductCategory): Promise<ProductCategory> {
      return await this.ProductCategoryRepository.create(ProductCategory);
    }
  
    @get('/productCategory/count', {
      responses: {
        '200': {
          description: 'ProductCategory model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.query.object('where', getWhereSchemaFor(ProductCategory)) where?: Where,
    ): Promise<Count> {
      return await this.ProductCategoryRepository.count(where);
    }
  
    @get('/productCategory', {
      responses: {
        '200': {
          description: 'Array of ProductCategory model instances',
          content: {
            'application/json': {
              schema: {type: 'array', items: {'x-ts-type': ProductCategory}},
            },
          },
        },
      },
    })
    async find(
      @param.query.object('filter', getFilterSchemaFor(ProductCategory)) filter?: Filter,
    ): Promise<ProductCategory[]> {
      return await this.ProductCategoryRepository.find(filter);
    }
  
    @patch('/productCategory', {
      responses: {
        '200': {
          description: 'ProductCategory PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody() ProductCategory: ProductCategory,
      @param.query.object('where', getWhereSchemaFor(ProductCategory)) where?: Where,
    ): Promise<Count> {
      return await this.ProductCategoryRepository.updateAll(ProductCategory, where);
    }
  
    @get('/productCategory/{id}', {
      responses: {
        '200': {
          description: 'ProductCategory model instance',
          content: {'application/json': {schema: {'x-ts-type': ProductCategory}}},
        },
      },
    })
    async findById(@param.path.string('id') id: string): Promise<ProductCategory> {
      return await this.ProductCategoryRepository.findById(id);
    }
  
    @patch('/productCategory/{id}', {
      responses: {
        '204': {
          description: 'ProductCategory PATCH success',
        },
      },
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody() ProductCategory: ProductCategory,
    ): Promise<void> {
      await this.ProductCategoryRepository.updateById(id, ProductCategory);
    }
  
    @del('/productCategory/{id}', {
      responses: {
        '204': {
          description: 'ProductCategory DELETE success',
        },
      },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.ProductCategoryRepository.deleteById(id);
    }
  }
  