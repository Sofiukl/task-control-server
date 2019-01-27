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
import {Feed, Response} from '../models';
import {FeedRepository} from '../repositories';
import { FeedService } from '../services/feed.service';
import { inject } from '@loopback/context';

export class FeedController {
  constructor(
    @repository(FeedRepository)
    public feedRepository : FeedRepository,
    @inject('FeedService') private feedService: FeedService
  ) {}

  @post('/feeds', {
    responses: {
      '200': {
        description: 'Feed model instance',
        content: {'application/json': {schema: {'x-ts-type': Feed}}},
      },
    },
  })
  async create(@requestBody() feed: Feed): Promise<Feed> {
    return await this.feedRepository.create(feed);
  }

  @get('/feeds/count', {
    responses: {
      '200': {
        description: 'Feed model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Feed)) where?: Where,
  ): Promise<Count> {
    return await this.feedRepository.count(where);
  }

  @get('/feeds', {
    responses: {
      '200': {
        description: 'Array of Feed model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Feed}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Feed)) filter?: Filter,
  ): Promise<Response<Feed>> {
    // return await this.feedRepository.find(filter);
    return await this.feedService.getFeedList(filter);
  }

  @patch('/feeds', {
    responses: {
      '200': {
        description: 'Feed PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() feed: Feed,
    @param.query.object('where', getWhereSchemaFor(Feed)) where?: Where,
  ): Promise<Count> {
    return await this.feedRepository.updateAll(feed, where);
  }

  @get('/feeds/{id}', {
    responses: {
      '200': {
        description: 'Feed model instance',
        content: {'application/json': {schema: {'x-ts-type': Feed}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Response<Feed>> {
    return await this.feedService.getFeedDetails(id);
    //return await this.feedRepository.findById(id);
  }

  @patch('/feeds/{id}', {
    responses: {
      '204': {
        description: 'Feed PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() feed: Feed,
  ): Promise<void> {
    await this.feedRepository.updateById(id, feed);
  }

  @put('/feeds/{id}', {
    responses: {
      '204': {
        description: 'Feed PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() feed: Feed,
  ): Promise<void> {
    await this.feedRepository.replaceById(id, feed);
  }

  @del('/feeds/{id}', {
    responses: {
      '204': {
        description: 'Feed DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.feedRepository.deleteById(id);
  }
}
