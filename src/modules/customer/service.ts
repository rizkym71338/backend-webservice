import { Input } from '.'
import { Bcrypt, Signature } from '../../libs'
import Repository from './repository'

export default class Service {
	private repository = new Repository()
	private signature = new Signature()
	private bcrypt = new Bcrypt()

	private async hashPassword(password: string) {
		return await this.bcrypt.hash(password)
	}

	private generateToken(input: Input) {
		delete input.password
		return this.signature.generate(input)
	}

	async findMany() {
		const customers = await this.repository.findMany()
		if (customers.length == 0) return { notfound: 'customers not found' }
		return { data: customers }
	}

	async findOne(id: string) {
		const customer = await this.repository.findById(id)
		if (!customer) return { notfound: 'customer not found' }
		return { data: customer }
	}

	async create(input: Input) {
		const customer = await this.repository.findByEmail(input.email)
		if (customer) return { alreadyExists: 'customer already exists' }
		if (input.password) input.password = await this.hashPassword(input.password)
		const newCustomer = await this.repository.create(input)
		return { data: newCustomer }
	}

	async update(id: string, input: Input) {
		const customer = await this.repository.findById(id)
		if (!customer) return { notfound: 'customer not found' }
		const updatedCustomer = await this.repository.updateById(id, input)
		return { data: updatedCustomer }
	}

	async delete(id: string) {
		const customer = await this.repository.findById(id)
		if (!customer) return { notfound: 'customer not found' }
		const deletedCustomer = await this.repository.deleteById(id)
		return { data: deletedCustomer }
	}

	async signUp(input: Input) {
		const customer = await this.repository.findByEmailWithPassword(input.email)
		if (customer) return { alredyExists: 'customer already exists' }
		if (input.password) input.password = await this.hashPassword(input.password)
		const newCustomer = await this.repository.create(input)
		const token = this.generateToken(input)
		return { data: newCustomer, token }
	}

	async signIn(input: Input) {
		const customer = await this.repository.findByEmailWithPassword(input.email)
		if (!customer) return { notfound: 'customer not found' }
		const validPassword = await this.bcrypt.validate(input.password, customer.password)
		if (!validPassword) return { invalidPassword: 'invalid password' }
		const token = this.generateToken(input)
		return { token }
	}
}
