import {DefaultCrudRepository} from '@loopback/repository';
import {Task} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class TaskRepository extends DefaultCrudRepository<Task,typeof Task.prototype.id> {
  
  constructor(
    @inject('datasources.db') dataSource: DbDataSource
  ) {
    super(Task, dataSource);
  }
}
