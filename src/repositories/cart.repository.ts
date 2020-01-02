import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Cart} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Cart, dataSource);
  }
}
