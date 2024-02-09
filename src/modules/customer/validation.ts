import { z } from 'zod'
import { Input } from '.'

export default class Validation {
	create(input: Input) {
		const schema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string(),
		})
		return schema.parse(input)
	}

	update(input: Input) {
		const schema = z.object({
			name: z.string().optional(),
			email: z.string().email().optional(),
			password: z.string().optional(),
		})
		return schema.parse(input)
	}

	signUp(input: Input) {
		const schema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string(),
		})
		return schema.parse(input)
	}

	signIn(input: Input) {
		const schema = z.object({
			email: z.string().email(),
			password: z.string(),
		})
		return schema.parse(input)
	}
}
