import { Express } from 'express'
import { authRoute } from './auth.route'
import { customerRoute } from './customer.route'
import { authMiddleware } from '../middlewares'

export const routes = (app: Express) => {
	app.use(authRoute().prefix, authRoute().router)
	app.use(customerRoute().prefix, authMiddleware, customerRoute().router)
}
