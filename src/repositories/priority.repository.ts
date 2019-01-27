import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Priority} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PriorityRepository extends DefaultCrudRepository<
  Priority,
  typeof Priority.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Priority, dataSource);
  }
}
