import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Tipo extends Entity {
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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tipo>) {
    super(data);
  }
}

export interface TipoRelations {
  // describe navigational properties here
}

export type TipoWithRelations = Tipo & TipoRelations;
