const { User } = require('../../database/models')

const controller = {
	list: async (req, res) => {
		let users = await User.findAll({
			attributes: ['id', 'firstName', 'lastName', 'email',]
		})
		let url = 'http://localhost:3000/api/users/'
		let usersToShow = users.map(e => {
			e.setDataValue('detail', url + e.id)

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
			email,

		}
		let url = 'http://localhost:3000/img/profile-pictures/'
		user.image = url + profileImg
		

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
	lastUser: async (req, res) => {
		let users = await User.findAll({
			attributes: ['id', 'firstName', 'lastName', 'email', 'profileImg']
		})
		let lastUser = users[users.length - 1]

		let response = {
			count: {
				id: lastUser.id
			},
			users: lastUser
		}
		res.json(response)
	},
	qty: async (req, res) => {
		let users = await User.findAll()
		let totalUSers = users.length
		let response = {

			users: totalUSers
		}
		res.json(response)
	},
	
	// API para el paginado de usuarios FEDE
	pagination: async (req, res) => {
        let allUsers = await User.findAll() //traigo todos los usuarios para tener la cantidad total
        let pageQty = Math.ceil(allUsers.length / 10) // Calculo cantidad de paginas
        let page = Number(req.params.page) // Capturo la pagina desde params
        let users = await User.findAll({
            limit: 10,
            offset: page >= 1 ? (page -1) * 10 : 0 // Logica para que el offset dependa de la pagina en la que estoy
        })
        if (page > 0 && page <= pageQty ) {
            let response = {
                meta: {
                    total: users.length, //cant de usuarios en la pagina
                    url: `api/users/page/${page}`,
                    next: page < pageQty ? `http://localhost:3000/api/users/page/${page+1}` : null,
                    previous: page > 1 ? `http://localhost:3000/api/users/page/${page-1}` : null,

                },
                data: users

            }
            res.json(response)
        } else {
            let response = {
                meta: {
                    url: `api/users/page/${page}`,
                    status: 204,

                },
            }
            res.json(response)
        }
    }



}

module.exports = controller