import bcrypt from 'bcrypt'

export class Bcrypt {
	async hash(text: string) {
		return await bcrypt.hash(text, 10)
	}

	async validate(plainText?: string, hashedText?: string | null) {
		return await bcrypt.compare(plainText || '', hashedText || '')
	}
}
