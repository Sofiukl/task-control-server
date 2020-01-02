import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {ProductCategory} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductCategoryRepository extends DefaultCrudRepository<
  ProductCategory,
  typeof ProductCategory.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ProductCategory, dataSource);
  }
}
