import {DefaultCrudRepository} from '@loopback/repository';
import {Tipo, TipoRelations} from '../models';
import {SinaDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TipoRepository extends DefaultCrudRepository<
  Tipo,
  typeof Tipo.prototype.id,
  TipoRelations
> {
  constructor(
    @inject('datasources.sinaDb') dataSource: SinaDbDataSource,
  ) {
    super(Tipo, dataSource);
  }
}
