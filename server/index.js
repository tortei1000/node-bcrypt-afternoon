require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')

const {SESSION_SECRET, PORT_NUMBER, CONNECTION_STRING} = process.env
const AuthCtrl = require('./controllers/AuthCtrl')
const TreasureCtrl = require('./controllers/TreasureCtrl')

app.use(express.json())

massive(CONNECTION_STRING).then(db=>{
  app.set('db', db)
  console.log(`2- database is connected`)
})

app.use(session({
  secret: SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}))

app.post('/auth/register', AuthCtrl.register)
app.post('/auth/login', AuthCtrl.login)
app.get('/auth/logout', AuthCtrl.logout)
app.get('/api/treasure/dragon', TreasureCtrl.dragonTreasure)


app.listen(PORT_NUMBER, ()=>{
  console.log(`1-server is online on port ${PORT_NUMBER}`)
})

