import express from 'express'
import morgan from 'morgan'
import indexRouter from './routes/index.js'
import cors from 'cors'

const PORT = 3000

// crear una instancia de express
const app = express()
app.use(cors())
app.use(morgan('dev'))

// definir la ruta raíz
app.use('/', indexRouter)

// arrancar el servidor por el puerto 3000
console.log(`Api escuchando por el puert ${PORT}`)
app.listen(PORT)
