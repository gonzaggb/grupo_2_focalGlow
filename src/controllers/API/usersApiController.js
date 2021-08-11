const {User} = require('../../database/models')

const controller = {
    list: async(req,res)=> {
        let total = await User.findAll()
        
        total.forEach(element => {
            user.push([id,name,email])
        });
        console.log(user)
        
        let response = {
            count: {
                total : total.length
            },
            users: total
            
                
            
        }
        res.json(response)
    },
    detail : async(req,res)=>{
        let userToFind = req.params.id
        let { id, firstName, lastName, email, profileImg } = await User.findByPk(userToFind)
        let user = {
            id,
            firstName,
            lastName,
            email,
            profileImg
        }
        
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