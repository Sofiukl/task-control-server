import {Entity, model, property} from '@loopback/repository';
import { Task } from './task.model';
const uuidv4 = require('uuid/v4');

@model()
export class Cart extends Entity {
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
  productid: string;

  constructor(data?: Partial<Cart>) {
    super(data);
    const cart: any = this.toObject();
    cart['id'] = uuidv4();
  }
}
