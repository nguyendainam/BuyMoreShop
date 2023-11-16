import express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import ClientRouter from './Router/clientRoute.js'
import ProductRouter from './Router/productRoute.js'
import fileupload from 'express-fileupload'
import _ from 'lodash'

dotenv.config()

const app = express()
app.use(cookieParser())
app.use(fileupload({ createParentPath: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

let port = process.env.PORT || 9999

app.use(ClientRouter)
app.use(ProductRouter)

app.listen(port, () => {
  console.log('Server running on port: ' + port)
})
