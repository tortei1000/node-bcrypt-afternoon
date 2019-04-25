module.exports = {
  usersOnly: (req, res, next) => {
    if(!req.session.user){
      return res.status(401).send(`please log in`)
    }
    next()
  },

  adminsOnly: (req,res,next) =>{
    console.log(req.session)
    if(!req.session.user.is_admin){
      return res.status(403).send(`not admin`)
    }
    next()
  }
}