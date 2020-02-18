import {DefaultCrudRepository} from '@loopback/repository';
import {Marca, MarcaRelations} from '../models';
import {SinaDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype.id,
  MarcaRelations
> {
  constructor(
    @inject('datasources.sinaDb') dataSource: SinaDbDataSource,
  ) {
    super(Marca, dataSource);
  }
}
