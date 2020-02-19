import {Entity, model, property} from '@loopback/repository';

@model()
export class Modelo extends Entity {
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
  descripcion: string;

  @property({
    type: 'number',
  })
  marcaId?: number;

  constructor(data?: Partial<Modelo>) {
    super(data);
  }
}

export interface ModeloRelations {
  // describe navigational properties here
}

export type ModeloWithRelations = Modelo & ModeloRelations;
