const { User } = require('../../database/models')

const controller = {
	list: async (req, res) => {
		let users = await User.findAll({
			attributes: ['id', 'firstName', 'lastName', 'email', 'address', 'phone', 'profileImg']
		})
		let url = 'http://localhost:3000/api/users/'
		let urlImage = 'http://localhost:3000/img/profile-pictures/'
		let usersToShow = users.map(e => {
			e.setDataValue('detail', url + e.id)
			e.setDataValue('image', urlImage + e.profileImg)

			return e
		})


		let response = {
			meta: {
				status: 200,
				url: 'api/users/',
				message: "users in DB",
				totalUsers: users.length
			},
			data: usersToShow
		}
		res.json(response)
	},
	detail: async (req, res) => {
		let userToFind = req.params.id
		let { id, firstName, lastName, email, profileImg, address, phone } = await User.findByPk(userToFind)
		let user = {
			id,
			firstName,
			lastName,
			email,
			address,
			phone

		}
		let url = 'http://localhost:3000/img/profile-pictures/'
		user.image = url + profileImg


		let response = {
			meta: {
				status: 200,
				url: 'api/users/' + id,
				message: "user detail"

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
					url: 'api/users/email/' + emailToFind,
					message: 'email not found in DB'

				}
			}
			return res.json(response)
		}

		//BORRO EL PASSWORD PARA QUE NO VIAJE
		delete user.dataValues.password

		let response = {
			meta: {
				status: 200,
				url: 'api/users/email/' + emailToFind,
				message: 'email already in DB'
			},
			data: user

		}
		res.json(response)
	},
	lastUser: async (req, res) => {
		let users = await User.findAll({
			attributes: ['id', 'firstName', 'lastName', 'email', 'profileImg', 'address', 'phone']
		})
		let lastUser = users[users.length - 1]

		let response = {
			meta: {
				status: 200,
				url: 'api/users/last',
				message: 'last user in DB'
			},
			data: lastUser
		}
		res.json(response)
	},
	qty: async (req, res) => {
		let totalUsers = await User.count()
		let response = {
			meta: {
				status: 200,
				url: 'api/users/qty',
				message: 'total amount of users in DB'
			},
			data: totalUsers
		}

		res.json(response)
	},

	// API para el paginado de usuarios FEDE
	pagination: async (req, res) => {
		let allUsers = await User.findAll() //traigo todos los usuarios para tener la cantidad total
		let pageQty = Math.ceil(allUsers.length / 10) // Calculo cantidad de paginas
		let page = Number(req.params.page) // Capturo la pagina desde params
		let limit = Number(req.params.limit)
		let users = await User.findAll({
			limit: limit,
			offset: page >= 1 ? (page - 1) * limit : 0 // Logica para que el offset dependa de la pagina en la que estoy
		})
		if (page > 0 && page <= pageQty) {
			let response = {
				meta: {
					total: users.length, //cant de usuarios en la pagina
					url: `api/users/page/${page}`,
					next: page < pageQty ? `http://localhost:3000/api/users/page/${page + 1}` : null,
					previous: page > 1 ? `http://localhost:3000/api/users/page/${page - 1}` : null,

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