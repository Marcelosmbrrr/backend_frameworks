import { DateTime } from 'luxon'
import {
  BaseModel, column, belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public roleId: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
    localKey: 'id'
  })
  public role: BelongsTo<typeof Role>

}
