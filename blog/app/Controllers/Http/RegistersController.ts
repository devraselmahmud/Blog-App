import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'



export default class RegistersController {
    public async store({ request, response }: HttpContextContract){
        // console.log(request.body())
    // await User.create(va)

        const validations = schema.create({
            user_name: schema.string(),
            first_name: schema.string(),
            last_name: schema.string(),
            email: schema.string({}, [
                rules.email(),
                rules.unique({table: 'users', column: 'email'})
            ]),

            password: schema.string({}, [
                rules.confirmed(),
                rules.minLength(8)
                
            ]),
          })

         
        //   console.log(request.validate({schema: validations}))

          const payload = await request.validate({ schema: validations })

          const data = await User.create(payload)



          return response.json({ data })
        // return response.json({message: 'Legend is taking care of it'})

    }


    public async update({request, response, params}: HttpContextContract){
        const data = await User.query().where('user_name', params.id).update(request.body())

        return response.json({data})
    }


    public async user({response, params}: HttpContextContract){
        const data = await User.query().where('id', params.id)

        return response.json('Success')
    }
}
