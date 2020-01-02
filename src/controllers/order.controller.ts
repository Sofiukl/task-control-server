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
  import {Order} from '../models';
  import {OrderRepository} from '../repositories';
  
  export class OrderController {
    constructor(
      @repository(OrderRepository)
      public OrderRepository : OrderRepository
    ) {}
  
    @post('/order', {
      responses: {
        '200': {
          description: 'Order model instance',
          content: {'application/json': {schema: {'x-ts-type': Order}}},
        },
      },
    })
    async create(@requestBody() Order: Order): Promise<Order> {
      return await this.OrderRepository.create(Order);
    }
  
    @get('/order/count', {
      responses: {
        '200': {
          description: 'Order model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.query.object('where', getWhereSchemaFor(Order)) where?: Where,
    ): Promise<Count> {
      return await this.OrderRepository.count(where);
    }
  
    @get('/order', {
      responses: {
        '200': {
          description: 'Array of Order model instances',
          content: {
            'application/json': {
              schema: {type: 'array', items: {'x-ts-type': Order}},
            },
          },
        },
      },
    })
    async find(
      @param.query.object('filter', getFilterSchemaFor(Order)) filter?: Filter,
    ): Promise<Order[]> {
      return await this.OrderRepository.find(filter);
    }
  
    @patch('/order', {
      responses: {
        '200': {
          description: 'Order PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody() Order: Order,
      @param.query.object('where', getWhereSchemaFor(Order)) where?: Where,
    ): Promise<Count> {
      return await this.OrderRepository.updateAll(Order, where);
    }
  
    @get('/order/{id}', {
      responses: {
        '200': {
          description: 'Order model instance',
          content: {'application/json': {schema: {'x-ts-type': Order}}},
        },
      },
    })
    async findById(@param.path.string('id') id: string): Promise<Order> {
      return await this.OrderRepository.findById(id);
    }
  
    @patch('/order/{id}', {
      responses: {
        '204': {
          description: 'Order PATCH success',
        },
      },
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody() Order: Order,
    ): Promise<void> {
      await this.OrderRepository.updateById(id, Order);
    }
  
    @del('/order/{id}', {
      responses: {
        '204': {
          description: 'Order DELETE success',
        },
      },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.OrderRepository.deleteById(id);
    }
  }
  