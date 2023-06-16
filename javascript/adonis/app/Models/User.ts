import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  beforeSave
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash';
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column() 
  public active: boolean

  @column()
  public password: string

  @column()
  public role_id: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ serializeAs: null })
  public deleted_at: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @belongsTo(() => Role, {
    foreignKey: 'role_id',
    localKey: 'id'
  })
  public role: BelongsTo<typeof Role>

}
