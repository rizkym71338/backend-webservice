import { Express } from 'express'
import Controller from './controller'
import { auth } from '../../middlewares'

export interface Input {
	name?: string
	email?: string
	password?: string
}

export default function customer(app: Express) {
	const controller = new Controller()

	app.get('/customers', auth, controller.findMany)
	app.get('/customers/:id', auth, controller.findOne)
	app.post('/customers', auth, controller.create)
	app.put('/customers/:id', auth, controller.update)
	app.delete('/customers/:id', auth, controller.delete)
	app.post('/customers/signin', controller.signIn)
	app.post('/customers/signup', controller.signUp)
}
