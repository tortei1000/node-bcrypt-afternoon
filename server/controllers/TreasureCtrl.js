module.exports = {
  dragonTreasure : async(req, res)=>{
    const db = req.app.get('db')

    const treasure = await db.get_dragon_treasure(1)
    res.status(200).send(treasure)
  },

  getUserTreasure : async(req, res)=> {
    const db = req.app.get('db')
    const {id} = req.session.user
    const treasure = await db.get_user_treasure(id)

    res.status(200).send(treasure)
  }
}