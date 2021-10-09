const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config') 
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const listItemRoutes = require('./client/routes/api/listItems')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB database connected ...'))
    .catch((err) => console.log(err))


app.use('/api/listItems', listItemRoutes)
app.get('/', (req, res) => res.send('Hello world'))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
