import {Entity, model, property} from '@loopback/repository';
import { Task } from './task.model';
const uuidv4 = require('uuid/v4');

@model()
export class Folder extends Entity {
  @property({
    type: 'string',
    id: true,
    required: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property.array(Task, {
    required: false
  })
  tasks: Task[];
  
  constructor(data?: Partial<Folder>) {
    super(data);
    const folder: any = this.toObject();
    folder['id'] = uuidv4();
  }
}
