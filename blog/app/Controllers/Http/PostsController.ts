import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Category from 'App/Models/Category'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
export const { actions } = Bouncer


export default class PostsController {
    public async index({ response }: HttpContextContract){
        const categories = await Category.query().select('*').preload('posts').orderBy('created_at', 'desc')

        return response.json({ categories })
    }

    public async store({ request, response }: HttpContextContract){

        const user = await User.findOrFail(3)

        // console.log(user)

        const newPostSchema = schema.create({
            articleTitle: schema.string(),
            articleBody: schema.string(),
            categoryName: schema.array().members(schema.string())
           
          })

          const payload = await request.validate({ schema: newPostSchema })
          const {articleTitle, articleBody, categoryName} = payload;

          const post = await Post.create({articleTitle, articleBody, userId:user.id})

          // console.log(post)

        //   const newCategorySchema = schema.create({
        //     categoryName: schema.array().members(schema.string())
        //   })

        //   const categoryPayload = await request.validate({ schema: newCategorySchema })
        
          // const category = await post.related('categories').create({categoryName})

          //check whether any similar category exists

          const categoryMapper = categoryName.forEach(async function(x){
            const category = await Category.findBy('categoryName', x)

            if(category?.id){
              await post.related('categories').attach([category.id])
            }
            else{
              await post.related('categories').create({'categoryName': x})
            }
          })
          

          return response.json({ post, categoryMapper })
    }


    public async show({ response }: HttpContextContract){
      const post = await Post.query().select('*').preload('categories').preload('users').orderBy('created_at', 'desc')

      return response.json({post})
    }

    public async update({ request, response, params }: HttpContextContract){
      // const { articleTitle, articleBody, categoryName } = request.body()

      // const up = schema.create({
      //   articleTitle: schema.string(),
      //   articleBody: schema.string(),
      //   categoryName: schema.array().members(schema.string()),
      //   userId: schema.number()
       
      // })

      // const payload = await request.validate({ schema: up })

      // const {articleTitle, articleBody, categoryName, } = payload;

      const post = await Post.query().where('id', params.id).whereRaw('userId = user_id').update(request.body())

      // post.articleTitle = request.input('article_title')
      // post.articleBody = request.input('article_body')

      
      return response.json({ post })

    }

    public async destroy({ response, params }: HttpContextContract){
      const user = await User.findOrFail(1)
      // console.log(user)
      const post = await Post.findOrFail(params.id)
      // const check1 = user.$original.id
      // console.log(check1)
      // const check2 = post.$original.userId
      // console.log(check2)
      const check = post.$original.userId === user.$original.id

      if(check){
        await post.delete()
        return response.json({post})
      }else{
        return response.json({message: 'You are not authorized to delete this post'})
      }

      // console.log(del)


      // await post.delete()

      
    }

    public async q({ params }: HttpContextContract){

      const user = await User.findOrFail(1)

      const que = `SELECT * FROM posts WHERE id = ${params.id} AND userId = ${user.$original.id}`

      const post = await Post.query().whereRaw(que)

      return post
    } 
      
      


    // public async showPost({  }: HttpContextContract){
    //   .define('show-post', (user: User, post: Post) => {}
    // }
}
