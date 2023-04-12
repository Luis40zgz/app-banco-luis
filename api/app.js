import express from 'express'
import morgan from 'morgan'
import indexRouter from './routes/index.js'
import productsRouter from './routes/products.js'
import cors from 'cors'

var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('./usersAccounts.json')
})

const PORT = 3000

// crear una instancia de express
const app = express()
app.use(cors())
app.use(morgan('dev'))

// definir la ruta raíz
app.use('/', indexRouter)
app.use('/products', productsRouter)

// arrancar el servidor por el puerto 3000
console.log(`Api escuchando por el puert ${PORT}`)
app.listen(PORT)