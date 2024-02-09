import { Express } from 'express'
import customer from './customer'

export default function modules(app: Express) {
	customer(app)
}
