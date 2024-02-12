import cors from 'cors'
import express from 'express'
import { env } from './libs'
import { routes } from './routes'

const server = () => {
	const app = express()

	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	routes(app)

	app.listen(env.PORT, () => {
		console.log(`Server is running at http://localhost:${env.PORT} in ${env.MODE} mode`)
	})
}

server()
