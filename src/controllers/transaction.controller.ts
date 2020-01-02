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
  import {Transaction} from '../models';
  import {TransactionRepository} from '../repositories';
  
  export class TransactionController {
    constructor(
      @repository(TransactionRepository)
      public TransactionRepository : TransactionRepository
    ) {}
  
    @post('/transaction', {
      responses: {
        '200': {
          description: 'Transaction model instance',
          content: {'application/json': {schema: {'x-ts-type': Transaction}}},
        },
      },
    })
    async create(@requestBody() Transaction: Transaction): Promise<Transaction> {
      return await this.TransactionRepository.create(Transaction);
    }
  
    @get('/transaction/count', {
      responses: {
        '200': {
          description: 'Transaction model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.query.object('where', getWhereSchemaFor(Transaction)) where?: Where,
    ): Promise<Count> {
      return await this.TransactionRepository.count(where);
    }
  
    @get('/transaction', {
      responses: {
        '200': {
          description: 'Array of Transaction model instances',
          content: {
            'application/json': {
              schema: {type: 'array', items: {'x-ts-type': Transaction}},
            },
          },
        },
      },
    })
    async find(
      @param.query.object('filter', getFilterSchemaFor(Transaction)) filter?: Filter,
    ): Promise<Transaction[]> {
      return await this.TransactionRepository.find(filter);
    }
  
    @patch('/transaction', {
      responses: {
        '200': {
          description: 'Transaction PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody() Transaction: Transaction,
      @param.query.object('where', getWhereSchemaFor(Transaction)) where?: Where,
    ): Promise<Count> {
      return await this.TransactionRepository.updateAll(Transaction, where);
    }
  
    @get('/transaction/{id}', {
      responses: {
        '200': {
          description: 'Transaction model instance',
          content: {'application/json': {schema: {'x-ts-type': Transaction}}},
        },
      },
    })
    async findById(@param.path.string('id') id: string): Promise<Transaction> {
      return await this.TransactionRepository.findById(id);
    }
  
    @patch('/transaction/{id}', {
      responses: {
        '204': {
          description: 'Transaction PATCH success',
        },
      },
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody() Transaction: Transaction,
    ): Promise<void> {
      await this.TransactionRepository.updateById(id, Transaction);
    }
  
    @del('/transaction/{id}', {
      responses: {
        '204': {
          description: 'Transaction DELETE success',
        },
      },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.TransactionRepository.deleteById(id);
    }
  }
  