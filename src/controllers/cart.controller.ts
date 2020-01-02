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
  import {Cart, Response} from '../models';
  import {CartRepository} from '../repositories';
  
  export class CartController {
    constructor(
      @repository(CartRepository)
      public CartRepository : CartRepository
    ) {}
  
    @post('/cart', {
      responses: {
        '200': {
          description: 'Cart model instance',
          content: {'application/json': {schema: {'x-ts-type': Cart}}},
        },
      },
    })
    async create(@requestBody() Cart: Cart): Promise<Cart> {
      return await this.CartRepository.create(Cart);
    }
  
    @get('/cart/count', {
      responses: {
        '200': {
          description: 'Cart model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where,
    ): Promise<Count> {
      return await this.CartRepository.count(where);
    }
  
    @get('/cart', {
      responses: {
        '200': {
          description: 'Array of Cart model instances',
          content: {
            'application/json': {
              schema: {type: 'array', items: {'x-ts-type': Cart}},
            },
          },
        },
      },
    })
    async find(
      @param.query.object('filter', getFilterSchemaFor(Cart)) filter?: Filter,
    ): Promise<Cart[]> {
      return await this.CartRepository.find(filter);
    }
  
    @patch('/cart', {
      responses: {
        '200': {
          description: 'Cart PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody() Cart: Cart,
      @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where,
    ): Promise<Count> {
      return await this.CartRepository.updateAll(Cart, where);
    }
  
    @get('/cart/{id}', {
      responses: {
        '200': {
          description: 'Cart model instance',
          content: {'application/json': {schema: {'x-ts-type': Cart}}},
        },
      },
    })
    async findById(@param.path.string('id') id: string): Promise<Cart> {
      return await this.CartRepository.findById(id);
    }
  
    @patch('/cart/{id}', {
      responses: {
        '204': {
          description: 'Cart PATCH success',
        },
      },
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody() Cart: Cart,
    ): Promise<void> {
      await this.CartRepository.updateById(id, Cart);
    }
  
    @del('/cart/{id}', {
      responses: {
        '204': {
          description: 'Cart DELETE success',
        },
      },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.CartRepository.deleteById(id);
    }
  }
  