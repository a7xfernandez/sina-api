import { Entity, model, property } from '@loopback/repository';

@model()
export class Empleado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
  })
  numeroIdentidad?: string;

  @property({
    type: 'string',
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaIngreso: string;

  @property({
    type: 'number',
  })
  departamentoId?: number;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
