import cors from 'cors'
import express from 'express'
import { env } from './libs'
import modules from './modules'

const server = () => {
	const app = express()

	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	modules(app)

	app.listen(env.PORT, () => {
		console.log(
			`[server]: Server is running at http://localhost:${env.PORT}`
		)
	})
}

server()
