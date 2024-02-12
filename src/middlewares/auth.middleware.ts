import { NextFunction, Request, Response } from 'express'
import { Reply, Signature } from '../libs'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const signature = new Signature()
	const authenticated = signature.validate(req)
	if (!authenticated) return new Reply().unauthorized({ message: 'unauthorized', res })
	next()
}
