import { jest } from '@jest/globals'
import { recommendationRepository } from '../repositories/recommendationRepository'
import { recommendationService } from '../services/recommendationsService'
import { recomendationBody } from './factories/recomendataion.factory'
describe(`Testing recommendation service`, () => {
	it('new Recommendation', async () => {
		const recommendation = recomendationBody()

		jest.spyOn(
			recommendationRepository,
			'findByName'
		).mockImplementationOnce((): any => {})

		jest.spyOn(recommendationRepository, 'create').mockImplementationOnce(
			(): any => {}
		)

		await recommendationService.insert(recommendation)

		expect(recommendationRepository.findByName).toBeCalled()
		expect(recommendationRepository.create).toBeCalled()
	})
	it('Check a duplicate on recommendation', async () => {
		const recommendation = recomendationBody()

		jest.spyOn(
			recommendationRepository,
			'findByName'
		).mockImplementationOnce((): any => true)
		const promise = recommendationService.insert(recommendation)
		expect(promise).rejects.toEqual({
			message: 'Recommendations names must be unique',
			type: 'conflict',
		})
	})
	it('Upvote', async () => {
		const recommendation = recomendationBody()
		const recommendationData = { ...recommendation, id: 1, score: 0 }

		jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(
			(): any => recommendationData
		)

		jest.spyOn(
			recommendationRepository,
			'updateScore'
		).mockImplementationOnce((): any => {})

		await recommendationService.upvote(recommendationData.id)

		expect(recommendationRepository.find).toBeCalled()
		expect(recommendationRepository.updateScore).toBeCalled()
	})
	it('Downvote to -6 then delete it', async () => {
		const recommendation = recomendationBody()
		const recommendationDt = { ...recommendation, id: 1, score: 0 }
		const score = -6

		jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(
			(): any => recommendationDt
		)

		jest.spyOn(
			recommendationRepository,
			'updateScore'
		).mockImplementationOnce((): any => {
			return { ...recommendationDt, score }
		})

		jest.spyOn(recommendationRepository, 'remove').mockImplementationOnce(
			(): any => {}
		)

		await recommendationService.downvote(recommendationDt.id)

		expect(recommendationRepository.find).toBeCalled()
		expect(recommendationRepository.updateScore).toBeCalled()
		expect(recommendationRepository.remove).toBeCalled()
	})
	it('Get top amount recommendations', async () => {
		const amount = 10

		jest.spyOn(
			recommendationRepository,
			'getAmountByScore'
		).mockImplementationOnce((): any => {})

		await recommendationService.getTop(amount)

		expect(recommendationRepository.getAmountByScore).toBeCalled()
	})
	it('Fail to get by recommendation Id', async () => {
		const id = 1

		jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(
			(): any => false
		)

		const response = recommendationService.getById(id)

		expect(response).rejects.toEqual({ message: '', type: 'not_found' })
	})

	it('Get all recommendations', async () => {
		jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce(
			(): any => {}
		)

		await recommendationService.get()

		expect(recommendationRepository.findAll).toBeCalled()
	})
	it('get random function test (lower case)', async () => {
		const recommendation = recomendationBody()
		const recommendationData = { ...recommendation, id: 1, score: 11 }
		const chance = 0.7
		const index = 0

		jest.spyOn(Math, 'random').mockImplementationOnce((): any => chance)

		jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce(
			(): any => [recommendationData, { ...recommendationData, id: 2 }]
		)

		jest.spyOn(Math, 'floor').mockImplementationOnce((): any => index)

		const response = await recommendationService.getRandom()

		expect(Math.random).toBeCalled()
		expect(recommendationRepository.findAll).toBeCalled()
		expect(Math.floor).toBeCalled()
		expect(response).toBe(recommendationData)
	})
	it('getRandom function fail test (upper case)', async () => {
		const chance = 0.3
		const index = 0

		jest.spyOn(Math, 'random').mockImplementationOnce((): any => chance)

		jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce(
			(): any => []
		)

		jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce(
			(): any => []
		)

		jest.spyOn(Math, 'floor').mockImplementationOnce((): any => index)

		const response = recommendationService.getRandom()

		expect(Math.random).toBeCalled()
		expect(recommendationRepository.findAll).toBeCalled()
		expect(Math.floor).toBeCalled()
		expect(response).rejects.toEqual({ message: '', type: 'not_found' })
	})
})
