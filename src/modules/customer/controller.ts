import { Request, Response } from 'express'
import { Reply } from '../../libs'
import Service from './service'
import Validation from './validation'

export default class Controller {
	private reply = new Reply()
	private service = new Service()
	private validation = new Validation()

	findMany = async (req: Request, res: Response) => {
		try {
			const { data, notfound } = await this.service.findMany()
			if (notfound) return this.reply.notFound({ message: notfound, res })
			return this.reply.ok({ customers: data, res })
		} catch (error) {
			return this.reply.internalServerError({ error, res })
		}
	}

	findOne = async (req: Request, res: Response) => {
		try {
			const { data, notfound } = await this.service.findOne(req.params.id)
			if (notfound) return this.reply.notFound({ message: notfound, res })
			return this.reply.ok({ customer: data, res })
		} catch (error) {
			return this.reply.internalServerError({ error, res })
		}
	}

	create = async (req: Request, res: Response) => {
		try {
			const input = this.validation.create(req.body)
			const { alreadyExists } = await this.service.create(input)
			if (alreadyExists) return this.reply.badRequest({ message: alreadyExists, res })
			return this.reply.ok({ message: 'customer created', res })
		} catch (error) {
			return this.reply.internalServerError({ error, res })
		}
	}

	update = async (req: Request, res: Response) => {
		try {
			const input = this.validation.update(req.body)
			const { notfound } = await this.service.update(req.params.id, input)
			if (notfound) return this.reply.notFound({ message: notfound, res })
			return this.reply.ok({ message: 'customer updated', res })
		} catch (error) {
			return this.reply.internalServerError({ error, res })
		}
	}

	delete = async (req: Request, res: Response) => {
		try {
			const { notfound } = await this.service.delete(req.params.id)
			if (notfound) return this.reply.notFound({ message: notfound, res })
			return this.reply.ok({ message: 'customer deleted', res })
		} catch (error) {
			return this.reply.internalServerError({ error, res })
		}
	}

	signUp = async (req: Request, res: Response) => {
		try {
			const input = this.validation.signUp(req.body)
			const { token, alredyExists } = await this.service.signUp(input)
			if (alredyExists) return this.reply.badRequest({ message: alredyExists, res })
			return this.reply.ok({ token, res })
		} catch (error) {
			return this.reply.internalServerError({ error, res })
		}
	}

	signIn = async (req: Request, res: Response) => {
		try {
			const input = this.validation.signIn(req.body)
			const { token, notfound, invalidPassword } = await this.service.signIn(input)
			if (notfound) return this.reply.notFound({ message: notfound, res })
			if (invalidPassword) return this.reply.badRequest({ message: invalidPassword, res })
			return this.reply.ok({ token, res })
		} catch (error) {
			return this.reply.internalServerError({ error, res })
		}
	}
}
