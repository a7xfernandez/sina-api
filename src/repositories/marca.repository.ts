import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Marca, MarcaRelations, Modelo} from '../models';
import {SinaDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ModeloRepository} from './modelo.repository';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype.id,
  MarcaRelations
> {

  public readonly modelos: HasManyRepositoryFactory<Modelo, typeof Marca.prototype.id>;

  constructor(
    @inject('datasources.sinaDb') dataSource: SinaDbDataSource, @repository.getter('ModeloRepository') protected modeloRepositoryGetter: Getter<ModeloRepository>,
  ) {
    super(Marca, dataSource);
    this.modelos = this.createHasManyRepositoryFactoryFor('modelos', modeloRepositoryGetter,);
    this.registerInclusionResolver('modelos', this.modelos.inclusionResolver);
  }
}
