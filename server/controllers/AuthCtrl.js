const bcrypt = require('bcryptjs')
module.exports = {
  register : async (req, res)=> {
    const db = req.app.get('db')
    const {username, password, isAdmin} = req.body

    let result = await db.get_user(username)
    let existingUser = result[0]

    if(existingUser){
      return res.status(409).send(`username taken`)
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    let registeredUser = await db.register_user(isAdmin, username, hash) 
    let user = registeredUser[0]

    delete user.hash
    req.session.user = user
    res.status(201).send(req.session.user)
  },

  login: async (req, res) => {
    const db = req.app.get('db')
    const {username, password, isAdmin} = req.body

    foundUser = await db.get_user(username)
    user = foundUser[0]

    if(!user){
      return res.status(401).send(`username or password incorrect`)
    }
    isAuthenticated = bcrypt.compareSync(password, user.hash)

    if(!isAuthenticated){
      return res.status(401).send(`username or password incorrect`)
    } 

    delete user.hash
    req.session.user = user
    res.send(req.session.user)
      
  },
  logout : (req, res) =>{
    req.session.destroy()
    res.sendStatus(200)
  }
}