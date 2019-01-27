import {Entity, model, property} from '@loopback/repository';
import { Task } from './task.model';
const uuidv4 = require('uuid/v4');

@model()
export class Feed extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @property({
    type: 'string',
    required: true,
  })
  criteria: string;
  
  @property.array(Task, {
    required: false
  })
  tasks: Task[];

  @property({
    type: 'number',
    required: false
  })
  taskCount: number

  constructor(data?: Partial<Feed>) {
    super(data);
    const feed: any = this.toObject();
    feed['id'] = uuidv4();
  }
}
