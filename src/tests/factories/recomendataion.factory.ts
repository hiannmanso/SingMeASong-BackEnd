import { faker } from '@faker-js/faker'

export function recomendationBody() {
	return {
		name: faker.name.firstName(),
		youtubeLink: `www.youtube.com/${faker.random.alpha()}`,
	}
}
export function bodyWithoutYTBlinkValid() {
	return {
		name: faker.name.firstName(),
		youtubeLink: faker.internet.url(),
	}
}
export function bodyWithoutNameValid() {
	return {
		youtubeLink: faker.internet.url(),
	}
}
