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
import {Proveedor} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorController {
  constructor(
    @repository(ProveedorRepository)
    public proveedorRepository : ProveedorRepository,
  ) {}

  @post('/proveedores', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedor',
            exclude: ['id'],
          }),
        },
      },
    })
    proveedor: Omit<Proveedor, 'id'>,
  ): Promise<Proveedor> {
    return this.proveedorRepository.create(proveedor);
  }

  @get('/proveedores/count', {
    responses: {
      '200': {
        description: 'Proveedor model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.count(where);
  }

  @get('/proveedores', {
    responses: {
      '200': {
        description: 'Array of Proveedor model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Proveedor, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Proveedor)) filter?: Filter<Proveedor>,
  ): Promise<Proveedor[]> {
    return this.proveedorRepository.find(filter);
  }

  @patch('/proveedores', {
    responses: {
      '200': {
        description: 'Proveedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.updateAll(proveedor, where);
  }

  @get('/proveedores/{id}', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Proveedor, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Proveedor)) filter?: Filter<Proveedor>
  ): Promise<Proveedor> {
    return this.proveedorRepository.findById(id, filter);
  }

  @patch('/proveedores/{id}', {
    responses: {
      '204': {
        description: 'Proveedor PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.updateById(id, proveedor);
  }

  @put('/proveedores/{id}', {
    responses: {
      '204': {
        description: 'Proveedor PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.replaceById(id, proveedor);
  }

  @del('/proveedores/{id}', {
    responses: {
      '204': {
        description: 'Proveedor DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.proveedorRepository.deleteById(id);
  }
}
