import { Router } from 'express'
import { CustomerController } from '../controllers'

export const authRoute = () => {
	const router = Router()
	const controller = new CustomerController()

	router.post('/signin', controller.signIn)
	router.post('/signup', controller.signUp)

	return {
		prefix: '/auth',
		router,
	}
}
