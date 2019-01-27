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
import {Folder, Response} from '../models';
import {FolderRepository} from '../repositories';
import { FolderService } from '../services/folder.service';
import { inject, Context } from '@loopback/context';

export class FolderController {
  constructor(
    @repository(FolderRepository)
    public folderRepository : FolderRepository,
    @inject('FolderService') private folderService: FolderService
  ) {}

  @post('/folders', {
    responses: {
      '200': {
        description: 'Folder model instance',
        content: {'application/json': {schema: {'x-ts-type': Folder}}},
      },
    },
  })
  async create(@requestBody() folder: Folder): Promise<Folder> {
    return await this.folderRepository.create(folder);
  }

  @get('/folders/count', {
    responses: {
      '200': {
        description: 'Folder model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Folder)) where?: Where,
  ): Promise<Count> {
    return await this.folderRepository.count(where);
  }

  @get('/folders', {
    responses: {
      '200': {
        description: 'Array of Folder model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Folder}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Folder)) filter?: Filter,
  ): Promise<Response<Folder>> {
    //return await this.folderRepository.find(filter);
    return await this.folderService.getFolderList(filter);

  }

  @patch('/folders', {
    responses: {
      '200': {
        description: 'Folder PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() folder: Folder,
    @param.query.object('where', getWhereSchemaFor(Folder)) where?: Where,
  ): Promise<Count> {
    return await this.folderRepository.updateAll(folder, where);
  }

  @get('/folders/{id}', {
    responses: {
      '200': {
        description: 'Folder model instance',
        content: {'application/json': {schema: {'x-ts-type': Folder}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Response<Folder>> {
    //return await this.folderRepository.findById(id);
    return await this.folderService.getFolderDetails(id);
  }

  @patch('/folders/{id}', {
    responses: {
      '204': {
        description: 'Folder PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() folder: Folder,
  ): Promise<void> {
    await this.folderRepository.updateById(id, folder);
  }

  @del('/folders/{id}', {
    responses: {
      '204': {
        description: 'Folder DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.folderRepository.deleteById(id);
  }
}
