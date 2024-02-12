import { z } from 'zod'
import { CustomerInput } from '../types'

export class CustomerValidation {
	create(input: CustomerInput) {
		const schema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string(),
		})
		return schema.parse(input)
	}

	update(input: CustomerInput) {
		const schema = z.object({
			name: z.string().optional(),
			email: z.string().email().optional(),
			password: z.string().optional(),
		})
		return schema.parse(input)
	}

	signUp(input: CustomerInput) {
		const schema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string(),
		})
		return schema.parse(input)
	}

	signIn(input: CustomerInput) {
		const schema = z.object({
			email: z.string().email(),
			password: z.string(),
		})
		return schema.parse(input)
	}
}
