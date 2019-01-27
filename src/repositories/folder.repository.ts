import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Folder} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FolderRepository extends DefaultCrudRepository<
  Folder,
  typeof Folder.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Folder, dataSource);
  }
}
