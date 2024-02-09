import { Response } from 'express'
import status from 'http-status'
import { ZodError } from 'zod'

interface Params {
	error?: any
	message?: string
	res: Response
	[x: string]: any
}
export class Reply {
	ok({ res, ...rest }: Params) {
		return res.status(status.OK).json({
			status: {
				code: status.OK,
				name: status['200_NAME'],
			},
			...rest,
		})
	}

	badRequest({ res, ...rest }: Params) {
		return res.status(status.BAD_REQUEST).json({
			status: {
				code: status.BAD_REQUEST,
				name: status['400_NAME'],
			},
			...rest,
		})
	}

	notFound({ res, ...rest }: Params) {
		return res.status(status.NOT_FOUND).json({
			status: {
				code: status.NOT_FOUND,
				name: status['404_NAME'],
			},
			...rest,
		})
	}

	unauthorized({ res, ...rest }: Params) {
		return res.status(status.UNAUTHORIZED).json({
			status: {
				code: status.UNAUTHORIZED,
				name: status['401_NAME'],
			},
			...rest,
		})
	}

	internalServerError({ error, res, ...rest }: Params) {
		let message = error.message
		if (error instanceof ZodError) {
			message = error.errors.map((err) => err.path.join('.') + ' ' + err.message.toLowerCase())
		}

		return res.status(status.INTERNAL_SERVER_ERROR).json({
			status: {
				code: status.INTERNAL_SERVER_ERROR,
				name: status['500_NAME'],
			},
			message,
			...rest,
		})
	}
}
