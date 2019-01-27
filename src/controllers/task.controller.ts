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
import {Task, Priority, Folder, Response} from '../models';
import {TaskRepository, PriorityRepository, FolderRepository} from '../repositories';
import { inject } from '@loopback/core';
import { TaskService } from '../services';

export class TaskController {
  constructor(
    @repository(TaskRepository)
    public taskRepository : TaskRepository,
    @repository(PriorityRepository)
    public priorityRepository: PriorityRepository,
    @repository(FolderRepository)
    public folderRepository: FolderRepository,
    @inject('TaskService') private taskService: TaskService
  ) {}

  @post('/tasks', {
    responses: {
      '200': {
        description: 'Task model instance',
        content: {'application/json': {schema: {'x-ts-type': Task}}},
      },
    },
  })
  async create(@requestBody() task: Task): Promise<Task> {
    console.log(`Task Model: ${task}`)
    return await this.taskRepository.create(task);
  }

  @get('/tasks/count', {
    responses: {
      '200': {
        description: 'Task model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where,
  ): Promise<Count> {
    return await this.taskRepository.count(where);
  }

  @get('/tasks', {
    responses: {
      '200': {
        description: 'Array of Task model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Task}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Task)) filter?: Filter,
  ): Promise<Response<Task>> {
    //return await this.taskRepository.find(filter);
    return await this.taskService.getTaskList(filter);
  }

  @patch('/tasks', {
    responses: {
      '200': {
        description: 'Task PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() task: Task,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where,
  ): Promise<Count> {
    return await this.taskRepository.updateAll(task, where);
  }

  @get('/tasks/{id}', {
    responses: {
      '200': {
        description: 'Task model instance',
        content: {'application/json': {schema: {'x-ts-type': Task}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Task> {
    const task: Task = await this.taskRepository.findById(id);
    if(task && task.priorityid) {
      const priority: Priority = await this.priorityRepository.findById(task.priorityid);
      task.Priority = priority;
    }
    if(task && task.folderid) {
      const folder: Folder = await this.folderRepository.findById(task.folderid);
      task.Folder = folder;
    }
    console.log(`Task by ID: ${JSON.stringify(task)}`)
    return task;
  }

  @patch('/tasks/{id}', {
    responses: {
      '204': {
        description: 'Task PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() task: Task,
  ): Promise<void> {
    await this.taskRepository.updateById(id, task);
  }

  @del('/tasks/{id}', {
    responses: {
      '204': {
        description: 'Task DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.taskRepository.deleteById(id);
  }
}
