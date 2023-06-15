import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Module from './Module';

export default class Role extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'role_id',
    localKey: 'id'
  })
  public users: HasMany<typeof User>

  @manyToMany(() => Module, {
    pivotTable: 'module_role',
    pivotColumns: ['read', 'write'],
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'module_id',
  })
  public modules: ManyToMany<typeof Module>
}
