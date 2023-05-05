import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Category from './Category'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public articleTitle: string

  @column()
  public articleBody: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public users: BelongsTo <typeof User>

  @manyToMany(() => Category, {
    localKey: "id",
    pivotForeignKey: "post_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "category_id",
    pivotTable: "category_post"
  })
  
  public categories: ManyToMany <typeof Category>

}
