import { db } from '../database'
import { CustomerInput } from '../types'

export class CustomerRepository {
	private selectWithoutPassword = {
		id: true,
		name: true,
		email: true,
		createdAt: true,
		updatedAt: true,
	}

	async findMany() {
		return await db.customer.findMany({
			orderBy: { createdAt: 'desc' },
			select: this.selectWithoutPassword,
		})
	}

	async findById(id: string) {
		return await db.customer.findFirst({
			where: { id },
			select: this.selectWithoutPassword,
		})
	}

	async findByEmail(email?: string) {
		return await db.customer.findFirst({
			where: { email },
			select: this.selectWithoutPassword,
		})
	}

	async findByEmailWithPassword(email?: string) {
		return await db.customer.findFirst({
			where: { email },
			select: { ...this.selectWithoutPassword, password: true },
		})
	}

	async create(input: CustomerInput) {
		return await db.customer.create({ data: input })
	}

	async updateById(id: string, input: CustomerInput) {
		return await db.customer.update({ where: { id }, data: input })
	}

	async deleteById(id: string) {
		return await db.customer.delete({ where: { id } })
	}
}
