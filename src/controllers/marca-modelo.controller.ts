import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Marca,
  Modelo,
} from '../models';
import {MarcaRepository} from '../repositories';

export class MarcaModeloController {
  constructor(
    @repository(MarcaRepository) protected marcaRepository: MarcaRepository,
  ) { }

  @get('/marcas/{id}/modelos', {
    responses: {
      '200': {
        description: 'Array of Modelo\'s belonging to Marca',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Modelo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Modelo>,
  ): Promise<Modelo[]> {
    return this.marcaRepository.modelos(id).find(filter);
  }

  @post('/marcas/{id}/modelos', {
    responses: {
      '200': {
        description: 'Marca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Modelo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Marca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modelo, {
            title: 'NewModeloInMarca',
            exclude: ['id'],
            optional: ['marcaId']
          }),
        },
      },
    }) modelo: Omit<Modelo, 'id'>,
  ): Promise<Modelo> {
    return this.marcaRepository.modelos(id).create(modelo);
  }

  @patch('/marcas/{id}/modelos', {
    responses: {
      '200': {
        description: 'Marca.Modelo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modelo, {partial: true}),
        },
      },
    })
    modelo: Partial<Modelo>,
    @param.query.object('where', getWhereSchemaFor(Modelo)) where?: Where<Modelo>,
  ): Promise<Count> {
    return this.marcaRepository.modelos(id).patch(modelo, where);
  }

  @del('/marcas/{id}/modelos', {
    responses: {
      '200': {
        description: 'Marca.Modelo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Modelo)) where?: Where<Modelo>,
  ): Promise<Count> {
    return this.marcaRepository.modelos(id).delete(where);
  }
}
