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
  Departamento,
  Empleado,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoEmpleadoController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Empleado\'s belonging to Departamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.departamentoRepository.empleados(id).find(filter);
  }

  @post('/departamentos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Departamento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInDepartamento',
            exclude: ['id'],
            optional: ['departamentoId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.departamentoRepository.empleados(id).create(empleado);
  }

  @patch('/departamentos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Departamento.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.departamentoRepository.empleados(id).patch(empleado, where);
  }

  @del('/departamentos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Departamento.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.departamentoRepository.empleados(id).delete(where);
  }
}
