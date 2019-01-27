import {Entity, model, property, hasOne} from '@loopback/repository';
import { Priority, Folder } from '.';
const uuidv4 = require('uuid/v4');

@model()
export class Task extends Entity {
  
  @property({
    type: 'string',
    id: true,
    required: false
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  folderid: string;

  @property({
    type: 'string'
  })
  dueDate: string;

  @property({
    type: 'string',
  })
  assignee?: string;
  
  @property({
    type: 'string',
  })
  priorityid: string;

  @property({
    type: 'object'
  })
  Priority?: Priority

  @property({
    type: 'object'
  })
  Folder?: Folder

  @property({
    type: 'string',
  })
  folderName: string;
  
  @property({
    type: 'string',
  })
  priorityName: string;

  constructor(data?: Partial<Task>) {
    super(data);
    const task: any = this.toObject();
    task['id'] = uuidv4();
  }
}