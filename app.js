require('./config/index')
const path = require('path')
const MongoDB = require('./services/mongoDb')
const express = require('express')
const bodyParser = require('body-parser')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { graphqlHTTP } = require('express-graphql') 

// CONNECT WITH MONGODB
const connect = async () => await new MongoDB().connect()
connect()

// CREATE EXPRESS SERVER
const app = express()

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

// GRAPHQL
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))
const resolversArray = loadFilesSync(path.join(__dirname, '**/resolvers.js'))
const graphQLSchema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray
})
app.use('/graphql', graphqlHTTP({
  schema: graphQLSchema,
  graphiql: process.env.NODE_ENV === 'development'
}))

// CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// ROUTES
const routes = require('./routes/index')
app.use('/api/v1', routes)

module.exports = app
