import dotenv from 'dotenv'

dotenv.config()

export const env = {
	MODE: process.env.MODE || 'development',
	PORT: process.env.PORT || 3000,
	DATABASE_URL: process.env.DATABASE_URL || '',
	JWT_SECRET: process.env.JWT_SECRET || '',
}
