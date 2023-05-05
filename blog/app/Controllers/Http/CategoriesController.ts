// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { schema } from '@ioc:Adonis/Core/Validator'
// import Category from 'App/Models/Category'


export default class CategoriesController {
    public async index(){
        return "this is controller index"
    }

//     public async store({ request, response }: HttpContextContract){
//           const newCategorySchema = schema.create({
//             categoryName: schema.string()
//           })

//           const categoryPayload = await request.validate({ schema: newCategorySchema })

//           const category = await Category.create(categoryPayload)
//     }
}
