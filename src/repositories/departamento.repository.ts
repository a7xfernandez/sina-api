import {DefaultCrudRepository} from '@loopback/repository';
import {Departamento, DepartamentoRelations} from '../models';
import {SinaDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {
  constructor(
    @inject('datasources.sinaDb') dataSource: SinaDbDataSource,
  ) {
    super(Departamento, dataSource);
  }
}
