import {Entity, model, property} from '@loopback/repository';
import { Task } from './task.model';
const uuidv4 = require('uuid/v4');

@model()
export class Product extends Entity {
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

  constructor(data?: Partial<Product>) {
    super(data);
    const product: any = this.toObject();
    product['id'] = uuidv4();
  }
}
