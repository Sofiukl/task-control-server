import {Entity, model, property} from '@loopback/repository';
import { Task } from './task.model';
const uuidv4 = require('uuid/v4');

@model()
export class ProductCategory extends Entity {
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

  constructor(data?: Partial<ProductCategory>) {
    super(data);
    const product: any = this.toObject();
    product['id'] = uuidv4();
  }
}
