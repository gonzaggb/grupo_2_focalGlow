const {User} = require('../../database/models')

const controller = {
    list: async(req,res)=> {
        let users = await User.findAll()
        let response = {
            meta: {
                status : 200,
                total : users.length,
                url: 'api/users'

            },
            data:users
            
        }
        res.json(response)
    },
    detail : async(req,res)=>{
        let {id} = req.params
        let user = await User.findByPk(id)
        let response = {
            meta: {
                status: 200,
                url: 'api/users/'+id
            },
            data: user
        }
        res.json(response)
    }



}

module.exports= controller