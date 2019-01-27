import {Entity, model, property} from '@loopback/repository';

@model()
export class Priority extends Entity {
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

  constructor(data?: Partial<Priority>) {
    super(data);
  }
}
