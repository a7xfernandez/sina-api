import { DefaultCrudRepository } from '@loopback/repository';
import { User, UserRelations } from '../models';
import { SinaDbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.userName,
  UserRelations
  > {
  constructor(
    @inject('datasources.sinaDb') dataSource: SinaDbDataSource,
  ) {
    super(User, dataSource);
  }
}
