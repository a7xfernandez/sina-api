import {DefaultCrudRepository} from '@loopback/repository';
import {Modelo, ModeloRelations} from '../models';
import {SinaDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ModeloRepository extends DefaultCrudRepository<
  Modelo,
  typeof Modelo.prototype.id,
  ModeloRelations
> {
  constructor(
    @inject('datasources.sinaDb') dataSource: SinaDbDataSource,
  ) {
    super(Modelo, dataSource);
  }
}
