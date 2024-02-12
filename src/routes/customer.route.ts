import { Router } from 'express'
import { CustomerController } from '../controllers'

export const customerRoute = () => {
	const router = Router()
	const controller = new CustomerController()

	router.get('/', controller.findMany)
	router.get('/:id', controller.findOne)
	router.post('/', controller.create)
	router.put('/:id', controller.update)
	router.delete('/:id', controller.delete)

	return {
		prefix: '/customers',
		router,
	}
}
