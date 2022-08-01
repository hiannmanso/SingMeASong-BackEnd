import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import app from '../app.js'
import {
	bodyWithoutNameValid,
	bodyWithoutYTBlinkValid,
	recomendationBody,
} from './factories/recomendataion.factory.js'

describe('tests /recomendations POST', () => {
	it(' with correctly infos', async () => {
		const result = await supertest(app)
			.post('/recommendations')
			.send(recomendationBody())

		expect(result.status).toEqual(201)
	})
	it(' without YTB link valid', async () => {
		const result = await supertest(app)
			.post('/recommendations')
			.send(bodyWithoutYTBlinkValid())

		expect(result.status).toEqual(422)
	})
	it(' without name valid', async () => {
		const result = await supertest(app)
			.post('/recommendations')
			.send(bodyWithoutNameValid())

		expect(result.status).toEqual(422)
	})
})

describe(`tests '/recommendations' get`, () => {
	it(`get route '/recommendations'`, async () => {
		const result = await supertest(app).get('/recommendations')
		// console.log(result)
		expect(result.status).toEqual(200)
	})
})

describe(`test '/recomendations/random`, () => {
	it(`get random`, async () => {
		const result = await supertest(app).get('/recommendations/random')

		expect(result.status).toEqual(200)
	})
})

describe(`test /recomendations/top/:amount`, () => {
	it(`get top by amount`, async () => {
		const amount = faker.random.numeric()
		const result = await supertest(app).get(
			`/recommendations/top/${amount}`
		)
		expect(result.status).toEqual(200)
	})
	it(`get top by amount with invalid amount`, async () => {
		const amount = 'asadd'
		const result = await supertest(app).get(
			`/recommendations/top/${amount}`
		)
		expect(result.status).toEqual(500)
	})
	it(`get top without amount`, async () => {
		const amount = ''
		const result = await supertest(app).get(
			`/recommendations/top/${amount}`
		)
		expect(result.status).toEqual(500)
	})
})

describe(`get recomendation by id`, () => {
	it(`get by id valid`, async () => {
		const id = 1
		const result = await supertest(app).get(`/recommendations/${id}`)
		expect(result.status).toEqual(200)
	})
	it(`get by id invalid`, async () => {
		const id = 1321312412412
		const result = await supertest(app).get(`/recommendations/${id}`)
		expect(result.status).toEqual(404)
	})
	// it(`get by id without id`, async () => {
	// 	const id = ''
	// 	const result = await supertest(app).get(`/recommendations/${id}`)
	// 	expect(result.status).toEqual(404)
	// })
	it(`get by id (string)`, async () => {
		const id = 'aloow'
		const result = await supertest(app).get(`/recommendations/${id}`)
		expect(result.status).toEqual(500)
	})
})

describe(`post rcomendations upvote`, () => {
	it(`post upvote with id valid`, async () => {
		const id = 1
		const result = await supertest(app).post(
			`/recommendations/${id}/upvote`
		)
		expect(result.status).toEqual(200)
	})
	it(`post upvote with id invalid`, async () => {
		const id = 1323123123131
		const result = await supertest(app).post(
			`/recommendations/${id}/upvote`
		)
		expect(result.status).toEqual(404)
	})
	it(`post upvote without id `, async () => {
		const id = ''
		const result = await supertest(app).post(
			`/recommendations/${id}/upvote`
		)
		expect(result.status).toEqual(404)
	})
	it(`post upvote with string(id) `, async () => {
		const id = 'aaa'
		const result = await supertest(app).post(
			`/recommendations/${id}/upvote`
		)
		expect(result.status).toEqual(500)
	})
})

describe(`post /recomendations downvote`, () => {
	it(`post downvote with id valid`, async () => {
		const id = 1

		const result = await supertest(app).post(
			`/recommendations/${id}/downvote`
		)
		expect(result.status).toEqual(200)
	})
	it(`post downvote with id invalid`, async () => {
		const id = 1321321313123123

		const result = await supertest(app).post(
			`/recommendations/${id}/downvote`
		)
		expect(result.status).toEqual(404)
	})
	it(`post downvote with id invalid(string)`, async () => {
		const id = 'aaa'

		const result = await supertest(app).post(
			`/recommendations/${id}/downvote`
		)
		expect(result.status).toEqual(500)
	})
})
