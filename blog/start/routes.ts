
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: "I'm home route" }
})

Route.post('/https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout/payment/create', async () => {
  return { hi: "There is nothing here" }
})

//registration
Route.post('/register', 'RegistersController.store')

//show all posts
Route.get('/posts', 'PostsController.show')

//show posts with category
Route.get('/category', 'PostsController.index')

//creating a post
Route.post('/createpost', 'PostsController.store')

//updating a post
Route.put('/updatepost/:id', 'PostsController.update')

//delete a post
Route.delete('/delete/:id', 'PostsController.destroy')

//update an user info
Route.put('/user/:id', 'RegistersController.update')

// Route.post('/createcategory', 'CategoriesController.store')

Route.post('/pay', 'PaymentsController.store')

// Route.get('/pay', 'PaymentsController.index')


Route.get('/users/:id', 'RegistersController.user').middleware(async (ctx, next)=>{
  console.log(`Inside middleware ${ctx.request.url()}`)
  await next()
})

//middleware
Route.get('/usr', async()=>{
  console.log('Inside usr')
}).middleware(async (ctx, next)=>{
  let x=5, y=2

  console.log(`Inside middleware ${x>y?await next():'y is greater'}`)
  console.log('sum is:', 5+2)
  
})
