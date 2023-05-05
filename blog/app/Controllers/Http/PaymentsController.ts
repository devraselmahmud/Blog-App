import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Payment from 'App/Models/Payment'
import User from 'App/Models/User'



export default class PaymentsController {


    
    public async store({request, response}: HttpContextContract){

        const user = await User.findOrFail(3)
        console.log(user)


        const newPostSchema = schema.create({
            bkashNo: schema.number(),
            transactionId: schema.string({}, [
                rules.alphaNum(),
            ]),
          })
          const payload = await request.validate({ schema: newPostSchema })

          const { bkashNo, transactionId } = payload;

          const pay = await Payment.create({ bkashNo, transactionId, userId: user.$original.id })

          return response.json({ pay })




    }
}
