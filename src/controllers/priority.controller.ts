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
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Priority} from '../models';
import {PriorityRepository} from '../repositories';

export class PriorityController {
  constructor(
    @repository(PriorityRepository)
    public priorityRepository : PriorityRepository,
  ) {}

  @post('/priorities', {
    responses: {
      '200': {
        description: 'Priority model instance',
        content: {'application/json': {schema: {'x-ts-type': Priority}}},
      },
    },
  })
  async create(@requestBody() priority: Priority): Promise<Priority> {
    return await this.priorityRepository.create(priority);
  }

  @get('/priorities/count', {
    responses: {
      '200': {
        description: 'Priority model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Priority)) where?: Where,
  ): Promise<Count> {
    return await this.priorityRepository.count(where);
  }

  @get('/priorities', {
    responses: {
      '200': {
        description: 'Array of Priority model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Priority}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Priority)) filter?: Filter,
  ): Promise<Priority[]> {
    return await this.priorityRepository.find(filter);
  }

  @patch('/priorities', {
    responses: {
      '200': {
        description: 'Priority PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() priority: Priority,
    @param.query.object('where', getWhereSchemaFor(Priority)) where?: Where,
  ): Promise<Count> {
    return await this.priorityRepository.updateAll(priority, where);
  }

  @get('/priorities/{id}', {
    responses: {
      '200': {
        description: 'Priority model instance',
        content: {'application/json': {schema: {'x-ts-type': Priority}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Priority> {
    return await this.priorityRepository.findById(id);
  }

  @patch('/priorities/{id}', {
    responses: {
      '204': {
        description: 'Priority PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() priority: Priority,
  ): Promise<void> {
    await this.priorityRepository.updateById(id, priority);
  }

  @put('/priorities/{id}', {
    responses: {
      '204': {
        description: 'Priority PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() priority: Priority,
  ): Promise<void> {
    await this.priorityRepository.replaceById(id, priority);
  }

  @del('/priorities/{id}', {
    responses: {
      '204': {
        description: 'Priority DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.priorityRepository.deleteById(id);
  }
}
