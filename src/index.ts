import mongoose, { ConnectOptions } from 'mongoose'
import app from './app'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import { Router } from 'express'

mongoose
  .connect(
    `mongodb+srv://guchaneishvili:guchaneishvili@bdh-scrapping.fokbyiy.mongodb.net/?retryWrites=true&w=majority&appName=BDH-Scrapping`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  )
  .then((res) => {
    console.log('Connected to BDH API Database - Initial Connection')
  })
  .catch((err) => {
    console.log(`Initial BDH API Database connection error occured -`, err)
  })

const swaggerOption = {
  swaggerDefinition: {
    info: {
      title: 'BDH Api ',
      description: 'BDH API Information',
      version: '1.0.0',
    },
    contact: {
      name: 'Giga Uchaneishvli',
    },
    servers: ['http://localhost:3001/'],
  },
  apis: ['**/*.ts'],
}

const swaggerDocs = swaggerJsDoc(swaggerOption)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const router = Router()

const options = {
  origin: ['http://localhost:3001'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: true,
  credentials: true,
}

router.use(cors(options))
app.use(cors())
