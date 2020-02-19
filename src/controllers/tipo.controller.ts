import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Tipo} from '../models';
import {TipoRepository} from '../repositories';

export class TipoController {
  constructor(
    @repository(TipoRepository)
    public tipoRepository : TipoRepository,
  ) {}

  @post('/tipos', {
    responses: {
      '200': {
        description: 'Tipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tipo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {
            title: 'NewTipo',
            exclude: ['id'],
          }),
        },
      },
    })
    tipo: Omit<Tipo, 'id'>,
  ): Promise<Tipo> {
    return this.tipoRepository.create(tipo);
  }

  @get('/tipos/count', {
    responses: {
      '200': {
        description: 'Tipo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Tipo)) where?: Where<Tipo>,
  ): Promise<Count> {
    return this.tipoRepository.count(where);
  }

  @get('/tipos', {
    responses: {
      '200': {
        description: 'Array of Tipo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tipo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Tipo)) filter?: Filter<Tipo>,
  ): Promise<Tipo[]> {
    return this.tipoRepository.find(filter);
  }

  @patch('/tipos', {
    responses: {
      '200': {
        description: 'Tipo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {partial: true}),
        },
      },
    })
    tipo: Tipo,
    @param.query.object('where', getWhereSchemaFor(Tipo)) where?: Where<Tipo>,
  ): Promise<Count> {
    return this.tipoRepository.updateAll(tipo, where);
  }

  @get('/tipos/{id}', {
    responses: {
      '200': {
        description: 'Tipo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tipo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Tipo)) filter?: Filter<Tipo>
  ): Promise<Tipo> {
    return this.tipoRepository.findById(id, filter);
  }

  @patch('/tipos/{id}', {
    responses: {
      '204': {
        description: 'Tipo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {partial: true}),
        },
      },
    })
    tipo: Tipo,
  ): Promise<void> {
    await this.tipoRepository.updateById(id, tipo);
  }

  @put('/tipos/{id}', {
    responses: {
      '204': {
        description: 'Tipo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipo: Tipo,
  ): Promise<void> {
    await this.tipoRepository.replaceById(id, tipo);
  }

  @del('/tipos/{id}', {
    responses: {
      '204': {
        description: 'Tipo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoRepository.deleteById(id);
  }
}
