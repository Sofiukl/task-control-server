import {Entity, model, property} from '@loopback/repository';

@model()
export class Task extends Entity {
  
  @property({
    type: 'string',
    id: true,
    required: true,
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
  priorityid?: string;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}
