import {Entity, model, property} from '@loopback/repository';

@model()
export class Assignee extends Entity {
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
  taskid: string;

  @property({
    type: 'string',
    required: true,
  })
  userid: string;

  @property({
    type: 'string',
    required: true,
  })
  createby: string;

  @property({
    type: 'date',
    required: true,
  })
  createdate: string;

  @property({
    type: 'string',
  })
  modifyby?: string;

  @property({
    type: 'date',
  })
  modifydate?: string;

  constructor(data?: Partial<Assignee>) {
    super(data);
  }
}
