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
  import {User, Response} from '../models';
  import {UserRepository} from '../repositories';
  import { inject, Context } from '@loopback/context';
  
  export class UserController {
    constructor(
      @repository(UserRepository)
      public UserRepository : UserRepository
    ) {}
  
    @post('/user', {
      responses: {
        '200': {
          description: 'User model instance',
          content: {'application/json': {schema: {'x-ts-type': User}}},
        },
      },
    })
    async create(@requestBody() User: User): Promise<User> {
      return await this.UserRepository.create(User);
    }
  
    @get('/user/count', {
      responses: {
        '200': {
          description: 'User model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
    ): Promise<Count> {
      return await this.UserRepository.count(where);
    }
  
    @get('/user', {
      responses: {
        '200': {
          description: 'Array of User model instances',
          content: {
            'application/json': {
              schema: {type: 'array', items: {'x-ts-type': User}},
            },
          },
        },
      },
    })
    async find(
      @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
    ): Promise<User[]> {
      return await this.UserRepository.find(filter);
    }
  
    @patch('/user', {
      responses: {
        '200': {
          description: 'User PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody() User: User,
      @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
    ): Promise<Count> {
      return await this.UserRepository.updateAll(User, where);
    }
  
    @get('/user/{id}', {
      responses: {
        '200': {
          description: 'User model instance',
          content: {'application/json': {schema: {'x-ts-type': User}}},
        },
      },
    })
    async findById(@param.path.string('id') id: string): Promise<User> {
      return await this.UserRepository.findById(id);
    }
  
    @patch('/user/{id}', {
      responses: {
        '204': {
          description: 'User PATCH success',
        },
      },
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody() User: User,
    ): Promise<void> {
      await this.UserRepository.updateById(id, User);
    }
  
    @del('/user/{id}', {
      responses: {
        '204': {
          description: 'User DELETE success',
        },
      },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.UserRepository.deleteById(id);
    }
  }
  