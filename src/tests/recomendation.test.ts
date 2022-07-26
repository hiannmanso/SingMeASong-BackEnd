import supertest from 'supertest'
import app from '../app.js'
import {
	bodyWithoutNameValid,
	bodyWithoutYTBlinkValid,
	recomendationBody,
} from './factories/recomendataion.factory.js'

describe('tests recomendation', () => {
	it('/recommendations with correctly infos', async () => {
		const result = await supertest(app)
			.post('/recommendations')
			.send(recomendationBody())

		expect(result.status).toEqual(201)
	})
	it('/recommendations without YTB link valid', async () => {
		const result = await supertest(app)
			.post('/recommendations')
			.send(bodyWithoutYTBlinkValid())

		expect(result.status).toEqual(404)
	})
	it('/recommendations without name valid', async () => {
		const result = await supertest(app)
			.post('/recommendations')
			.send(bodyWithoutNameValid())

		expect(result.status).toEqual(404)
	})
})
