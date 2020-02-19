import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Departamento, DepartamentoRelations, Empleado} from '../models';
import {SinaDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EmpleadoRepository} from './empleado.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.sinaDb') dataSource: SinaDbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Departamento, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
