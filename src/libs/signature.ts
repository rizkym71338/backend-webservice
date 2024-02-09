import jwt from 'jsonwebtoken'
import { env } from './env'
import { Request } from 'express'

export class Signature {
	generate(payload: any) {
		return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '30d' })
	}

	validate(req: Request & { user?: any }) {
		try {
			const signature = req.get('Authorization') || ''
			const payload = jwt.verify(signature.split(' ')[1], env.JWT_SECRET)
			req.user = payload
			return true
		} catch (error) {
			return false
		}
	}
}
