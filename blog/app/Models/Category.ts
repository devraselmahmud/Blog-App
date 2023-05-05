import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public categoryName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Post, {
    localKey: "id",
    pivotForeignKey: "category_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "post_id",
    pivotTable: "category_post"
  })

  public posts: ManyToMany <typeof Post>

}
