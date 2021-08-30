const { User } = require('../../database/models')

const controller = {
	list: async (req, res) => {
		let users = await User.findAll({
			attributes: ['id', 'firstName', 'lastName', 'email',]
		})
		let url= 'http://localhost:3000/api/users/'
		let usersToShow = users.map(e=>{
			e.setDataValue('detail', url+e.id)
				
			return e
		})
		
		 
		let response = {
			count: {
				total: users.length
			},
			users: usersToShow
		}
		res.json(response)
	},
	detail: async (req, res) => {
		let userToFind = req.params.id
		let { id, firstName, lastName, email, profileImg } = await User.findByPk(userToFind)
		let user = {
			id,
			firstName,
			lastName,
			lastName,
			profileImg
		}

		let response = {
			meta: {
				status: 200,
				url: 'api/users/' + id
			},
			data: user

		}
		res.json(response)
	},

	detailByEmail: async (req, res) => {
		let emailToFind = req.params.email

		let user = await User.findOne({ where: { email: emailToFind } });

		if (user === null) {
			let response = {
				meta: {
					status: 204,
					url: 'api/users/email/' + emailToFind
				}
			}
			return res.json(response)
		}

		//BORRO EL PASSWORD PARA QUE NO VIAJE
		delete user.dataValues.password

		let response = {
			meta: {
				status: 200,
				url: 'api/users/email/' + emailToFind
			},
			data: user

		}
		res.json(response)
	},
	lastUser: async (req,res)=> {
		let users = await User.findAll({
			attributes: ['id', 'firstName', 'lastName', 'email','profileImg']
		})
		 let lastUser = users[users.length-1] 
		 
		let response = {
			count: {
				id: lastUser.id
			},
			users: lastUser
		}
		res.json(response)
	},
	qty:async (req,res)=>{
		let users = await User.findAll()
		let totalUSers = users.length
		let response = {
			
			users: totalUSers
		}
		res.json(response)
	}



}

module.exports = controller