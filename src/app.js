const express = require('express')
require('./db/mongoose')

const app = express()

app.use(express.json())

const userRouter = require('./routers/user')


app.use(userRouter)




module.exports = app