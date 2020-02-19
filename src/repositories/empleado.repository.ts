import {DefaultCrudRepository} from '@loopback/repository';
import {Empleado, EmpleadoRelations} from '../models';
import {SinaDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {
  constructor(
    @inject('datasources.sinaDb') dataSource: SinaDbDataSource,
  ) {
    super(Empleado, dataSource);
  }
}
