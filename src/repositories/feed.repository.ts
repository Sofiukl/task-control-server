import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Feed} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FeedRepository extends DefaultCrudRepository<
  Feed,
  typeof Feed.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Feed, dataSource);
  }
}
