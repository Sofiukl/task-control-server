import {Entity, model, property} from '@loopback/repository';
import { Task } from './task.model';
const uuidv4 = require('uuid/v4');

@model()
export class Transaction extends Entity {
  @property({
    type: 'string',
    id: true,
    required: false,
  })
  id: string;

  @property({
    type: 'number',
    required: false,
  })
  amount: number;

  @property({
    type: 'number',
    required: false,
  })
  quantity: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  constructor(data?: Partial<Transaction>) {
    super(data);
    const transaction: any = this.toObject();
    transaction['id'] = uuidv4();
  }
}
